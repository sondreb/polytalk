import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SettingsService } from '../../services/settings.service';
import { AudioService } from '../../services/audio.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="settings-container">
      <h2>Settings</h2>

      <div class="setting-item">
        <label>Word Delay (ms): {{ wordDelay }}</label>
        <input
          type="range"
          [min]="0"
          [max]="3000"
          [step]="50"
          [(ngModel)]="wordDelay"
          (change)="updateWordDelay()"
        />
      </div>

      <div class="setting-item">
        <label>Playback Speed: {{ playbackSpeed }}x</label>
        <input
          type="range"
          [min]="0.5"
          [max]="2"
          [step]="0.1"
          [(ngModel)]="playbackSpeed"
          (change)="updatePlaybackSpeed()"
        />
      </div>

      <div class="setting-item">
        <button (click)="clearCache()" [disabled]="isClearingCache">
          {{ isClearingCache ? 'Clearing...' : 'Clear Audio Cache' }}
        </button>
        <span *ngIf="cacheMessage" [class]="cacheMessageClass">{{
          cacheMessage
        }}</span>
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
    `,
  ],
})
export class SettingsComponent {
  wordDelay?: number;
  playbackSpeed?: number;
  isClearingCache = false;
  cacheMessage = '';
  cacheMessageClass = '';

  constructor(
    private settingsService: SettingsService,
    private audioService: AudioService
  ) {
    this.settingsService.settings$.subscribe((settings) => {
      this.wordDelay = settings.wordDelay;
      this.playbackSpeed = settings.playbackSpeed;
    });
  }

  updateWordDelay() {
    this.settingsService.updateSettings({ wordDelay: this.wordDelay });
  }

  updatePlaybackSpeed() {
    this.settingsService.updateSettings({ playbackSpeed: this.playbackSpeed });
  }

  async clearCache() {
    this.isClearingCache = true;
    this.cacheMessage = '';
    try {
      await this.audioService.clearAudioCache();
      this.cacheMessage = 'Cache cleared successfully!';
      this.cacheMessageClass = 'success';
    } catch (error) {
      this.cacheMessage = 'Failed to clear cache';
      this.cacheMessageClass = 'error';
    } finally {
      this.isClearingCache = false;
      setTimeout(() => (this.cacheMessage = ''), 3000); // Clear message after 3 seconds
    }
  }
}
