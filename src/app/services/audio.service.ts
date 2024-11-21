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
  private currentFile = new BehaviorSubject<string>('');

  constructor() {
    this.audio.onended = () => this.playNext();
  }

  private sanitizeKey(key: string): string {
    return key.replace(/[?<>:"/\\|*]/g, '').trim();
  }

  setQueue(audioFiles: string[], repeat: number = 1) {
    // Sanitize all filenames in the queue
    this.queue = audioFiles.map(file => {
      const dirPath = file.substring(0, file.lastIndexOf('/') + 1);
      const filename = file.substring(file.lastIndexOf('/') + 1);
      const sanitizedFilename = this.sanitizeKey(filename);
      return dirPath + sanitizedFilename;
    });
    this.repeatCount = repeat;
    this.currentRepeat = 1;
    this.currentIndex = 0;
  }

  setDelay(seconds: number) {
    this.delay = Math.max(0.25, seconds) * 1000; // Convert to milliseconds, minimum 250ms
  }

  play(url?: string) {
    if (url) {
      // Sanitize single file url
      const dirPath = url.substring(0, url.lastIndexOf('/') + 1);
      const filename = url.substring(url.lastIndexOf('/') + 1);
      const sanitizedUrl = dirPath + this.sanitizeKey(filename);
      this.audio.src = sanitizedUrl;
      this.currentFile.next(sanitizedUrl); // Emit current file
      this.audio.play().then(() => {
        this.isPlaying.next(true);
      }).catch(error => {
        console.error('Error playing audio:', error);
        this.isPlaying.next(false);
      });
    } else if (this.queue.length > 0) {
      // Queue already contains sanitized urls
      this.audio.src = this.queue[0];
      this.currentFile.next(this.queue[0]); // Emit current file
      this.audio.play().then(() => {
        this.isPlaying.next(true);
      }).catch(error => {
        console.error('Error playing audio:', error);
        this.isPlaying.next(false);
      });
    }
  }

  playSingleFile(audioFile: string) {
    const audio = new Audio(audioFile);
    this.currentFile.next(audioFile); // Emit current file
    audio.play().catch(error => console.error('Error playing audio:', error));
    // Clear current file after playback
    audio.onended = () => this.currentFile.next('');
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
    this.currentFile.next(''); // Clear current file
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
        this.currentFile.next(this.queue[this.currentIndex]); // Emit current file
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

  // Add getter for the current file observable
  get currentFileState() {
    return this.currentFile.asObservable();
  }
}
