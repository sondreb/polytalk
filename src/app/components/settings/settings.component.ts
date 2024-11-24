import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SettingsService } from '../../services/settings.service';

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
          [min]="100"
          [max]="3000"
          [step]="100"
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
    `,
  ],
})
export class SettingsComponent {
  wordDelay?: number;
  playbackSpeed?: number;

  constructor(private settingsService: SettingsService) {
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
}
