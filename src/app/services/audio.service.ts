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
  private audioQueue: { title: string, url: string }[] = [];

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

    // Enhanced MediaSession setup
    if ('mediaSession' in navigator) {
      navigator.mediaSession.setActionHandler('play', () => {
        this.play();
        navigator.mediaSession.playbackState = 'playing';
      });

      navigator.mediaSession.setActionHandler('pause', () => {
        this.stop();
        navigator.mediaSession.playbackState = 'paused';
      });

      navigator.mediaSession.setActionHandler('stop', () => {
        this.stop();
        navigator.mediaSession.playbackState = 'none';
      });

      navigator.mediaSession.setActionHandler('nexttrack', () => {
        if (this.isPlaying.value) {
          clearTimeout(this.playbackTimeout);
          this.playNext();
        }
      });

      navigator.mediaSession.setActionHandler('previoustrack', () => {
        if (this.isPlaying.value && this.currentIndex > 0) {
          clearTimeout(this.playbackTimeout);
          this.currentIndex -= 2; // Go back two steps because playNext will increment
          if (this.currentIndex < -1) this.currentIndex = -1;
          this.playNext();
        }
      });

      // Add seek handlers if needed
      navigator.mediaSession.setActionHandler('seekto', (details) => {
        if (details.seekTime && this.audio) {
          this.audio.currentTime = details.seekTime;
        }
      });

      // Update position state periodically
      setInterval(() => {
        if (this.audio && this.isPlaying.value) {
          navigator.mediaSession.setPositionState({
            duration: this.audio.duration || 0,
            position: this.audio.currentTime || 0,
            playbackRate: this.audio.playbackRate || 1,
          });
        }
      }, 1000);
    }

    // Add event listeners for better audio state management
    this.audio.addEventListener('play', () => {
      this.isPlaying.next(true);
      if ('mediaSession' in navigator) {
        navigator.mediaSession.playbackState = 'playing';
        this.updateMediaMetadata();
        // Request audio focus
        if ('setActive' in navigator.mediaSession) {
          (navigator.mediaSession as any).setActive(true).catch((e: any) => {
            console.warn('Failed to set media session active:', e);
          });
        }
      }
    });

    this.audio.addEventListener('pause', () => {
      this.isPlaying.next(false);
      if ('mediaSession' in navigator) {
        navigator.mediaSession.playbackState = 'paused';
        if ('setActive' in navigator.mediaSession) {
          (navigator.mediaSession as any).setActive(false).catch((e: any) => {
            console.warn('Failed to release media session:', e);
          });
        }
      }
    });

    this.audio.addEventListener('ended', () => {
      if ('mediaSession' in navigator) {
        navigator.mediaSession.playbackState = 'none';
      }
    });

    // Add error handling
    this.audio.addEventListener('error', (e: any) => {
      console.error('Audio playback error:', e);
      this.isPlaying.next(false);
      if ('mediaSession' in navigator) {
        navigator.mediaSession.playbackState = 'none';
      }
    });
  }

  private sanitizeKey(key: string): string {
    return key.replace(/[?<>:"/\\|*]/g, '').trim();
  }

  setQueue(audioFiles: string[], repeat: number = 1) {
    // Sanitize and prepare queue with metadata
    this.audioQueue = audioFiles.map(file => {
      const dirPath = file.substring(0, file.lastIndexOf('/') + 1);
      const filename = file.substring(file.lastIndexOf('/') + 1);
      const sanitizedFilename = this.sanitizeKey(filename);
      return {
        title: sanitizedFilename.replace('.mp3', ''),
        url: dirPath + sanitizedFilename
      };
    });
    
    this.queue = this.audioQueue.map(item => item.url);
    this.repeatCount = repeat;
    this.currentRepeat = 1;
    this.currentIndex = 0;
  }

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

    try {
      if (url) {
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
      } else if (this.queue.length > 0) {
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
      }

      // Request audio focus when starting playback
      if ('mediaSession' in navigator && 'setActive' in navigator.mediaSession) {
        try {
          await (navigator.mediaSession as any).setActive(true);
        } catch (e) {
          console.warn('Failed to set media session active:', e);
        }
      }

      this.updateMediaMetadata();
    } catch (error) {
      console.error('Error in play:', error);
      this.isPlaying.next(false);
    }

    // Update media session metadata
    if ('mediaSession' in navigator && this.audioQueue.length > 0) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: this.audioQueue[this.currentIndex]?.title || 'Audio Playback',
        artist: 'PolyTalk',
        album: 'Language Learning',
      });
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
    
    // Just pause and reset the current audio instead of destroying it
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }

    // Clear queue but keep the audio instance
    this.queue = [];
    this.currentIndex = 0;
    this.currentRepeat = 1;

    // Update media session state
    if ('mediaSession' in navigator) {
      navigator.mediaSession.playbackState = 'none';
      if ('setActive' in navigator.mediaSession) {
        (navigator.mediaSession as any).setActive(false).catch((e: any) => {
          console.warn('Failed to release media session:', e);
        });
      }
    }
  }

  // Optional: Add a cleanup method to be called on component destruction
  cleanup() {
    this.stop();
    
    // Only null out audio instance during actual cleanup
    if (this.audio) {
      this.audio.onended = null;
      this.audio.onerror = null;
      this.audio.onplay = null;
      this.audio.onpause = null;
      this.audio = null;
    }

    // Clear media session handlers
    if ('mediaSession' in navigator) {
      if ('setActive' in navigator.mediaSession) {
        (navigator.mediaSession as any).setActive(false).catch((e: any) => {
          console.warn('Failed to release media session:', e);
        });
      }
      navigator.mediaSession.metadata = null;
      navigator.mediaSession.setActionHandler('play', null);
      navigator.mediaSession.setActionHandler('pause', null);
      navigator.mediaSession.setActionHandler('stop', null);
      navigator.mediaSession.setActionHandler('previoustrack', null);
      navigator.mediaSession.setActionHandler('nexttrack', null);
      navigator.mediaSession.setActionHandler('seekto', null);
    }

    // Cleanup audio context
    if (this.silentAudio) {
      this.silentAudio.close();
    }
  }

  private async playNext() {
    if (!this.isPlaying.value) {
      return; // Don't continue if playback was stopped
    }

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

    // Update media session metadata for next track
    if ('mediaSession' in navigator && this.audioQueue.length > 0) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: this.audioQueue[this.currentIndex]?.title || 'Audio Playback',
        artist: 'PolyTalk',
        album: 'Language Learning',
      });
    }
  }

  private updateMediaMetadata() {
    if ('mediaSession' in navigator && this.audioQueue.length > 0) {
      const currentItem = this.audioQueue[this.currentIndex];
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentItem?.title || 'Language Learning',
        artist: 'PolyTalk',
        album: 'Language Practice',
        artwork: [
          {
            src: 'assets/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'assets/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      });
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
