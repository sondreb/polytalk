import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface AudioItem {
  text: string;
  audioUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private audio = new Audio();
  private queue: AudioItem[] = [];
  private isLooping = false;
  private repeatCount = 1;
  
  playing$ = new BehaviorSubject<boolean>(false);
  currentItem$ = new BehaviorSubject<AudioItem | null>(null);

  constructor() {
    this.audio.onended = () => this.playNext();
  }

  setQueue(items: AudioItem[], repeat: number = 1) {
    this.queue = [...items];
    this.repeatCount = repeat;
    this.currentItem$.next(this.queue[0]);
  }

  toggleLoop() {
    this.isLooping = !this.isLooping;
    return this.isLooping;
  }

  play() {
    const current = this.currentItem$.value;
    if (current) {
      this.audio.src = current.audioUrl;
      this.audio.play();
      this.playing$.next(true);
    }
  }

  pause() {
    this.audio.pause();
    this.playing$.next(false);
  }

  private playNext() {
    const currentIndex = this.queue.findIndex(item => 
      item === this.currentItem$.value);
    const nextIndex = (currentIndex + 1) % this.queue.length;
    
    if (nextIndex === 0 && !this.isLooping) {
      this.playing$.next(false);
      return;
    }

    this.currentItem$.next(this.queue[nextIndex]);
    this.play();
  }
}
