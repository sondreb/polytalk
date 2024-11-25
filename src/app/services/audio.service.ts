import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private audio : any = new Audio();
  private silentAudio: AudioContext;
  private queue: string[] = [];
  private isPlaying = new BehaviorSubject<boolean>(false);
  private repeatCount = 1;
  private currentRepeat = 1;
  private currentIndex = 0;
  private delay = 250; // Will be updated from settings
  private playbackTimeout: any;
  private currentFile = new BehaviorSubject<string>('');

  constructor(private settingsService: SettingsService) {
    // Initialize Web Audio API context
    this.silentAudio = new AudioContext();

    // Subscribe to settings changes
    this.settingsService.settings$.subscribe((settings) => {
      this.delay = settings.wordDelay;
      this.audio.playbackRate = settings.playbackSpeed;
    });

    // Create silent buffer
    const silentBuffer = this.silentAudio.createBuffer(
      1,
      this.silentAudio.sampleRate * 0.1, // 100ms of silence
      this.silentAudio.sampleRate
    );

    // Connect audio context to keep stream alive
    const source = this.silentAudio.createBufferSource();
    source.buffer = silentBuffer;
    source.connect(this.silentAudio.destination);
    source.loop = true;
    source.start();

    this.audio.onended = () => this.playNext();
  }

  private sanitizeKey(key: string): string {
    return key.replace(/[?<>:"/\\|*]/g, '').trim();
  }

  setQueue(audioFiles: string[], repeat: number = 1) {
    // Sanitize all filenames in the queue
    this.queue = audioFiles.map((file) => {
      const dirPath = file.substring(0, file.lastIndexOf('/') + 1);
      const filename = file.substring(file.lastIndexOf('/') + 1);
      const sanitizedFilename = this.sanitizeKey(filename);
      return dirPath + sanitizedFilename;
    });
    this.repeatCount = repeat;
    this.currentRepeat = 1;
    this.currentIndex = 0;
  }

  // Remove setDelay method as it's now handled by settings
  // setDelay(seconds: number) {
  //   this.delay = Math.max(0.25, seconds) * 1000;
  // }

  private async validateAudioBlob(blob: Blob): Promise<boolean> {
    return new Promise((resolve) => {
      const audio = new Audio(URL.createObjectURL(blob));
      const timeoutId = setTimeout(() => {
        audio.onerror = null;
        audio.oncanplaythrough = null;
        resolve(false);
      }, 3000); // 3 second timeout

      audio.onerror = () => {
        clearTimeout(timeoutId);
        resolve(false);
      };

      audio.oncanplaythrough = () => {
        clearTimeout(timeoutId);
        resolve(true);
      };
    });
  }

  private async getAudioBlob(url: string): Promise<Blob> {
    try {
      // Try to fetch from cache first
      const cache = await caches.open('audio-cache');
      let response = await cache.match(url);
      let blob: Blob;

      if (response) {
        blob = await response.blob();
        // Validate cached blob
        if (await this.validateAudioBlob(blob)) {
          return blob;
        }
        // If validation fails, remove from cache
        await cache.delete(url);
      }

      // Fetch from network
      response = await fetch(url);
      blob = await response.clone().blob();

      // Validate blob before caching
      if (await this.validateAudioBlob(blob)) {
        await cache.put(url, response);
      }

      return blob;
    } catch (error) {
      console.error('Error fetching audio:', error);
      throw error;
    }
  }

  async play(url?: string) {
    this.silentAudio.resume();

    if (url) {
      try {
        const dirPath = url.substring(0, url.lastIndexOf('/') + 1);
        const filename = url.substring(url.lastIndexOf('/') + 1);
        const sanitizedUrl = dirPath + this.sanitizeKey(filename);

        const blob = await this.getAudioBlob(sanitizedUrl);
        this.audio.src = URL.createObjectURL(blob);
        // Set playback rate directly from current settings
        this.settingsService.settings$.subscribe((settings) => {
          this.audio.playbackRate = settings.playbackSpeed;
        });
        this.currentFile.next(sanitizedUrl);

        await this.audio.play();
        this.isPlaying.next(true);
      } catch (error) {
        console.error('Error playing audio:', error);
        this.isPlaying.next(false);
        const cache = await caches.open('audio-cache');
        await cache.delete(url);
      }
    } else if (this.queue.length > 0) {
      try {
        const blob = await this.getAudioBlob(this.queue[0]);
        this.audio.src = URL.createObjectURL(blob);
        // Set playback rate directly from current settings
        // Set playback rate directly from current settings
        this.settingsService.settings$.subscribe((settings) => {
          this.audio.playbackRate = settings.playbackSpeed;
        });
        // this.audio.playbackRate = this.settingsService.settings$.value.playbackSpeed;
        this.currentFile.next(this.queue[0]);

        await this.audio.play();
        this.isPlaying.next(true);
      } catch (error) {
        console.error('Error playing audio:', error);
        this.isPlaying.next(false);
        const cache = await caches.open('audio-cache');
        await cache.delete(this.queue[0]);
      }
    }
  }

  async playSingleFile(audioFile: string) {
    try {
      const blob = await this.getAudioBlob(audioFile);
      const audio = new Audio(URL.createObjectURL(blob));
      this.currentFile.next(audioFile);

      // Apply current playback rate
      audio.playbackRate = this.audio.playbackRate;
      await audio.play();

      // Clear current file after playback
      audio.onended = () => this.currentFile.next('');
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  }

  stop() {
    this.isPlaying.next(false);
    this.currentFile.next('');
    
    // Force stop and unload any playing audio
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.audio.src = ''; // Clear source
      this.audio.load(); // Force reload
      this.audio = null;
    }

    // Clear queue and audio elements pool
    this.queue = [];
  }

  // Optional: Add a cleanup method to be called on component destruction
  cleanup() {
    this.stop();
  }

  private async playNext() {
    this.currentIndex++;

    if (this.currentIndex >= this.queue.length) {
      if (this.currentRepeat < this.repeatCount) {
        this.currentRepeat++;
        this.currentIndex = 0;
      } else {
        this.stop();
        return;
      }
    }

    if (this.currentIndex < this.queue.length) {
      this.playbackTimeout = setTimeout(async () => {
        try {
          const blob = await this.getAudioBlob(this.queue[this.currentIndex]);
          this.audio.src = URL.createObjectURL(blob);
          // Set playback rate directly from current settings
          // Set playback rate directly from current settings
          this.settingsService.settings$.subscribe((settings) => {
            this.audio.playbackRate = settings.playbackSpeed;
          });
          // this.audio.playbackRate =
          //   this.settingsService.settings$.value.playbackSpeed;
          this.currentFile.next(this.queue[this.currentIndex]);

          await this.audio.play();
          this.isPlaying.next(true);
        } catch (error) {
          console.error('Error playing audio:', error);
          this.isPlaying.next(false);
        }
      }, this.delay);
    }
  }

  get isPlayingState() {
    return this.isPlaying.asObservable();
  }

  // Add getter for the current file observable
  get currentFileState() {
    return this.currentFile.asObservable();
  }

  async clearAudioCache(): Promise<void> {
    try {
      const cache = await caches.open('audio-cache');
      await cache.keys().then((keys) => keys.forEach(key => cache.delete(key)));
    } catch (error) {
      console.error('Error clearing audio cache:', error);
      throw error;
    }
  }
}
