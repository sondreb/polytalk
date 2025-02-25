import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SettingsService } from '../../services/settings.service';
import { AudioService } from '../../services/audio.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="settings-container">
      <h2>Settings</h2>

      <div class="setting-item">
        <label>Word Delay (ms): {{ wordDelay() }}</label>
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
        <label>Playback Speed: {{ playbackSpeed() }}x</label>
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
        <label for="theme-select">Theme:</label>
        <select id="theme-select" [(ngModel)]="selectedTheme" (ngModelChange)="onThemeChange($event)">
          <option value="auto">Auto</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      <div class="setting-item">
        <button (click)="clearCache()" [disabled]="isClearingCache()">
          {{ isClearingCache() ? 'Clearing...' : 'Clear Audio Cache' }}
        </button>
        <span *ngIf="cacheMessage()" [class]="cacheMessageClass()">{{
          cacheMessage()
        }}</span>
      </div>

      <div class="setting-item">
        <button (click)="settingsService.resetSettings()">Reset Settings</button>
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
        margin-left: 1em;
      }
      .error {
        color: red;
        margin-left: 1em;
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
  selectedTheme = signal(this.themeService.getSavedTheme());

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
      this.cacheMessage.set('Cache cleared successfully!');
      this.cacheMessageClass.set('success');
    } catch (error) {
      this.cacheMessage.set('Failed to clear cache');
      this.cacheMessageClass.set('error');
    } finally {
      this.isClearingCache.set(false);
    }
  }

  onThemeChange(theme: string) {
    this.themeService.saveTheme(theme);
    this.themeService.setTheme(theme);
  }

  ngAfterViewInit() {
    window.scrollTo(0, 0);
  }
}
