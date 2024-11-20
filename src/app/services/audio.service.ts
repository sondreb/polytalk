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
  private currentIndex = 0;

  constructor() {
    this.audio.onended = () => this.playNext();
  }

  setQueue(audioFiles: string[], repeat: number = 1) {
    this.queue = audioFiles;
    this.repeatCount = repeat;
    this.currentIndex = 0;
  }

  play(url?: string) {
    if (url) {
      this.audio.src = url;
    }
    this.audio.play();
    this.isPlaying.next(true);
  }

  stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.isPlaying.next(false);
  }

  private playNext() {
    if (this.currentIndex < this.queue.length - 1) {
      this.currentIndex++;
      this.play(this.queue[this.currentIndex]);
    } else if (this.repeatCount > 1) {
      this.repeatCount--;
      this.currentIndex = 0;
      this.play(this.queue[this.currentIndex]);
    } else {
      this.stop();
    }
  }

  get isPlayingState() {
    return this.isPlaying.asObservable();
  }
}
