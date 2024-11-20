import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Language, LanguageService, LearningContent } from '../../services/language.service';
import { AudioService } from '../../services/audio.service';

@Component({
  selector: 'app-learning',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="learning">
      <h2 class="language-header">
        <img [src]="selectedLanguage?.flagImage" 
             [alt]="selectedLanguage?.name + ' flag'"
             class="flag-image">
        {{ selectedLanguage?.name }}
      </h2>

      <div class="controls card">
        <div class="settings">
          <label>
            Repeat Count:
            <input type="number" [(ngModel)]="repeatCount" min="1" max="10">
          </label>
          <label>
            Interval (seconds):
            <input type="number" [(ngModel)]="interval" min="1" max="10">
          </label>
        </div>
        
        <div class="buttons">
          <button (click)="startPlayback()" [disabled]="isPlaying">
            Start Playback
          </button>
          <button (click)="stopPlayback()" [disabled]="!isPlaying">
            Stop
          </button>
        </div>
      </div>

      <div class="content card">
        <div *ngFor="let item of currentItems" class="item"
             [class.active]="item === currentItem"
             (click)="playItem(item)">
          <span class="native">{{ item.native }}</span>
          <span class="translation">{{ item.translation }}</span>
          <button class="play-button">▶</button>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .learning {
      padding: 2rem 0;
    }
    .controls {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }
    .buttons {
      display: flex;
      gap: 1rem;
    }
    .item {
      display: flex;
      justify-content: space-between;
      padding: 1rem;
      border-bottom: 1px solid var(--background-color);
    }
    .item.active {
      background: var(--background-color);
      border-radius: 8px;
    }
    .translation {
      color: var(--primary-color);
      font-weight: bold;
    }
    .settings {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
    }
    .settings label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .settings input {
      width: 60px;
      padding: 0.3rem;
      border: 1px solid var(--background-color);
      border-radius: 4px;
    }
    .play-button {
      padding: 0.5rem;
      min-width: 40px;
      border-radius: 50%;
    }
    .language-header {
      text-align: center;
      margin-bottom: 2rem;
      font-size: 1.5rem;
      color: var(--primary-color);
    }
    .flag-image {
      width: 32px;
      height: 24px;
      vertical-align: middle;
      margin-right: 8px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    }
  `]
})
export class LearningComponent implements OnInit, OnDestroy {
  languageCode: string = '';
  category: string = '';
  content?: LearningContent;
  currentItems: {native: string, translation: string}[] = [];
  currentItem?: {native: string, translation: string};
  isLooping: boolean = false;
  repeatCount = 1;
  interval = 2;
  isPlaying = false;
  private playbackTimeout: any;
  selectedLanguage?: Language;

  constructor(
    private route: ActivatedRoute,
    private languageService: LanguageService,
    private audioService: AudioService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.languageCode = params['language'];
      this.category = params['category'];
      this.content = this.languageService.getContent(this.languageCode);
      this.loadItems();
    });
    this.audioService.isPlayingState.subscribe(
      playing => this.isPlaying = playing
    );
  }

  ngOnDestroy() {
    this.stopPlayback();
  }

  loadItems() {
    if (!this.content) return;
    
    // Get language details
    this.selectedLanguage = this.languageService.getLanguages()
      .find(lang => lang.code === this.languageCode);
    
    const items = this.content[this.category as keyof LearningContent];
    this.currentItems = Object.entries(items).map(([native, translation]) => ({
      native,
      translation
    }));
    
    if (this.currentItems.length > 0) {
      this.currentItem = this.currentItems[0];
    }
  }

  playNext() {
    // Implementation for audio playback
  }

  toggleLoop() {
    this.isLooping = !this.isLooping;
    // Implementation for loop playback
  }

  startPlayback() {
    const audioFiles = this.currentItems.map(item => 
      `/assets/audio/${this.languageCode}/${item.native}.mp3`
    );
    this.audioService.setQueue(audioFiles, this.repeatCount);
    this.audioService.play();
  }

  stopPlayback() {
    this.audioService.stop();
    if (this.playbackTimeout) {
      clearTimeout(this.playbackTimeout);
    }
  }

  playItem(item: {native: string, translation: string}) {
    const audioFile = `/assets/audio/${this.languageCode}/${item.native}.mp3`;
    this.audioService.play(audioFile);
  }
}
