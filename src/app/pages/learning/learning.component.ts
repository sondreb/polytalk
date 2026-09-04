import {
  Component,
  OnDestroy,
  OnInit,
  HostListener,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  Language,
  LanguageService,
  LearningContent,
} from '../../services/language.service';
import { AudioService } from '../../services/audio.service';
import { TranslationService } from '../../services/translation.service';
import { PremiumService } from '../../services/premium.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { PremiumCardComponent } from '../../components/premium-card/premium-card.component';

export interface LearningItem {
  native: string;
  translation: string;
  key: string;
}

@Component({
  selector: 'app-learning',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe, PremiumCardComponent],
  template: `
    <section class="learning">
      <header class="language-header card">
        <div class="language-selector">
          <img
            [src]="fromLanguage()?.flagImage"
            [alt]="fromLanguage()?.name + ' flag'"
            class="flag-image"
          />
          <label class="select-field">
            <span class="select-label">{{ 'learning.from' | translate }}</span>
            <select
              [ngModel]="fromLanguageCode()"
              (ngModelChange)="onLanguageChange('from', $event)"
            >
              @for (lang of availableLanguages(); track lang.code) {
                <option [value]="lang.code">{{ lang.name }}</option>
              }
            </select>
          </label>
        </div>

        <button
          type="button"
          (click)="switchLanguages()"
          class="switch-button"
          [attr.aria-label]="'learning.swap' | translate"
          [title]="'learning.swap' | translate"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 8h13m0 0-3.5-3.5M17 8l-3.5 3.5" />
            <path d="M20 16H7m0 0 3.5-3.5M7 16l3.5 3.5" />
          </svg>
        </button>

        <div class="language-selector">
          <img
            [src]="toLanguage()?.flagImage"
            [alt]="toLanguage()?.name + ' flag'"
            class="flag-image"
          />
          <label class="select-field">
            <span class="select-label">{{ 'learning.to' | translate }}</span>
            <select
              [ngModel]="toLanguageCode()"
              (ngModelChange)="onLanguageChange('to', $event)"
            >
              @for (lang of availableLanguages(); track lang.code) {
                <option [value]="lang.code">{{ lang.name }}</option>
              }
            </select>
          </label>
        </div>
      </header>

      <nav class="tabs" role="tablist">
        @for (tab of tabs; track tab) {
          <button
            type="button"
            role="tab"
            [attr.aria-selected]="category() === tab"
            [class.active]="category() === tab"
            (click)="selectCategory(tab)"
          >
            {{ 'learning.' + tab | translate }}
          </button>
        }
      </nav>

      <div class="phrase-list card">
        @for (item of currentItems(); track item.key) {
          <div
            class="item"
            [class.playing]="item.key === currentlyPlayingItem()?.key"
            [class.offline]="isItemOffline(item)"
            [id]="'item-' + item.key"
          >
            <div class="native">
              <button
                type="button"
                class="play-button"
                (click)="playItem(item, 'from')"
                [attr.aria-label]="('learning.listen' | translate) + ': ' + item.native"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path class="solid" d="M8 5.5v13l11-6.5z" />
                </svg>
              </button>
              <span>{{ item.native }}</span>
            </div>
            <div class="translation">
              <span>{{ item.translation }}</span>
              <button
                type="button"
                class="play-button"
                (click)="playItem(item, 'to')"
                [attr.aria-label]="('learning.listen' | translate) + ': ' + item.translation"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path class="solid" d="M8 5.5v13l11-6.5z" />
                </svg>
              </button>
            </div>
          </div>
        }
      </div>

      @if (!premium.unlocked() && premiumTeasers().length) {
        <aside class="premium-teaser card">
          <div class="locked-preview">
            @for (item of premiumTeasers(); track item.key) {
              <div class="item locked">
                <div class="native">
                  <span class="lock-badge">{{ 'premium.lockedItem' | translate }}</span>
                  <span>{{ item.native }}</span>
                </div>
                <div class="translation">
                  <span>{{ item.translation }}</span>
                </div>
              </div>
            }
          </div>
          <app-premium-card [compact]="true" />
        </aside>
      }
    </section>

    <div class="transport-spacer"></div>

    <div class="transport">
      <div class="progress-track" aria-hidden="true">
        <div class="progress-bar" [style.width.%]="progressPercent()"></div>
      </div>

      <div class="transport-inner controls">
        <div class="now-playing">
          @if (currentlyPlayingItem(); as item) {
            <span class="now-word">{{ item.translation }}</span>
          } @else {
            <span class="now-word muted">{{ 'learning.' + category() | translate }}</span>
          }
          <span class="now-count">
            {{ audioService.queuePosition() }} / {{ audioService.queueLength() || currentItems().length }}
          </span>
        </div>

        <div class="buttons">
          <button
            type="button"
            class="transport-button"
            (click)="skipPrevious()"
            [disabled]="!isPlaying()"
            [title]="'learning.prev' | translate"
            [attr.aria-label]="'learning.prev' | translate"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 6v12" /><path class="solid" d="M18 6.5v11L9.5 12z" />
            </svg>
          </button>

          <button
            type="button"
            class="transport-button primary"
            (click)="togglePlayback()"
            [title]="playButtonText()"
            [attr.aria-label]="playButtonText()"
          >
            @if (isPlaying()) {
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.5 5.5v13M15.5 5.5v13" />
              </svg>
            } @else {
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path class="solid" d="M8 5.5v13l11-6.5z" />
              </svg>
            }
            <span class="button-text">{{ playButtonText() }}</span>
          </button>

          <button
            type="button"
            class="transport-button"
            (click)="skipNext()"
            [disabled]="!isPlaying()"
            [title]="'learning.next' | translate"
            [attr.aria-label]="'learning.next' | translate"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17 6v12" /><path class="solid" d="M6 6.5v11L14.5 12z" />
            </svg>
          </button>

          <button
            type="button"
            class="transport-button"
            (click)="stopPlayback()"
            [disabled]="!isPlaying() && !canResume()"
            [title]="'learning.stop' | translate"
            [attr.aria-label]="'learning.stop' | translate"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect class="solid" x="6.5" y="6.5" width="11" height="11" rx="2" />
            </svg>
          </button>
        </div>

        <button
          type="button"
          class="options-button"
          (click)="toggleOptions()"
          [attr.aria-expanded]="showOptions()"
          [title]="'learning.options' | translate"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 8h10M18 8h2M4 16h4M12 16h8" />
            <circle cx="16" cy="8" r="2.2" />
            <circle cx="10" cy="16" r="2.2" />
          </svg>
          <span class="button-text">{{ 'learning.options' | translate }}</span>
        </button>
      </div>
    </div>

    @if (showOptions()) {
      <div class="sheet-backdrop" (click)="closeOptions()"></div>
      <div class="sheet" role="dialog" aria-modal="true">
        <div class="sheet-header">
          <h2>{{ 'learning.options' | translate }}</h2>
          <button
            type="button"
            class="close-button"
            (click)="closeOptions()"
            [attr.aria-label]="'learning.close' | translate"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div class="settings">
          <div class="setting-row">
            <span class="setting-label">🔁 {{ 'learning.repeatWord' | translate }}</span>
            <div class="number-control">
              <button
                type="button"
                class="control-btn"
                (click)="decrementValue('wordRepeat')"
                aria-label="-"
              >
                −
              </button>
              <span class="number-value">{{ wordRepeat() }}</span>
              <button
                type="button"
                class="control-btn"
                (click)="incrementValue('wordRepeat')"
                aria-label="+"
              >
                +
              </button>
            </div>
          </div>

          <div class="setting-row">
            <span class="setting-label">↺ {{ 'learning.repeatPlaylist' | translate }}</span>
            <div class="number-control">
              <button
                type="button"
                class="control-btn"
                (click)="decrementValue('loopRepeat')"
                aria-label="-"
              >
                −
              </button>
              <span class="number-value">{{ loopRepeat() }}</span>
              <button
                type="button"
                class="control-btn"
                (click)="incrementValue('loopRepeat')"
                aria-label="+"
              >
                +
              </button>
            </div>
          </div>

          <label class="setting-row toggle-row">
            <span class="setting-label">🗣 {{ 'learning.bilingual' | translate }}</span>
            <input
              type="checkbox"
              class="switch"
              [ngModel]="playBothLanguages()"
              (ngModelChange)="setPlayBothLanguages($event)"
            />
          </label>

          <label class="setting-row toggle-row">
            <span class="setting-label">💡 {{ 'learning.keepScreenOn' | translate }}</span>
            <input
              type="checkbox"
              class="switch"
              [ngModel]="screenLockActive()"
              (ngModelChange)="toggleScreenLock($event)"
            />
          </label>
        </div>

        <div class="offline-controls">
          <button
            type="button"
            (click)="downloadAllAudio()"
            [disabled]="isDownloading()"
            class="download-button btn-primary"
          >
            @if (isDownloading()) {
              {{ 'learning.downloading' | translate }} {{ downloadProgress() }}%
            } @else {
              ⬇ {{ 'learning.enableOffline' | translate }}
            }
          </button>
          @if (screenLockActive()) {
            <p class="hint">{{ 'learning.screenOnMessage' | translate }}</p>
          }
        </div>
      </div>
    }
  `,
  styles: [
    `
      :host {
        display: block;
      }

      svg {
        width: 20px;
        height: 20px;
        fill: none;
        stroke: currentColor;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
      }

      svg .solid {
        fill: currentColor;
        stroke-width: 1;
      }

      .learning {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
      }

      /* ---------- Language header ---------- */
      .language-header {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        padding: 0.75rem 1rem;
      }

      .language-header:hover {
        box-shadow: var(--shadow-sm);
        border-color: var(--border-color);
      }

      .language-selector {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        flex: 1;
        min-width: 0;
      }

      .language-selector:last-of-type {
        justify-content: flex-end;
      }

      .flag-image {
        width: 40px;
        height: 30px;
        border-radius: var(--radius-sm);
        object-fit: cover;
        box-shadow: var(--shadow-sm);
        flex-shrink: 0;
      }

      .select-field {
        display: flex;
        flex-direction: column;
        gap: 0.15rem;
        min-width: 0;
      }

      .select-label {
        font-size: 0.7rem;
        font-weight: 600;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--text-light);
      }

      .select-field select {
        max-width: 100%;
        min-width: 140px;
        padding: 0.35rem 0.5rem;
        font-weight: 600;
        border-radius: var(--radius-sm);
        background: var(--surface-muted);
      }

      .switch-button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 42px;
        height: 42px;
        padding: 0;
        flex-shrink: 0;
        border-radius: var(--radius-pill);
        color: var(--primary-color);
        background: var(--primary-soft);
        border-color: transparent;
      }

      .switch-button:hover:not(:disabled) {
        background: var(--primary-soft-hover);
      }

      /* ---------- Tabs ---------- */
      .tabs {
        display: inline-flex;
        align-self: center;
        gap: 0.25rem;
        padding: 0.25rem;
        background: var(--surface-muted);
        border: 1px solid var(--border-color);
        border-radius: var(--radius-pill);
      }

      .tabs button {
        padding: 0.5rem 1.25rem;
        border: none;
        background: transparent;
        border-radius: var(--radius-pill);
        font-size: 0.95rem;
        color: var(--text-light);
        min-width: 96px;
      }

      .tabs button:hover:not(.active) {
        background: var(--primary-soft);
        color: var(--text-color);
      }

      .tabs button.active {
        background: var(--surface-color);
        color: var(--primary-color);
        box-shadow: var(--shadow-sm);
      }

      /* ---------- Phrase list ---------- */
      .phrase-list {
        padding: 0.25rem;
        overflow: hidden;
      }

      .phrase-list:hover {
        box-shadow: var(--shadow-sm);
        border-color: var(--border-color);
      }

      .item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        padding: 0.6rem 0.75rem;
        border-radius: var(--radius-md);
        border-bottom: 1px solid var(--border-color);
        transition: background var(--duration) var(--ease),
          color var(--duration) var(--ease);
        scroll-margin-block: 120px;
      }

      .item:last-child {
        border-bottom: none;
      }

      .item:hover {
        background: var(--primary-soft);
      }

      .item.playing {
        background: linear-gradient(
          135deg,
          var(--gradient-start),
          var(--gradient-end)
        );
        color: #fff;
        box-shadow: var(--shadow-brand);
      }

      .item.playing .translation,
      .item.playing .native span {
        color: #fff;
      }

      .item.playing .play-button {
        background: rgba(255, 255, 255, 0.2);
        color: #fff;
      }

      .native,
      .translation {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        min-width: 0;
      }

      .native span,
      .translation span {
        overflow-wrap: anywhere;
      }

      .translation {
        color: var(--primary-color);
        font-weight: 600;
        text-align: end;
      }

      .play-button {
        width: 36px;
        height: 36px;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: var(--radius-pill);
        background: var(--primary-soft);
        color: var(--primary-color);
        border-color: transparent;
        flex-shrink: 0;
      }

      .play-button:hover:not(:disabled) {
        background: var(--primary-soft-hover);
      }

      .play-button svg {
        width: 16px;
        height: 16px;
      }

      .item.offline {
        opacity: 0.5;
      }

      .item.offline .play-button {
        cursor: not-allowed;
      }

      .premium-teaser {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
      }

      .locked-preview {
        display: flex;
        flex-direction: column;
      }

      .item.locked {
        opacity: 0.72;
        pointer-events: none;
      }

      .lock-badge {
        display: inline-flex;
        align-items: center;
        padding: 0.15rem 0.5rem;
        border-radius: var(--radius-pill);
        background: var(--primary-soft);
        color: var(--primary-color);
        font-size: 0.7rem;
        font-weight: 700;
        letter-spacing: 0.04em;
        text-transform: uppercase;
      }

      /* ---------- Transport bar ---------- */
      .transport-spacer {
        height: 84px;
      }

      .transport {
        position: fixed;
        inset-inline: 0;
        bottom: 0;
        z-index: 99;
        background: color-mix(in srgb, var(--surface-color) 88%, transparent);
        backdrop-filter: blur(14px);
        border-top: 1px solid var(--border-color);
        box-shadow: 0 -4px 20px rgba(16, 24, 40, 0.08);
        padding-bottom: env(safe-area-inset-bottom);
      }

      .progress-track {
        height: 3px;
        width: 100%;
        background: var(--border-color);
      }

      .progress-bar {
        height: 100%;
        width: 0;
        background: linear-gradient(
          90deg,
          var(--gradient-start),
          var(--gradient-end)
        );
        transition: width 0.3s var(--ease);
      }

      .transport-inner {
        max-width: 1200px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        align-items: center;
        gap: 1rem;
        padding: 0.6rem 1rem;
      }

      .now-playing {
        display: flex;
        flex-direction: column;
        min-width: 0;
      }

      .now-word {
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .now-word.muted {
        color: var(--text-light);
      }

      .now-count {
        font-size: 0.8rem;
        color: var(--text-light);
        font-variant-numeric: tabular-nums;
      }

      .buttons {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .transport-button {
        width: 44px;
        height: 44px;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        border-radius: var(--radius-pill);
        background: transparent;
        border-color: transparent;
        color: var(--text-color);
      }

      .transport-button svg {
        width: 20px;
        height: 20px;
      }

      .transport-button.primary {
        width: auto;
        min-width: 56px;
        height: 52px;
        padding: 0 1.5rem;
        background: linear-gradient(
          135deg,
          var(--gradient-start),
          var(--gradient-end)
        );
        color: #fff;
        box-shadow: var(--shadow-brand);
      }

      .transport-button.primary:hover:not(:disabled) {
        filter: brightness(1.06);
        background: linear-gradient(
          135deg,
          var(--gradient-start),
          var(--gradient-end)
        );
      }

      .transport-button.primary svg {
        width: 22px;
        height: 22px;
      }

      .options-button {
        justify-self: end;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background: transparent;
        border-color: transparent;
        color: var(--text-light);
      }

      .options-button svg {
        width: 20px;
        height: 20px;
      }

      /* ---------- Options sheet ---------- */
      .sheet-backdrop {
        position: fixed;
        inset: 0;
        background: var(--overlay-color);
        z-index: 100;
        animation: fade 0.2s var(--ease);
      }

      .sheet {
        position: fixed;
        inset-inline: 0;
        bottom: 0;
        z-index: 101;
        margin: 0 auto;
        max-width: 520px;
        background: var(--surface-color);
        border: 1px solid var(--border-color);
        border-bottom: none;
        border-radius: var(--radius-xl) var(--radius-xl) 0 0;
        box-shadow: var(--shadow-lg);
        padding: 1.25rem 1.25rem calc(1.25rem + env(safe-area-inset-bottom));
        animation: slide-up 0.25s var(--ease);
      }

      @keyframes fade {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      @keyframes slide-up {
        from {
          transform: translateY(100%);
        }
        to {
          transform: translateY(0);
        }
      }

      .sheet-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 0.5rem;
      }

      .sheet-header h2 {
        margin: 0;
        font-size: 1.1rem;
      }

      .close-button {
        width: 36px;
        height: 36px;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: var(--radius-pill);
        background: transparent;
        border-color: transparent;
        color: var(--text-light);
      }

      .close-button svg {
        width: 18px;
        height: 18px;
      }

      .settings {
        display: flex;
        flex-direction: column;
      }

      .setting-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        padding: 0.75rem 0;
        border-bottom: 1px solid var(--border-color);
      }

      .setting-row:last-child {
        border-bottom: none;
      }

      .toggle-row {
        cursor: pointer;
      }

      .setting-label {
        font-weight: 500;
      }

      .number-control {
        display: flex;
        align-items: center;
        background: var(--surface-muted);
        border: 1px solid var(--border-color);
        border-radius: var(--radius-pill);
        overflow: hidden;
      }

      .control-btn {
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: transparent;
        border: none;
        border-radius: 0;
        color: var(--text-color);
        font-size: 1.15rem;
        padding: 0;
        touch-action: manipulation;
      }

      .number-value {
        min-width: 32px;
        text-align: center;
        font-weight: 600;
        font-variant-numeric: tabular-nums;
      }

      .switch {
        appearance: none;
        -webkit-appearance: none;
        position: relative;
        width: 46px;
        height: 26px;
        border-radius: var(--radius-pill);
        background: var(--surface-muted);
        border: 1px solid var(--border-color);
        cursor: pointer;
        padding: 0;
        flex-shrink: 0;
        transition: background var(--duration) var(--ease);
      }

      .switch::after {
        content: '';
        position: absolute;
        top: 2px;
        inset-inline-start: 2px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: var(--surface-color);
        box-shadow: var(--shadow-sm);
        transition: transform var(--duration) var(--ease);
      }

      .switch:checked {
        background: linear-gradient(
          135deg,
          var(--gradient-start),
          var(--gradient-end)
        );
        border-color: transparent;
      }

      .switch:checked::after {
        transform: translateX(20px);
      }

      :host-context([dir='rtl']) .switch:checked::after {
        transform: translateX(-20px);
      }

      .offline-controls {
        margin-top: 1rem;
        text-align: center;
      }

      .download-button {
        width: 100%;
      }

      .hint {
        margin: 0.75rem 0 0;
        font-size: 0.85rem;
        color: var(--text-light);
      }

      /* ---------- Responsive ---------- */
      @media (max-width: 900px) {
        .transport-button.primary .button-text,
        .options-button .button-text {
          display: none;
        }

        .transport-button.primary {
          width: 52px;
          min-width: 52px;
          padding: 0;
        }

        .options-button {
          width: 44px;
          height: 44px;
          padding: 0;
          justify-content: center;
          border-radius: var(--radius-pill);
        }
      }

      @media (max-width: 640px) {
        .language-header {
          gap: 0.5rem;
          padding: 0.5rem;
        }

        .flag-image {
          width: 32px;
          height: 24px;
        }

        .select-field select {
          min-width: 0;
          width: 100%;
          font-size: 0.9rem;
        }

        .select-label {
          display: none;
        }

        .tabs button {
          min-width: 0;
          padding: 0.5rem 0.9rem;
          font-size: 0.9rem;
        }

        .item {
          padding: 0.5rem;
          gap: 0.5rem;
        }

        .native,
        .translation {
          gap: 0.5rem;
        }

        .transport-inner {
          grid-template-columns: 1fr auto;
          gap: 0.5rem;
          padding: 0.5rem 0.75rem;
        }

        .now-playing {
          display: none;
        }

        .buttons {
          gap: 0.25rem;
        }

        .transport-spacer {
          height: 76px;
        }

        .sheet {
          max-width: none;
        }
      }
    `,
  ],
})
export class LearningComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly languageService = inject(LanguageService);
  private readonly translationService = inject(TranslationService);
  readonly audioService = inject(AudioService);
  readonly premium = inject(PremiumService);

  private readonly SETTINGS_KEY = 'polytalk-settings';
  private readonly FROM_LANGUAGE_KEY = 'polytalk-from-language';
  private readonly TO_LANGUAGE_KEY = 'polytalk-to-language';

  readonly tabs = ['words', 'numbers', 'sentences'];

  // Route / content state
  readonly category = signal<string>('words');
  readonly currentItems = signal<LearningItem[]>([]);
  readonly premiumTeasers = signal<LearningItem[]>([]);
  readonly availableLanguages = signal<Language[]>([]);
  readonly fromLanguageCode = signal<string>('en');
  readonly toLanguageCode = signal<string>('');

  readonly fromLanguage = computed(() =>
    this.availableLanguages().find((l) => l.code === this.fromLanguageCode())
  );
  readonly toLanguage = computed(() =>
    this.availableLanguages().find((l) => l.code === this.toLanguageCode())
  );

  // Playback settings
  readonly wordRepeat = signal(1);
  readonly loopRepeat = signal(2);
  readonly playBothLanguages = signal(true);

  // Playback state
  readonly isPlaying = computed(() => this.audioService.isPlaying());
  readonly canResume = signal(false);
  readonly currentlyPlayingItem = signal<LearningItem | undefined>(undefined);
  readonly progressPercent = computed(() =>
    Math.round(this.audioService.progress() * 100)
  );

  // UI state
  readonly showOptions = signal(false);
  readonly isDownloading = signal(false);
  readonly downloadProgress = signal(0);
  readonly isOffline = signal(!navigator.onLine);
  readonly unavailableAudio = signal<Set<string>>(new Set<string>());
  readonly screenLockActive = signal(false);

  private wakeLock: WakeLockSentinel | null = null;

  readonly playButtonText = computed(() => {
    this.translationService.languageChange();
    if (this.isPlaying()) {
      return this.translationService.translate('learning.pause');
    }
    return this.canResume()
      ? this.translationService.translate('learning.resume')
      : this.translationService.translate('learning.start');
  });

  constructor() {
    this.loadSettings();

    window.addEventListener('online', this.onOnline);
    window.addEventListener('offline', this.onOffline);

    effect(() => {
      this.premium.unlocked();
      if (this.toLanguageCode()) {
        this.loadItems();
      }
    });

    effect(() => {
      const file = this.audioService.currentFile();
      if (!file) {
        this.currentlyPlayingItem.set(undefined);
        return;
      }

      const fileName = file.split('/').pop()?.replace('.mp3', '');
      if (!fileName) return;

      const match = this.currentItems().find(
        (item) => this.sanitizeKey(item.key) === this.sanitizeKey(fileName)
      );
      this.currentlyPlayingItem.set(match);

      if (match) {
        const element = document.getElementById(`item-${match.key}`);
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  ngOnInit(): void {
    this.availableLanguages.set(this.languageService.getLanguages());

    this.route.params.subscribe((params) => {
      window.scrollTo(0, 0);

      this.fromLanguageCode.set(params['fromLanguage'] ?? 'en');
      this.toLanguageCode.set(params['toLanguage'] ?? '');
      this.category.set(params['category'] ?? 'words');

      this.persistLanguages();
      this.loadItems();
    });
  }

  ngOnDestroy(): void {
    this.stopPlayback();
    void this.releaseScreenLock();
    window.removeEventListener('online', this.onOnline);
    window.removeEventListener('offline', this.onOffline);
  }

  private onOnline = () => {
    this.isOffline.set(false);
    this.unavailableAudio.set(new Set<string>());
  };

  private onOffline = () => this.isOffline.set(true);

  loadItems(): void {
    if (!this.toLanguageCode()) return;

    const includePremium = this.premium.unlocked();
    const toContent = this.languageService.getContent(
      this.toLanguageCode(),
      includePremium
    );
    const fromContent = this.languageService.getContent(
      this.fromLanguageCode(),
      includePremium
    );

    if (!toContent || !fromContent) return;

    const category = this.category() as keyof LearningContent;
    const toItems = toContent[category];
    const fromItems = fromContent[category];

    if (!toItems || !fromItems) return;

    this.currentItems.set(
      Object.entries(toItems).map(([key, toTranslation]) => ({
        native: fromItems[key],
        translation: toTranslation,
        key,
      }))
    );

    if (includePremium) {
      this.premiumTeasers.set([]);
      return;
    }

    const toPremium = this.languageService.getPremiumContent(
      this.toLanguageCode()
    );
    const fromPremium = this.languageService.getPremiumContent(
      this.fromLanguageCode()
    );
    const extraTo = toPremium?.[category] ?? {};
    const extraFrom = fromPremium?.[category] ?? {};

    this.premiumTeasers.set(
      Object.entries(extraTo)
        .slice(0, 3)
        .map(([key, toTranslation]) => ({
          native: extraFrom[key] ?? key,
          translation: toTranslation,
          key,
        }))
    );
  }

  isItemOffline(item: LearningItem): boolean {
    if (!this.isOffline()) return false;
    const unavailable = this.unavailableAudio();
    const name = this.sanitizeKey(item.key);
    return (
      unavailable.has(this.audioPath(this.fromLanguageCode(), name)) ||
      unavailable.has(this.audioPath(this.toLanguageCode(), name))
    );
  }

  private audioPath(languageCode: string, fileName: string): string {
    return `/assets/audio/${languageCode}/${this.category()}/${fileName}.mp3`;
  }

  // ---------- Settings ----------

  private loadSettings(): void {
    const settings = localStorage.getItem(this.SETTINGS_KEY);
    if (settings) {
      try {
        const parsed = JSON.parse(settings);
        this.wordRepeat.set(parsed.wordRepeat || 1);
        this.loopRepeat.set(parsed.loopRepeat || 2);
        this.playBothLanguages.set(parsed.playBothLanguages ?? true);
      } catch (error) {
        console.error('Failed to parse stored settings', error);
      }
    }
  }

  saveSettings(): void {
    if (this.isPlaying()) {
      this.stopPlayback();
    }
    this.canResume.set(false);

    localStorage.setItem(
      this.SETTINGS_KEY,
      JSON.stringify({
        wordRepeat: this.wordRepeat(),
        loopRepeat: this.loopRepeat(),
        playBothLanguages: this.playBothLanguages(),
      })
    );
  }

  setPlayBothLanguages(value: boolean): void {
    this.playBothLanguages.set(value);
    this.saveSettings();
  }

  incrementValue(setting: 'wordRepeat' | 'loopRepeat'): void {
    const target = setting === 'wordRepeat' ? this.wordRepeat : this.loopRepeat;
    target.set(Math.min(20, target() + 1));
    this.saveSettings();
  }

  decrementValue(setting: 'wordRepeat' | 'loopRepeat'): void {
    const target = setting === 'wordRepeat' ? this.wordRepeat : this.loopRepeat;
    target.set(Math.max(1, target() - 1));
    this.saveSettings();
  }

  // ---------- Options sheet ----------

  toggleOptions(): void {
    this.showOptions.update((open) => !open);
  }

  closeOptions(): void {
    this.showOptions.set(false);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeOptions();
  }

  // ---------- Playback ----------

  async togglePlayback(): Promise<void> {
    if (this.isPlaying()) {
      this.pausePlayback();
      return;
    }
    await this.startPlayback();
  }

  async startPlayback(): Promise<void> {
    if (this.isPlaying()) {
      this.pausePlayback();
      return;
    }

    if (this.settingsChanged()) {
      this.canResume.set(false);
    }

    if (!this.canResume()) {
      const audioFiles = await this.buildQueue();
      if (audioFiles.length === 0) return;

      this.audioService.setWordGroupSize(
        this.wordRepeat() * (this.playBothLanguages() ? 2 : 1)
      );
      this.audioService.setQueue(audioFiles, this.loopRepeat());
      this.audioService.cacheAudioFiles(audioFiles);
    }

    this.audioService.play();
    this.canResume.set(false);
  }

  private async buildQueue(): Promise<string[]> {
    const audioFiles: string[] = [];
    const unavailableFiles: string[] = [];
    this.currentlyPlayingItem.set(undefined);

    for (const item of this.currentItems()) {
      const fileName = this.sanitizeKey(item.key);
      const files = this.playBothLanguages()
        ? [
            this.audioPath(this.fromLanguageCode(), fileName),
            this.audioPath(this.toLanguageCode(), fileName),
          ]
        : [this.audioPath(this.toLanguageCode(), fileName)];

      for (let repeat = 0; repeat < this.wordRepeat(); repeat++) {
        for (const file of files) {
          if (this.isOffline() && !(await this.checkAudioAvailability(file))) {
            unavailableFiles.push(file);
            continue;
          }
          audioFiles.push(file);
        }
      }
    }

    if (unavailableFiles.length > 0) {
      const unavailable = new Set(this.unavailableAudio());
      unavailableFiles.forEach((file) => unavailable.add(file));
      this.unavailableAudio.set(unavailable);
    }

    return audioFiles;
  }

  pausePlayback(): void {
    this.audioService.stop(true);
    this.canResume.set(true);
  }

  stopPlayback(): void {
    this.currentlyPlayingItem.set(undefined);
    this.canResume.set(false);
    this.audioService.stop(false);
  }

  skipNext(): void {
    this.audioService.skipNext();
  }

  skipPrevious(): void {
    this.audioService.skipPrevious();
  }

  async playItem(item: LearningItem, direction: 'from' | 'to'): Promise<void> {
    const fileName = this.sanitizeKey(item.key);
    const langCode =
      direction === 'from' ? this.fromLanguageCode() : this.toLanguageCode();
    const audioFile = this.audioPath(langCode, fileName);

    if (this.isOffline() && !(await this.checkAudioAvailability(audioFile))) {
      const unavailable = new Set(this.unavailableAudio());
      unavailable.add(audioFile);
      this.unavailableAudio.set(unavailable);
      return;
    }

    this.audioService.playSingleFile(audioFile);
  }

  // ---------- Navigation ----------

  selectCategory(category: string): void {
    this.canResume.set(false);
    this.router.navigate([
      '/learn',
      this.fromLanguageCode(),
      this.toLanguageCode(),
      category,
    ]);
  }

  onLanguageChange(type: 'from' | 'to', value: string): void {
    this.canResume.set(false);
    if (type === 'from') {
      this.fromLanguageCode.set(value);
    } else {
      this.toLanguageCode.set(value);
    }
    this.persistLanguages();
    this.navigateToCurrent();
  }

  switchLanguages(): void {
    const from = this.fromLanguageCode();
    this.fromLanguageCode.set(this.toLanguageCode());
    this.toLanguageCode.set(from);
    this.persistLanguages();
    this.navigateToCurrent();
  }

  private navigateToCurrent(): void {
    this.router.navigate([
      '/learn',
      this.fromLanguageCode(),
      this.toLanguageCode(),
      this.category(),
    ]);
  }

  private persistLanguages(): void {
    localStorage.setItem(this.FROM_LANGUAGE_KEY, this.fromLanguageCode());
    if (this.toLanguageCode()) {
      localStorage.setItem(this.TO_LANGUAGE_KEY, this.toLanguageCode());
    }
  }

  sanitizeKey(key: string): string {
    return key.replace(/[?<>:"/\\|*]/g, '').trim();
  }

  // ---------- Screen wake lock ----------

  async toggleScreenLock(enabled: boolean): Promise<void> {
    if (enabled) {
      await this.keepScreenOn();
    } else {
      await this.releaseScreenLock();
    }
  }

  async keepScreenOn(): Promise<void> {
    try {
      if (this.wakeLock || !('wakeLock' in navigator)) return;

      this.wakeLock = await navigator.wakeLock.request('screen');
      this.screenLockActive.set(true);
      this.wakeLock.addEventListener('release', () => {
        this.wakeLock = null;
        this.screenLockActive.set(false);
      });
    } catch (error) {
      console.error(error);
      this.screenLockActive.set(false);
    }
  }

  async releaseScreenLock(): Promise<void> {
    if (!this.wakeLock) {
      this.screenLockActive.set(false);
      return;
    }

    await this.wakeLock.release();
    this.wakeLock = null;
    this.screenLockActive.set(false);
  }

  // ---------- Offline ----------

  async downloadAllAudio(): Promise<void> {
    if (this.isDownloading()) return;

    this.isDownloading.set(true);
    this.downloadProgress.set(0);

    try {
      const cache = await caches.open('audio-cache');
      const audioFiles: string[] = [];
      const allCategories = ['words', 'numbers', 'sentences'];

      const includePremium = this.premium.unlocked();
      const fromContent = this.languageService.getContent(
        this.fromLanguageCode(),
        includePremium
      );
      const toContent = this.languageService.getContent(
        this.toLanguageCode(),
        includePremium
      );

      allCategories.forEach((category) => {
        const fromItems = fromContent
          ? fromContent[category as keyof LearningContent]
          : {};
        const toItems = toContent
          ? toContent[category as keyof LearningContent]
          : {};

        const allKeys = new Set([
          ...Object.keys(fromItems ?? {}),
          ...Object.keys(toItems ?? {}),
        ]);

        allKeys.forEach((key) => {
          const fileName = this.sanitizeKey(key);
          audioFiles.push(
            `/assets/audio/${this.fromLanguageCode()}/${category}/${fileName}.mp3`
          );
          audioFiles.push(
            `/assets/audio/${this.toLanguageCode()}/${category}/${fileName}.mp3`
          );
        });
      });

      let completed = 0;
      for (const file of audioFiles) {
        try {
          const cached = await cache.match(file);
          if (!cached) {
            const response = await fetch(file);
            if (response.ok) {
              await cache.put(file, response);
            }
          }
        } catch (error) {
          console.error(`Error caching file ${file}:`, error);
        } finally {
          completed++;
          this.downloadProgress.set(
            Math.round((completed / audioFiles.length) * 100)
          );
        }
      }
    } catch (error) {
      console.error('Error downloading audio files:', error);
    } finally {
      this.isDownloading.set(false);
      setTimeout(() => this.downloadProgress.set(0), 2000);
    }
  }

  async checkAudioAvailability(audioPath: string): Promise<boolean> {
    if (!this.isOffline()) return true;

    try {
      const cache = await caches.open('audio-cache');
      const cached = await cache.match(audioPath);
      return cached !== undefined;
    } catch (error) {
      console.error('Error checking cache:', error);
      return false;
    }
  }

  // ---------- Misc ----------

  private lastSettings = {
    wordRepeat: 1,
    loopRepeat: 2,
    playBothLanguages: true,
  };

  private settingsChanged(): boolean {
    const changed =
      this.wordRepeat() !== this.lastSettings.wordRepeat ||
      this.loopRepeat() !== this.lastSettings.loopRepeat ||
      this.playBothLanguages() !== this.lastSettings.playBothLanguages;

    this.lastSettings = {
      wordRepeat: this.wordRepeat(),
      loopRepeat: this.loopRepeat(),
      playBothLanguages: this.playBothLanguages(),
    };

    return changed;
  }

  @HostListener('document:visibilitychange')
  async onVisibilityChange(): Promise<void> {
    if (document.hidden && this.isPlaying()) {
      this.stopPlayback();
    }

    if (this.screenLockActive() && document.visibilityState === 'visible') {
      await this.keepScreenOn();
    }
  }
}
