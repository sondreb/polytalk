import { TestBed } from '@angular/core/testing';
import { SettingsService } from './settings.service';

describe('SettingsService', () => {
  let service: SettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return default settings if no settings are saved', () => {
    localStorage.removeItem('polytalk-extra-settings');
    const settings = service.getSettings();
    expect(settings.wordDelay).toBe(50);
    expect(settings.playbackSpeed).toBe(1.0);
  });

  it('should save and load settings correctly', () => {
    const newSettings = { wordDelay: 100, playbackSpeed: 1.5 };
    service.updateSettings(newSettings);
    const settings = service.getSettings();
    expect(settings.wordDelay).toBe(100);
    expect(settings.playbackSpeed).toBe(1.5);
  });

  it('should reset settings to default', () => {
    const newSettings = { wordDelay: 100, playbackSpeed: 1.5 };
    service.updateSettings(newSettings);
    service.resetSettings();
    const settings = service.getSettings();
    expect(settings.wordDelay).toBe(50);
    expect(settings.playbackSpeed).toBe(1.0);
  });

  it('should update individual settings correctly', () => {
    service.updateSettings({ wordDelay: 200 });
    let settings = service.getSettings();
    expect(settings.wordDelay).toBe(200);
    expect(settings.playbackSpeed).toBe(1.0);

    service.updateSettings({ playbackSpeed: 1.8 });
    settings = service.getSettings();
    expect(settings.wordDelay).toBe(200);
    expect(settings.playbackSpeed).toBe(1.8);
  });
});
