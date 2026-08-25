import { TestBed } from '@angular/core/testing';
import {
  PREMIUM_SKU,
  PREMIUM_STORAGE_KEY,
  PREMIUM_STORAGE_UNLOCKED,
  PremiumService,
} from './premium.service';

describe('PremiumService', () => {
  beforeEach(() => {
    localStorage.removeItem(PREMIUM_STORAGE_KEY);
    delete (window as { getDigitalGoodsService?: unknown }).getDigitalGoodsService;
    TestBed.configureTestingModule({});
  });

  afterEach(() => {
    localStorage.removeItem(PREMIUM_STORAGE_KEY);
    delete (window as { getDigitalGoodsService?: unknown }).getDigitalGoodsService;
  });

  it('should be created', () => {
    const service = TestBed.inject(PremiumService);
    expect(service).toBeTruthy();
    expect(service.unlocked()).toBeFalse();
  });

  it('should treat the documented localStorage key as an unlock', () => {
    localStorage.setItem(PREMIUM_STORAGE_KEY, PREMIUM_STORAGE_UNLOCKED);
    const service = TestBed.inject(PremiumService);
    expect(service.unlocked()).toBeTrue();
  });

  it('should not fake a Play charge when Digital Goods is missing', async () => {
    const service = TestBed.inject(PremiumService);
    const bought = await service.purchase();
    expect(bought).toBeFalse();
    expect(service.unlocked()).toBeFalse();
    expect(service.message()).toBe('premium.webOnly');
  });

  it('should restore from localStorage without Digital Goods', async () => {
    const service = TestBed.inject(PremiumService);
    localStorage.setItem(PREMIUM_STORAGE_KEY, PREMIUM_STORAGE_UNLOCKED);
    const restored = await service.restore();
    expect(restored).toBeTrue();
    expect(service.unlocked()).toBeTrue();
  });

  it('should persist a Play restore from Digital Goods', async () => {
    (window as {
      getDigitalGoodsService?: (method: string) => Promise<{
        getDetails: () => Promise<unknown[]>;
        listPurchases: () => Promise<Array<{ itemId: string; purchaseToken: string }>>;
      }>;
    }).getDigitalGoodsService = async () => ({
      getDetails: async () => [],
      listPurchases: async () => [
        { itemId: PREMIUM_SKU, purchaseToken: 'token-1' },
      ],
    });

    const service = TestBed.inject(PremiumService);
    await service.restore();

    expect(service.unlocked()).toBeTrue();
    expect(localStorage.getItem(PREMIUM_STORAGE_KEY)).toBe(PREMIUM_STORAGE_UNLOCKED);
  });
});
