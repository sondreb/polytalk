import { TestBed } from '@angular/core/testing';
import { AudioService } from './audio.service';
import { SettingsService } from './settings.service';

describe('AudioService', () => {
  let service: AudioService;
  let settingsService: SettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AudioService, SettingsService],
    });
    service = TestBed.inject(AudioService);
    settingsService = TestBed.inject(SettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('should set and get queue correctly', () => {
  //   const audioFiles = ['file1.mp3', 'file2.mp3'];
  //   service.setQueue(audioFiles, 2);
  //   expect(service['queue']).toEqual(audioFiles);
  //   expect(service['repeatCount']).toBe(2);
  // });

  // it('should play audio file', async () => {
  //   spyOn(service, 'play').and.callThrough();
  //   await service.play('file1.mp3');
  //   expect(service.play).toHaveBeenCalledWith('file1.mp3');
  // });

  // it('should stop audio playback', () => {
  //   spyOn(service, 'stop').and.callThrough();
  //   service.stop();
  //   expect(service.stop).toHaveBeenCalled();
  // });

  // it('should update settings correctly', () => {
  //   settingsService.updateSettings({ wordDelay: 100, playbackSpeed: 1.5 });
  //   expect(settingsService.wordDelay()).toBe(100);
  //   expect(settingsService.playbackSpeed()).toBe(1.5);
  // });

  // it('should handle offline mode correctly', async () => {
  //   spyOn(service, 'checkAudioAvailability').and.returnValue(Promise.resolve(false));
  //   const result = await service.checkAudioAvailability('file1.mp3');
  //   expect(result).toBe(false);
  // });

  // it('should cache audio files', async () => {
  //   spyOn(service, 'cacheAudioFiles').and.callThrough();
  //   const audioFiles = ['file1.mp3', 'file2.mp3'];
  //   await service.cacheAudioFiles(audioFiles);
  //   expect(service.cacheAudioFiles).toHaveBeenCalledWith(audioFiles);
  // });

  // it('should clear audio cache', async () => {
  //   spyOn(service, 'clearAudioCache').and.callThrough();
  //   await service.clearAudioCache();
  //   expect(service.clearAudioCache).toHaveBeenCalled();
  // });
});
