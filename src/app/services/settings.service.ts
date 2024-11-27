import { Injectable, signal, computed } from '@angular/core';

export interface AppSettings {
  wordDelay: number;
  playbackSpeed: number;
}

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private defaultSettings: AppSettings = {
    wordDelay: 50,
    playbackSpeed: 1.0,
  };

  private settingsSignal = signal<AppSettings>(
    this.loadSettings() || this.defaultSettings
  );

  // Computed values for individual settings
  readonly wordDelay = computed(() => this.settingsSignal().wordDelay);
  readonly playbackSpeed = computed(() => this.settingsSignal().playbackSpeed);

  // Method to get all settings
  getSettings() {
    return this.settingsSignal();
  }

  private loadSettings(): AppSettings | null {
    const saved = localStorage.getItem('polytalk-extra-settings');
    return saved ? JSON.parse(saved) : null;
  }

  updateSettings(newSettings: Partial<AppSettings>) {
    const current = this.settingsSignal();
    const updated = { ...current, ...newSettings };
    localStorage.setItem('polytalk-extra-settings', JSON.stringify(updated));
    this.settingsSignal.set(updated);
  }
}
