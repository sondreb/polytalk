import { test, expect } from '@playwright/test';
import { AudioService } from './audio.service';
import { SettingsService } from './settings.service';

test.describe('AudioService', () => {
  let service: AudioService;
  let settingsService: SettingsService;

  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      TestBed.configureTestingModule({
        providers: [AudioService, SettingsService],
      }).compileComponents();
    });
    service = TestBed.inject(AudioService);
    settingsService = TestBed.inject(SettingsService);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('should set and get queue correctly', () => {
    const audioFiles = ['file1.mp3', 'file2.mp3'];
    service.setQueue(audioFiles, 2);
    expect(service['queue']).toEqual(audioFiles);
    expect(service['repeatCount']).toBe(2);
  });

  test('should play audio file', async () => {
    spyOn(service, 'play').and.callThrough();
    await service.play('file1.mp3');
    expect(service.play).toHaveBeenCalledWith('file1.mp3');
  });

  test('should stop audio playback', () => {
    spyOn(service, 'stop').and.callThrough();
    service.stop();
    expect(service.stop).toHaveBeenCalled();
  });

  test('should update settings correctly', () => {
    settingsService.updateSettings({ wordDelay: 100, playbackSpeed: 1.5 });
    expect(settingsService.wordDelay()).toBe(100);
    expect(settingsService.playbackSpeed()).toBe(1.5);
  });

  test('should handle offline mode correctly', async () => {
    spyOn(service, 'checkAudioAvailability').and.returnValue(Promise.resolve(false));
    const result = await service.checkAudioAvailability('file1.mp3');
    expect(result).toBe(false);
  });

  test('should cache audio files', async () => {
    spyOn(service, 'cacheAudioFiles').and.callThrough();
    const audioFiles = ['file1.mp3', 'file2.mp3'];
    await service.cacheAudioFiles(audioFiles);
    expect(service.cacheAudioFiles).toHaveBeenCalledWith(audioFiles);
  });

  test('should clear audio cache', async () => {
    spyOn(service, 'clearAudioCache').and.callThrough();
    await service.clearAudioCache();
    expect(service.clearAudioCache).toHaveBeenCalled();
  });
});
