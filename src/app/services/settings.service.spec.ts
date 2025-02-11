import { test, expect } from '@playwright/test';
import { SettingsService } from './settings.service';

test.describe('SettingsService', () => {
  let service: SettingsService;

  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      TestBed.configureTestingModule({});
      service = TestBed.inject(SettingsService);
    });
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('should save and load settings correctly', () => {
    const newSettings = { wordDelay: 100, playbackSpeed: 1.5 };
    service.updateSettings(newSettings);
    const settings = service.getSettings();
    expect(settings.wordDelay).toBe(100);
    expect(settings.playbackSpeed).toBe(1.5);
  });

  test('should reset settings to default', () => {
    const newSettings = { wordDelay: 100, playbackSpeed: 1.5 };
    service.updateSettings(newSettings);
    service.resetSettings();
    const settings = service.getSettings();
    expect(settings.wordDelay).toBe(50);
    expect(settings.playbackSpeed).toBe(1.0);
  });
});
