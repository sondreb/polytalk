import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SettingsService } from '../../services/settings.service';
import { AudioService } from '../../services/audio.service';
import { ThemeService } from '../../services/theme.service';
import { TranslationService } from '../../services/translation.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { PremiumCardComponent } from '../../components/premium-card/premium-card.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe, PremiumCardComponent],
  template: `
    <div class="settings-container">
      <h1>{{ 'settings.title' | translate }}</h1>

      <section class="card">
        <div class="setting-item">
          <label for="ui-language-select">{{ 'settings.uiLanguage' | translate }}</label>
          <select
            id="ui-language-select"
            [(ngModel)]="selectedUiLanguage"
            (ngModelChange)="onUiLanguageChange($event)"
          >
            @for (lang of translationService.supportedLanguages; track lang.code) {
              <option [value]="lang.code">{{ lang.nativeName }} ({{ lang.name }})</option>
            }
          </select>
        </div>

        <div class="setting-item">
          <label for="theme-select">{{ 'settings.theme' | translate }}</label>
          <select id="theme-select" [(ngModel)]="selectedTheme" (ngModelChange)="onThemeChange($event)">
            <option value="auto">{{ 'settings.themeAuto' | translate }}</option>
            <option value="light">{{ 'settings.themeLight' | translate }}</option>
            <option value="dark">{{ 'settings.themeDark' | translate }}</option>
          </select>
        </div>
      </section>

      <section class="card">
        <app-premium-card />
      </section>

      <section class="card">
        <div class="setting-item">
          <label for="word-delay">
            {{ 'settings.wordDelay' | translate }}
            <span class="value">{{ wordDelay() }}</span>
          </label>
          <input
            id="word-delay"
            type="range"
            [min]="0"
            [max]="3000"
            [step]="50"
            [ngModel]="wordDelay()"
            (ngModelChange)="updateWordDelay($event)"
          />
        </div>

        <div class="setting-item">
          <label for="playback-speed">
            {{ 'settings.playbackSpeed' | translate }}
            <span class="value">{{ playbackSpeed() }}x</span>
          </label>
          <input
            id="playback-speed"
            type="range"
            [min]="0.5"
            [max]="2"
            [step]="0.1"
            [ngModel]="playbackSpeed()"
            (ngModelChange)="updatePlaybackSpeed($event)"
          />
        </div>
      </section>

      <section class="card actions">
        <button (click)="clearCache()" [disabled]="isClearingCache()">
          {{ isClearingCache() ? ('settings.clearing' | translate) : ('settings.clearCache' | translate) }}
        </button>
        <button (click)="settingsService.resetSettings()">
          {{ 'settings.resetSettings' | translate }}
        </button>
        @if (cacheMessage()) {
          <span class="status" [class]="cacheMessageClass()">{{ cacheMessage() }}</span>
        }
      </section>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .settings-container {
        max-width: 640px;
        margin: 0 auto;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      h1 {
        font-size: 1.75rem;
        margin: 0 0 0.5rem;
      }
      .card {
        display: flex;
        flex-direction: column;
      }
      .card:hover {
        box-shadow: var(--shadow-sm);
        border-color: var(--border-color);
      }
      .setting-item + .setting-item {
        margin-top: 1.25rem;
        padding-top: 1.25rem;
        border-top: 1px solid var(--border-color);
      }
      .setting-item label {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        margin-bottom: 0.6rem;
        font-weight: 500;
      }
      .value {
        color: var(--primary-color);
        font-weight: 600;
        font-variant-numeric: tabular-nums;
      }
      select {
        width: 100%;
        cursor: pointer;
      }
      input[type='range'] {
        width: 100%;
        padding: 0;
        border: none;
        background: transparent;
        accent-color: var(--primary-color);
        cursor: pointer;
      }
      input[type='range']:focus {
        box-shadow: none;
      }
      .actions {
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.75rem;
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
    `,
  ],
})
export class SettingsComponent {
  wordDelay = computed(() => this.settingsService.wordDelay());
  playbackSpeed = computed(() => this.settingsService.playbackSpeed());
  isClearingCache = signal(false);
  cacheMessage = signal('');
  cacheMessageClass = signal('');
  themeService = inject(ThemeService);
  audioService = inject(AudioService);
  settingsService = inject(SettingsService);
  translationService = inject(TranslationService);
  selectedTheme = signal(this.themeService.getSavedTheme());
  selectedUiLanguage = this.translationService.currentLanguage();

  constructor(
  ) {
    // Create an effect to clear the cache message
    effect(() => {
      if (this.cacheMessage()) {
        setTimeout(() => this.cacheMessage.set(''), 3000);
      }
    });
  }

  updateWordDelay(value: number) {
    this.settingsService.updateSettings({ wordDelay: value });
  }

  updatePlaybackSpeed(value: number) {
    this.settingsService.updateSettings({ playbackSpeed: value });
  }

  async clearCache() {
    this.isClearingCache.set(true);
    this.cacheMessage.set('');
    try {
      await this.audioService.clearAudioCache();
      this.cacheMessage.set(this.translationService.translate('settings.cacheCleared'));
      this.cacheMessageClass.set('success');
    } catch (error) {
      this.cacheMessage.set(this.translationService.translate('settings.cacheFailed'));
      this.cacheMessageClass.set('error');
    } finally {
      this.isClearingCache.set(false);
    }
  }

  onThemeChange(theme: string) {
    this.themeService.saveTheme(theme);
    this.themeService.setTheme(theme);
  }

  onUiLanguageChange(code: string) {
    this.translationService.setLanguage(code);
  }

  ngAfterViewInit() {
    window.scrollTo(0, 0);
  }
}
