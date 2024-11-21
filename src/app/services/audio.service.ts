import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private audio = new Audio();
  private queue: string[] = [];
  private isPlaying = new BehaviorSubject<boolean>(false);
  private repeatCount = 1;
  private currentRepeat = 1;
  private currentIndex = 0;
  private delay = 250; // Default delay in milliseconds
  private playbackTimeout: any;

  constructor() {
    this.audio.onended = () => this.playNext();
  }

  setQueue(audioFiles: string[], repeat: number = 1) {
    this.queue = audioFiles;
    this.repeatCount = repeat;
    this.currentRepeat = 1;
    this.currentIndex = 0;
  }

  setDelay(seconds: number) {
    this.delay = Math.max(0.25, seconds) * 1000; // Convert to milliseconds, minimum 250ms
  }

  play(url?: string) {
    if (url) {
      // Single file playback
      this.audio.src = url;
      this.audio.play().then(() => {
        this.isPlaying.next(true);
      }).catch(error => {
        console.error('Error playing audio:', error);
        this.isPlaying.next(false);
      });
    } else if (this.queue.length > 0) {
      // Start queue playback
      this.audio.src = this.queue[0];
      this.audio.play().then(() => {
        this.isPlaying.next(true);
      }).catch(error => {
        console.error('Error playing audio:', error);
        this.isPlaying.next(false);
      });
    }
  }

  stop() {
    if (this.playbackTimeout) {
      clearTimeout(this.playbackTimeout);
    }
    this.audio.pause();
    this.audio.currentTime = 0;
    this.isPlaying.next(false);
    this.currentIndex = 0;
    this.currentRepeat = 1;
  }

  private playNext() {
    this.currentIndex++;
    
    // If we've reached the end of the queue
    if (this.currentIndex >= this.queue.length) {
      // If we haven't reached the repeat count, start over
      if (this.currentRepeat < this.repeatCount) {
        this.currentRepeat++;
        this.currentIndex = 0;
      } else {
        // We're done with all repeats
        this.stop();
        return;
      }
    }

    // Play the next file
    if (this.currentIndex < this.queue.length) {
      // Add delay before playing next audio
      this.playbackTimeout = setTimeout(() => {
        this.audio.src = this.queue[this.currentIndex];
        this.audio.play().then(() => {
          this.isPlaying.next(true);
        }).catch(error => {
          console.error('Error playing audio:', error);
          this.isPlaying.next(false);
        });
      }, this.delay);
    }
  }

  get isPlayingState() {
    return this.isPlaying.asObservable();
  }
}
