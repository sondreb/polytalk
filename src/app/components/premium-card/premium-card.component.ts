import { Component, inject, input } from '@angular/core';

import { TranslatePipe } from '../../pipes/translate.pipe';
import {
  PLAY_STORE_LISTING_URL,
  PremiumService,
} from '../../services/premium.service';

@Component({
  selector: 'app-premium-card',
  standalone: true,
  imports: [TranslatePipe],
  template: `
    <section class="premium-card" [class.compact]="compact()">
      <div class="premium-copy">
        <p class="eyebrow">{{ 'premium.title' | translate }}</p>
        @if (premium.unlocked()) {
          <h2>{{ 'premium.statusUnlocked' | translate }}</h2>
        } @else {
          <h2>{{ compact() ? ('premium.teaserTitle' | translate) : ('premium.statusLocked' | translate) }}</h2>
          <p>{{ compact() ? ('premium.teaserBody' | translate) : ('premium.pitch' | translate) }}</p>
        }
        @if (premium.priceLabel(); as price) {
          <p class="price">{{ price }}</p>
        }
        @if (!premium.playBillingAvailable() && !premium.unlocked()) {
          <p class="hint">{{ 'premium.webOnly' | translate }}</p>
        }
        @if (premium.isDevUnlockHintVisible()) {
          <p class="hint">{{ 'premium.devHint' | translate }}</p>
        }
      </div>

      <div class="premium-actions">
        @if (premium.unlocked()) {
          <button type="button" class="btn-primary" disabled>
            {{ 'premium.unlockedBadge' | translate }}
          </button>
        } @else if (premium.playBillingAvailable()) {
          <button
            type="button"
            class="btn-primary"
            (click)="premium.purchase()"
            [disabled]="premium.busy()"
          >
            {{ premium.busy() ? ('premium.purchasing' | translate) : ('premium.buy' | translate) }}
          </button>
        } @else {
          <a
            class="btn-primary store-link"
            [href]="playStoreUrl"
            target="_blank"
            rel="noopener"
          >
            {{ 'premium.buyOnPlay' | translate }}
          </a>
        }

        <button
          type="button"
          class="secondary"
          (click)="premium.restore()"
          [disabled]="premium.busy()"
        >
          {{ premium.busy() ? ('premium.restoring' | translate) : ('premium.restore' | translate) }}
        </button>
      </div>

      @if (premium.message(); as messageKey) {
        <p class="status" [class]="premium.messageKind()">
          {{ messageKey | translate }}
        </p>
      }
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .premium-card {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      .eyebrow {
        margin: 0;
        font-size: 0.75rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--primary-color);
      }
      h2 {
        margin: 0.25rem 0 0.5rem;
        font-size: 1.2rem;
      }
      p {
        margin: 0;
        color: var(--text-light);
      }
      .price {
        color: var(--primary-color);
        font-weight: 700;
      }
      .hint {
        font-size: 0.85rem;
      }
      .premium-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
        align-items: center;
      }
      .store-link {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
      }
      .secondary {
        background: var(--surface-muted);
      }
      .status {
        font-size: 0.9rem;
        font-weight: 500;
      }
      .success {
        color: var(--secondary-dark);
      }
      .error {
        color: var(--accent-color);
      }
      .info {
        color: var(--text-light);
      }
      .compact h2 {
        font-size: 1.05rem;
      }
    `,
  ],
})
export class PremiumCardComponent {
  readonly premium = inject(PremiumService);
  readonly compact = input(false);
  readonly playStoreUrl = PLAY_STORE_LISTING_URL;
}
