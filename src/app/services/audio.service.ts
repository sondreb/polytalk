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

  constructor() {
    this.audio.onended = () => this.playNext();
  }

  setQueue(audioFiles: string[], repeat: number = 1) {
    this.queue = audioFiles;
    this.repeatCount = repeat;
    this.currentRepeat = 1;
    this.currentIndex = 0;
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
      this.audio.src = this.queue[this.currentIndex];
      this.audio.play().then(() => {
        this.isPlaying.next(true);
      }).catch(error => {
        console.error('Error playing audio:', error);
        this.isPlaying.next(false);
      });
    }
  }

  get isPlayingState() {
    return this.isPlaying.asObservable();
  }
}
