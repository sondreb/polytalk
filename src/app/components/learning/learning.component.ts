import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
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

      <div class="tabs">
        <button *ngFor="let tab of tabs" 
                [class.active]="category === tab.toLowerCase()"
                (click)="selectCategory(tab.toLowerCase())">
          {{ tab }}
        </button>
      </div>

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
             [class.active]="item === currentItem">
          <div class="native">
            <button class="play-button" (click)="playItem(item, 'en')">▶</button>
            <span>{{ item.native }}</span>
          </div>
          <div class="translation">
            <span>{{ item.translation }}</span>
            <button class="play-button" (click)="playItem(item, 'native')">▶</button>
          </div>
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
    .tabs {
      display: flex;
      justify-content: center;
      gap: 0.5rem;
      margin-bottom: 2rem;
      padding: 0.5rem;
      background: var(--background-color);
      border-radius: 12px;
    }
    .tabs button {
      padding: 0.75rem 1.5rem;
      border: 1px solid transparent;
      background: transparent;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1rem;
      transition: all 0.2s ease;
      color: var(--text-color);
      font-weight: 500;
      min-width: 100px;
    }
    .tabs button.active {
      background: white;
      color: var(--primary-color);
      border-color: var(--primary-color);
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .tabs button:hover:not(.active) {
      background: rgba(255,255,255,0.5);
      border-color: var(--background-color-darker);
    }
    .native, .translation {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    @media (max-width: 768px) {
      .learning {
        padding: 1rem 0;
      }
      .controls {
        flex-direction: column;
        gap: 1rem;
      }
      .settings {
        flex-direction: column;
        gap: 0.5rem;
      }
      .tabs button {
        padding: 0.5rem 1rem;
        min-width: 80px;
      }
      .item {
        padding: 0.75rem;
      }
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
  tabs = ['Words', 'Numbers', 'Sentences'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
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
      `/assets/audio/${this.languageCode}/${this.category}/${item.native}.mp3`
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

  playItem(item: {native: string, translation: string}, language: 'en' | 'native') {
    const fileName = language === 'en' ? item.native : item.native;
    const langCode = language === 'en' ? 'en' : this.languageCode;
    const audioFile = `/assets/audio/${langCode}/${this.category}/${fileName}.mp3`;
    this.audioService.play(audioFile);
  }

  selectCategory(category: string) {
    this.router.navigate(['/learn', this.languageCode, category]);
  }
}
