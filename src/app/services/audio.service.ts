import { effect, Injectable, signal, computed } from '@angular/core';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private audio: any = new Audio();
  private silentAudio: AudioContext;
  private queue: string[] = [];
  private isPlayingSignal = signal<boolean>(false);
  private repeatCount = 1;
  private currentRepeat = 1;
  private currentIndex = 0;
  private delay = 250; // Will be updated from settings
  private playbackTimeout: any;
  private currentFileSignal = signal<string>('');
  private audioQueue: { title: string; url: string }[] = [];

  // Public computed signals for components to use
  readonly isPlaying = computed(() => this.isPlayingSignal());
  readonly currentFile = computed(() => this.currentFileSignal());

  constructor(private settingsService: SettingsService) {
    // Initialize Web Audio API context
    this.silentAudio = new AudioContext();

    // Use effect to react to settings changes
    effect(() => {
      this.delay = this.settingsService.wordDelay();
      if (this.audio) {
        this.audio.playbackRate = this.settingsService.playbackSpeed();
      }
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

    this.audio.onended = () => {
      console.log('Audio ended, playing next');
      this.playNext();
    };

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
        if (this.isPlayingSignal()) {
          clearTimeout(this.playbackTimeout);
          this.playNext();
        }
      });

      navigator.mediaSession.setActionHandler('previoustrack', () => {
        if (this.isPlayingSignal() && this.currentIndex > 0) {
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
        if (this.audio && this.isPlayingSignal()) {
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
      this.isPlayingSignal.set(true);
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
      this.isPlayingSignal.set(false);
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
      this.isPlayingSignal.set(false);
      if ('mediaSession' in navigator) {
        navigator.mediaSession.playbackState = 'none';
      }
    });
  }

  private sanitizeKey(key: string): string {
    return key.replace(/[?<>:"/\\|*]/g, '').trim();
  }

  setQueue(audioFiles: string[], repeat: number = 1) {
    // Clear any existing playback
    if (this.playbackTimeout) {
      clearTimeout(this.playbackTimeout);
      this.playbackTimeout = null;
    }

    // Reset audio state
    this.audio.pause();
    this.audio.currentTime = 0;

    // Sanitize and prepare queue with metadata
    this.audioQueue = audioFiles.map((file) => {
      const dirPath = file.substring(0, file.lastIndexOf('/') + 1);
      const filename = file.substring(file.lastIndexOf('/') + 1);
      const sanitizedFilename = this.sanitizeKey(filename);
      return {
        title: sanitizedFilename.replace('.mp3', ''),
        url: dirPath + sanitizedFilename,
      };
    });

    this.queue = this.audioQueue.map((item) => item.url);
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
        // Single file playback logic...
        const dirPath = url.substring(0, url.lastIndexOf('/') + 1);
        const filename = url.substring(url.lastIndexOf('/') + 1);
        const sanitizedUrl = dirPath + this.sanitizeKey(filename);

        const blob = await this.getAudioBlob(sanitizedUrl);
        this.audio.src = URL.createObjectURL(blob);
        this.audio.playbackRate = this.settingsService.playbackSpeed();
        this.currentFileSignal.set(sanitizedUrl);

        await this.audio.play();
        this.isPlayingSignal.set(true);
      } else if (this.queue.length > 0) {
        // Queue playback - start from beginning
        this.currentIndex = -1; // Will be incremented to 0 in playNext
        this.currentRepeat = 1;
        this.isPlayingSignal.set(true);
        this.playNext(); // Start the queue playback
      }

      // Update media session and metadata
      if ('mediaSession' in navigator) {
        if ('setActive' in navigator.mediaSession) {
          await (navigator.mediaSession as any).setActive(true);
        }
        this.updateMediaMetadata();
      }
    } catch (error) {
      console.error('Error in play:', error);
      this.isPlayingSignal.set(false);
    }
  }

  async playSingleFile(audioFile: string) {
    try {
      const blob = await this.getAudioBlob(audioFile);
      // Create a new temporary audio element for single file playback
      const tempAudio = new Audio(URL.createObjectURL(blob));
      tempAudio.playbackRate = this.settingsService.playbackSpeed();

      // Don't update media session or current file for single file playback
      await tempAudio.play();

      // Clean up after playback
      tempAudio.onended = () => {
        URL.revokeObjectURL(tempAudio.src);
        tempAudio.remove();
      };
    } catch (error) {
      console.error('Error playing single audio file:', error);
    }
  }

  stop() {
    if (this.playbackTimeout) {
      clearTimeout(this.playbackTimeout);
      this.playbackTimeout = null;
    }

    this.isPlayingSignal.set(false);
    this.currentFileSignal.set('');

    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }

    // Keep the queue but reset playback position
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
    if (!this.isPlayingSignal()) {
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
      // Clear any existing timeout
      if (this.playbackTimeout) {
        clearTimeout(this.playbackTimeout);
      }

      this.playbackTimeout = setTimeout(async () => {
        try {
          const blob = await this.getAudioBlob(this.queue[this.currentIndex]);
          this.audio.src = URL.createObjectURL(blob);
          this.audio.playbackRate = this.settingsService.playbackSpeed();
          this.currentFileSignal.set(this.queue[this.currentIndex]);

          await this.audio.play();
          this.isPlayingSignal.set(true);
          this.updateMediaMetadata();
        } catch (error) {
          console.error('Error playing audio:', error);
          this.isPlayingSignal.set(false);
          // Try to continue with next file on error
          this.playNext();
        }
      }, this.delay);
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
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      });
    }
  }

  async clearAudioCache(): Promise<void> {
    try {
      const cache = await caches.open('audio-cache');
      await cache
        .keys()
        .then((keys) => keys.forEach((key) => cache.delete(key)));
    } catch (error) {
      console.error('Error clearing audio cache:', error);
      throw error;
    }
  }
}
