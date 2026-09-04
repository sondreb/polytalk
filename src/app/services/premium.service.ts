import { Injectable, isDevMode, signal } from '@angular/core';

export const PREMIUM_SKU = 'polytalk_premium';
export const PREMIUM_STORAGE_KEY = 'polytalk-premium';
export const PREMIUM_STORAGE_UNLOCKED = '1';
export const PLAY_STORE_LISTING_URL =
  'https://play.google.com/store/apps/details?id=me.polytalk.twa';
export const PLAY_BILLING_METHOD = 'https://play.google.com/billing';

export type PremiumMessageKind = 'info' | 'success' | 'error';

interface DigitalGoodsPrice {
  currency: string;
  value: string;
}

interface DigitalGoodsItemDetails {
  itemId: string;
  title: string;
  description: string;
  price: DigitalGoodsPrice;
}

interface DigitalGoodsPurchaseDetails {
  itemId: string;
  purchaseToken: string;
}

interface DigitalGoodsService {
  getDetails(itemIds: string[]): Promise<DigitalGoodsItemDetails[]>;
  listPurchases(): Promise<DigitalGoodsPurchaseDetails[]>;
  listPurchaseHistory?(): Promise<DigitalGoodsPurchaseDetails[]>;
  consume?(purchaseToken: string): Promise<void>;
  acknowledge?(purchaseToken: string): Promise<void>;
}

interface PlayPaymentDetails {
  purchaseToken?: string;
}

type DigitalGoodsWindow = Window & {
  getDigitalGoodsService?: (
    paymentMethod: string
  ) => Promise<DigitalGoodsService>;
};

/**
 * One-time Google Play unlock for extra learning content.
 *
 * Android TWA: Chrome Digital Goods API + Payment Request (Play Billing).
 * Web/desktop: no fake charge. Users can restore a previous unlock, open the
 * Play listing, or use the documented localStorage development key.
 */
@Injectable({
  providedIn: 'root',
})
export class PremiumService {
  readonly unlocked = signal(this.readLocalUnlock());
  readonly playBillingAvailable = signal(false);
  readonly priceLabel = signal<string | null>(null);
  readonly busy = signal(false);
  readonly message = signal('');
  readonly messageKind = signal<PremiumMessageKind>('info');

  constructor() {
    void this.initialize();
  }

  isDevUnlockHintVisible(): boolean {
    return isDevMode() && !this.playBillingAvailable();
  }

  async purchase(): Promise<boolean> {
    if (this.unlocked()) {
      this.setMessage('premium.alreadyUnlocked', 'success');
      return true;
    }

    this.busy.set(true);
    this.clearMessage();

    try {
      const service = await this.getPlayService();
      if (!service) {
        this.setMessage('premium.webOnly', 'info');
        return false;
      }

      this.setMessage('premium.purchasing', 'info');

      const paymentMethods: PaymentMethodData[] = [
        {
          supportedMethods: PLAY_BILLING_METHOD,
          data: { sku: PREMIUM_SKU },
        },
      ];

      // Play Billing ignores these totals and uses the Play Console price.
      const paymentDetails: PaymentDetailsInit = {
        total: {
          label: 'Total',
          amount: { currency: 'USD', value: '0' },
        },
      };

      const request = new PaymentRequest(paymentMethods, paymentDetails);
      const paymentResponse = await request.show();
      const details = paymentResponse.details as PlayPaymentDetails;
      const purchaseToken = details.purchaseToken;

      if (purchaseToken) {
        await this.acknowledgeIfSupported(service, purchaseToken);
        await paymentResponse.complete('success');
        this.persistUnlock();
        this.setMessage('premium.restored', 'success');
        return true;
      }

      await paymentResponse.complete('fail');
      this.setMessage('premium.error', 'error');
      return false;
    } catch (error) {
      if (this.isAbortError(error)) {
        this.setMessage('premium.cancelled', 'info');
        return false;
      }
      console.error('Premium purchase failed', error);
      this.setMessage('premium.error', 'error');
      return false;
    } finally {
      this.busy.set(false);
    }
  }

