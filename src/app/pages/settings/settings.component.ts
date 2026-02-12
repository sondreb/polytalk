import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SettingsService } from '../../services/settings.service';
import { AudioService } from '../../services/audio.service';
import { ThemeService } from '../../services/theme.service';
import { TranslationService } from '../../services/translation.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  template: `
    <div class="settings-container">
      <h2>{{ 'settings.title' | translate }}</h2>

      <div class="setting-item">
        <label>{{ 'settings.uiLanguage' | translate }}</label>
        <select [(ngModel)]="selectedUiLanguage" (ngModelChange)="onUiLanguageChange($event)">
          @for (lang of translationService.supportedLanguages; track lang.code) {
            <option [value]="lang.code">{{ lang.nativeName }} ({{ lang.name }})</option>
          }
        </select>
      </div>

      <div class="setting-item">
        <label>{{ 'settings.wordDelay' | translate }} {{ wordDelay() }}</label>
        <input
          type="range"
          [min]="0"
          [max]="3000"
          [step]="50"
          [ngModel]="wordDelay()"
          (ngModelChange)="updateWordDelay($event)"
        />
      </div>

      <div class="setting-item">
        <label>{{ 'settings.playbackSpeed' | translate }} {{ playbackSpeed() }}x</label>
        <input
          type="range"
          [min]="0.5"
          [max]="2"
          [step]="0.1"
          [ngModel]="playbackSpeed()"
          (ngModelChange)="updatePlaybackSpeed($event)"
        />
      </div>

      <div class="setting-item">
        <label for="theme-select">{{ 'settings.theme' | translate }}</label>
        <select id="theme-select" [(ngModel)]="selectedTheme" (ngModelChange)="onThemeChange($event)">
          <option value="auto">{{ 'settings.themeAuto' | translate }}</option>
          <option value="light">{{ 'settings.themeLight' | translate }}</option>
          <option value="dark">{{ 'settings.themeDark' | translate }}</option>
        </select>
      </div>

      <div class="setting-item">
        <button (click)="clearCache()" [disabled]="isClearingCache()">
          {{ isClearingCache() ? ('settings.clearing' | translate) : ('settings.clearCache' | translate) }}
        </button>
        <span *ngIf="cacheMessage()" [class]="cacheMessageClass()">{{
          cacheMessage()
        }}</span>
      </div>

      <div class="setting-item">
        <button (click)="settingsService.resetSettings()">{{ 'settings.resetSettings' | translate }}</button>
      </div>
    </div>
  `,
  styles: [
    `
      .settings-container {
        max-width: 600px;
        margin: 2rem auto;
        padding: 0 1rem;
      }
      .setting-item {
        margin: 2rem 0;
      }
      .setting-item label {
        display: block;
        margin-bottom: 0.5rem;
      }
      input[type='range'] {
        width: 100%;
      }
      button {
        padding: 0.5rem 1rem;
        margin-bottom: 0.5rem;
        cursor: pointer;
      }
      button:disabled {
        cursor: not-allowed;
        opacity: 0.7;
      }
      .success {
        color: green;
        margin-inline-start: 1em;
      }
      .error {
        color: red;
        margin-inline-start: 1em;
      }
      select {
        font-size: 1.2rem;
        padding: 0.5rem;
        border-radius: 8px;
        border: 2px solid rgba(99, 102, 241, 0.2);
        background: var(--surface-color);
        color: var(--text-color);
        cursor: pointer;
        transition: all 0.3s ease;
      }
      select:focus {
        outline: none;
        border-color: var(--primary-color);
        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
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
