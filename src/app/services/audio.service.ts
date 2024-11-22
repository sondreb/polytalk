import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private audio = new Audio();
  private silentAudio: AudioContext;
  private queue: string[] = [];
  private isPlaying = new BehaviorSubject<boolean>(false);
  private repeatCount = 1;
  private currentRepeat = 1;
  private currentIndex = 0;
  private delay = 250; // Default delay in milliseconds
  private playbackTimeout: any;
  private currentFile = new BehaviorSubject<string>('');

  constructor() {
    // Initialize Web Audio API context
    this.silentAudio = new AudioContext();
    
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

  private async getAudioBlob(url: string): Promise<Blob> {
    try {
      // Try to fetch from cache first
      const cache = await caches.open('audio-cache');
      let response = await cache.match(url);

      if (!response) {
        // If not in cache, fetch from network
        response = await fetch(url);
        
        // Clone the response before consuming it
        const responseToCache = response.clone();
        
        // Store in cache for future use
        await cache.put(url, responseToCache);
      }

      return await response.blob();
    } catch (error) {
      console.error('Error fetching audio:', error);
      throw error;
    }
  }

  async play(url?: string) {
    // Resume audio context if it was suspended
    this.silentAudio.resume();

    if (url) {
      try {
        // Sanitize single file url
        const dirPath = url.substring(0, url.lastIndexOf('/') + 1);
        const filename = url.substring(url.lastIndexOf('/') + 1);
        const sanitizedUrl = dirPath + this.sanitizeKey(filename);
        
        // Get audio blob
        const blob = await this.getAudioBlob(sanitizedUrl);
        this.audio.src = URL.createObjectURL(blob);
        this.currentFile.next(sanitizedUrl);
        
        await this.audio.play();
        this.isPlaying.next(true);
      } catch (error) {
        console.error('Error playing audio:', error);
        this.isPlaying.next(false);
      }
    } else if (this.queue.length > 0) {
      try {
        // Get audio blob for first item in queue
        const blob = await this.getAudioBlob(this.queue[0]);
        this.audio.src = URL.createObjectURL(blob);
        this.currentFile.next(this.queue[0]);
        
        await this.audio.play();
        this.isPlaying.next(true);
      } catch (error) {
        console.error('Error playing audio:', error);
        this.isPlaying.next(false);
      }
    }
  }

  async playSingleFile(audioFile: string) {
    try {
      const blob = await this.getAudioBlob(audioFile);
      const audio = new Audio(URL.createObjectURL(blob));
      this.currentFile.next(audioFile);
      
      await audio.play();
      
      // Clear current file after playback
      audio.onended = () => this.currentFile.next('');
    } catch (error) {
      console.error('Error playing audio:', error);
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
    this.currentFile.next(''); // Clear current file
    // Suspend audio context when stopping
    this.silentAudio.suspend();
  }

  private async playNext() {
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
      this.playbackTimeout = setTimeout(async () => {
        try {
          const blob = await this.getAudioBlob(this.queue[this.currentIndex]);
          this.audio.src = URL.createObjectURL(blob);
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
}