  async restore(): Promise<boolean> {
    this.busy.set(true);
    this.clearMessage();

    try {
      if (this.readLocalUnlock()) {
        this.unlocked.set(true);
        this.setMessage('premium.alreadyUnlocked', 'success');
        return true;
      }

      const service = await this.getPlayService();
      if (!service) {
        this.setMessage('premium.nothingToRestore', 'info');
        return false;
      }

      const restored = await this.restoreFromService(service);
      if (restored) {
        this.setMessage('premium.restored', 'success');
        return true;
      }

      this.setMessage('premium.nothingToRestore', 'info');
      return false;
    } catch (error) {
      console.error('Premium restore failed', error);
      this.setMessage('premium.error', 'error');
      return false;
    } finally {
      this.busy.set(false);
    }
  }

  private async initialize(): Promise<void> {
    if (this.readLocalUnlock()) {
      this.unlocked.set(true);
    }

    const service = await this.getPlayService();
    this.playBillingAvailable.set(!!service);
    if (!service) {
      return;
    }

    await this.loadPrice(service);
    await this.restoreFromService(service);
  }

  private readLocalUnlock(): boolean {
    try {
      return localStorage.getItem(PREMIUM_STORAGE_KEY) === PREMIUM_STORAGE_UNLOCKED;
    } catch {
      return false;
    }
  }

  private persistUnlock(): void {
    try {
      localStorage.setItem(PREMIUM_STORAGE_KEY, PREMIUM_STORAGE_UNLOCKED);
    } catch (error) {
      console.error('Failed to persist premium unlock', error);
    }
    this.unlocked.set(true);
  }

  private async getPlayService(): Promise<DigitalGoodsService | null> {
    const getService = (window as DigitalGoodsWindow).getDigitalGoodsService;
    if (typeof getService !== 'function') {
      return null;
    }

    try {
      return await getService(PLAY_BILLING_METHOD);
    } catch (error) {
      console.error('Google Play Billing is not available', error);
      return null;
    }
  }

  private async loadPrice(service: DigitalGoodsService): Promise<void> {
    try {
      const details = await service.getDetails([PREMIUM_SKU]);
      const item = details.find((entry) => entry.itemId === PREMIUM_SKU);
      if (!item?.price) {
        return;
      }

      this.priceLabel.set(
        new Intl.NumberFormat(navigator.language, {
          style: 'currency',
          currency: item.price.currency,
        }).format(Number(item.price.value))
      );
    } catch (error) {
      console.error('Failed to load Play product details', error);
    }
  }

  private async restoreFromService(
    service: DigitalGoodsService
  ): Promise<boolean> {
    const purchases = await service.listPurchases();
    const owned = purchases.find((purchase) =>
      this.ownsPremiumSku(purchase.itemId)
    );
    if (!owned) {
      return false;
    }

    await this.acknowledgeIfSupported(service, owned.purchaseToken);
    this.persistUnlock();
    return true;
  }

  private ownsPremiumSku(itemId: string): boolean {
    return itemId === PREMIUM_SKU || itemId.endsWith(`.${PREMIUM_SKU}`);
  }

  private async acknowledgeIfSupported(
    service: DigitalGoodsService,
    purchaseToken: string | undefined
  ): Promise<void> {
    if (!purchaseToken || typeof service.acknowledge !== 'function') {
      return;
    }

    try {
      await service.acknowledge(purchaseToken);
    } catch (error) {
      console.error('Failed to acknowledge Play purchase', error);
    }
  }

  private isAbortError(error: unknown): boolean {
    return (
      !!error &&
      typeof error === 'object' &&
      'name' in error &&
      (error as { name?: string }).name === 'AbortError'
    );
  }

  private setMessage(key: string, kind: PremiumMessageKind): void {
    this.message.set(key);
    this.messageKind.set(kind);
  }

  private clearMessage(): void {
    this.message.set('');
    this.messageKind.set('info');
  }
}
