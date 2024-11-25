import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface AppSettings {
  wordDelay: number;
  playbackSpeed: number;
}

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private defaultSettings: AppSettings = {
    wordDelay: 250,
    playbackSpeed: 1.0,
  };

  private settings = new BehaviorSubject<AppSettings>(
    this.loadSettings() || this.defaultSettings
  );

  settings$ = this.settings.asObservable();

  private loadSettings(): AppSettings | null {
    const saved = localStorage.getItem('polytalk-extra-settings');
    return saved ? JSON.parse(saved) : null;
  }

  updateSettings(newSettings: Partial<AppSettings>) {
    const current = this.settings.value;
    const updated = { ...current, ...newSettings };
    localStorage.setItem('polytalk-extra-settings', JSON.stringify(updated));
    this.settings.next(updated);
  }
}
