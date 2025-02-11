import { test, expect } from '@playwright/test';
import { SettingsComponent } from './settings.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SettingsService } from '../../services/settings.service';
import { AudioService } from '../../services/audio.service';
import { ThemeService } from '../../services/theme.service';

test.describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  let settingsService: SettingsService;
  let audioService: AudioService;
  let themeService: ThemeService;

  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      TestBed.configureTestingModule({
        imports: [FormsModule, CommonModule],
        providers: [SettingsService, AudioService, ThemeService],
      }).compileComponents();
    });
  });

  test.beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    settingsService = TestBed.inject(SettingsService);
    audioService = TestBed.inject(AudioService);
    themeService = TestBed.inject(ThemeService);
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should update word delay', () => {
    const newValue = 100;
    component.updateWordDelay(newValue);
    expect(settingsService.wordDelay()).toBe(newValue);
  });

  test('should update playback speed', () => {
    const newValue = 1.5;
    component.updatePlaybackSpeed(newValue);
    expect(settingsService.playbackSpeed()).toBe(newValue);
  });

  test('should clear cache', async () => {
    spyOn(audioService, 'clearAudioCache').and.returnValue(Promise.resolve());
    await component.clearCache();
    expect(audioService.clearAudioCache).toHaveBeenCalled();
  });

  test('should change theme', () => {
    const newTheme = 'dark';
    component.onThemeChange(newTheme);
    expect(themeService.getSavedTheme()).toBe(newTheme);
  });

  test('should reset settings', () => {
    spyOn(settingsService, 'resetSettings');
    component.settingsService.resetSettings();
    expect(settingsService.resetSettings).toHaveBeenCalled();
  });
});
