import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  Language,
  LanguageService,
  LearningContent,
} from '../../services/language.service';
import { AudioService } from '../../services/audio.service';

@Component({
  selector: 'app-learning',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="learning">
      <h2 class="language-header">
        <img
          [src]="selectedLanguage?.flagImage"
          [alt]="selectedLanguage?.name + ' flag'"
          class="flag-image"
        />
        {{ selectedLanguage?.name }}
      </h2>

      <div class="tabs">
        <button
          *ngFor="let tab of tabs"
          [class.active]="category === tab.toLowerCase()"
          (click)="selectCategory(tab.toLowerCase())"
        >
          {{ tab }}
        </button>
      </div>

      <div class="controls card">
        <div class="settings">
          <label>
            Word Repeat:
            <input
              type="number"
              [(ngModel)]="wordRepeat"
              (ngModelChange)="saveSettings()"
              min="1"
              max="10"
            />
          </label>
          <label>
            Loops:
            <input
              type="number"
              [(ngModel)]="loopRepeat"
              (ngModelChange)="saveSettings()"
              min="1"
              max="10"
            />
          </label>
          <label class="checkbox-label">
            <input
              type="checkbox"
              [(ngModel)]="playBothLanguages"
              (ngModelChange)="saveSettings()"
            />
            Play both English and {{ selectedLanguage?.name }}
          </label>
        </div>

        <div class="buttons">
          <button (click)="startPlayback()" [disabled]="isPlaying">
            Start Playback
          </button>
          <button (click)="stopPlayback()" [disabled]="!isPlaying">Stop</button>
        </div>
      </div>

      <div class="content card">
        <div
          *ngFor="let item of currentItems"
          class="item"
          [class.active]="item === currentItem"
          [class.playing]="item === currentlyPlayingItem"
        >
          <div class="native">
            <button class="play-button" (click)="playItem(item, 'en')">
              ▶
            </button>
            <span>{{ item.native }}</span>
          </div>
          <div class="translation">
            <span>{{ item.translation }}</span>
            <button class="play-button" (click)="playItem(item, 'native')">
              ▶
            </button>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
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
        padding: 1.25rem;
        border-bottom: 1px solid rgba(99, 102, 241, 0.1);
        transition: all 0.3s ease;
      }
      .item:hover {
        background: rgba(99, 102, 241, 0.05);
      }
      .item.active {
        background: var(--background-color);
        border-radius: 8px;
      }
      .item.playing {
        background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
        color: white;
        transform: scale(1.02);
        box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
        border-radius: 8px;
      }
      .item.playing .translation {
        color: white;
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
        width: 40px;
        height: 40px;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
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
      }
      .tabs {
        display: flex;
        justify-content: center;
        gap: 0.5rem;
        margin-bottom: 2rem;
        padding: 0.75rem;
        background: rgba(99, 102, 241, 0.1);
        border-radius: 16px;
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
        background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
        color: white;
        font-weight: 600;
        border-color: var(--primary-color);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      .tabs button:hover:not(.active) {
        background: rgba(255, 255, 255, 0.5);
        border-color: var(--background-color-darker);
      }
      .native,
      .translation {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      .checkbox-label {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      .checkbox-label input[type='checkbox'] {
        width: auto;
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
      .buttons button {
        padding: 0.75rem 1.5rem;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
        min-width: 120px;
      }

      .buttons button:disabled {
        opacity: 0.7;
        cursor: not-allowed;
        background-color: #d8d8d8;
        border: 1px solid #bbb;
        color: #666;
        box-shadow: none;
        transform: none;
      }

      .buttons button:disabled:hover {
        transform: none;
        background-color: #d8d8d8;
      }

      .buttons button:not(:disabled):hover {
        background-color: var(--primary-color);
        color: white;
      }
    `,
  ],
})
export class LearningComponent implements OnInit, OnDestroy {
  languageCode: string = '';
  category: string = '';
  content?: LearningContent;
  currentItems: { native: string; translation: string }[] = [];
  currentItem?: { native: string; translation: string };
  isLooping: boolean = false;
  wordRepeat = 1; // renamed from repeatCount
  loopRepeat = 2; // renamed from interval
  isPlaying = false;
  playBothLanguages = true; // New property
  currentlyPlayingItem?: { native: string; translation: string };
  private playbackTimeout: any;
  private readonly SETTINGS_KEY = 'polytalk-settings';
  selectedLanguage?: Language;
  tabs = ['Words', 'Numbers', 'Sentences'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private languageService: LanguageService,
    private audioService: AudioService
  ) {
    this.loadSettings();
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.languageCode = params['language'];
      this.category = params['category'];
      this.content = this.languageService.getContent(this.languageCode);
      this.loadItems();
    });
    this.audioService.isPlayingState.subscribe(
      (playing) => (this.isPlaying = playing)
    );
    this.audioService.currentFileState.subscribe(file => {
      if (!file) {
        this.currentlyPlayingItem = undefined;
        return;
      }

      // Extract the word from the file path
      const fileName = file.split('/').pop()?.replace('.mp3', '');
      if (fileName) {
        this.currentlyPlayingItem = this.currentItems.find(item => 
          item.native === fileName
        );
      }
    });
  }

  ngOnDestroy() {
    this.stopPlayback();
  }

  loadItems() {
    if (!this.content) return;

    // Get language details
    this.selectedLanguage = this.languageService
      .getLanguages()
      .find((lang) => lang.code === this.languageCode);

    const items = this.content[this.category as keyof LearningContent];
    this.currentItems = Object.entries(items).map(([native, translation]) => ({
      native,
      translation,
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

  private loadSettings() {
    const settings = localStorage.getItem(this.SETTINGS_KEY);
    if (settings) {
      const parsed = JSON.parse(settings);
      this.wordRepeat = parsed.wordRepeat || 1;
      this.loopRepeat = parsed.loopRepeat || 2;
      this.playBothLanguages = parsed.playBothLanguages ?? true;
    }
  }

  saveSettings() {
    const settings = {
      wordRepeat: this.wordRepeat,
      loopRepeat: this.loopRepeat,
      playBothLanguages: this.playBothLanguages,
    };
    localStorage.setItem(this.SETTINGS_KEY, JSON.stringify(settings));
  }

  startPlayback() {
    // Reset currently playing item
    this.currentlyPlayingItem = undefined;
    let audioFiles: string[] = [];

    this.currentItems.forEach((item) => {
      for (let i = 0; i < this.wordRepeat; i++) {
        if (this.playBothLanguages) {
          audioFiles.push(
            `/assets/audio/en/${this.category}/${item.native}.mp3`
          );
          audioFiles.push(
            `/assets/audio/${this.languageCode}/${this.category}/${item.native}.mp3`
          );
        } else {
          audioFiles.push(
            `/assets/audio/${this.languageCode}/${this.category}/${item.native}.mp3`
          );
        }
      }
    });

    this.audioService.setDelay(0.25); // Fixed 250ms delay
    this.audioService.setQueue(audioFiles, this.loopRepeat);
    this.audioService.play();
  }

  stopPlayback() {
    // Reset currently playing item
    this.currentlyPlayingItem = undefined;
    this.audioService.stop();
    if (this.playbackTimeout) {
      clearTimeout(this.playbackTimeout);
    }
  }

  playItem(item: { native: string; translation: string }, language: 'en' | 'native') {
    const fileName = language === 'en' ? item.native : item.native;
    const langCode = language === 'en' ? 'en' : this.languageCode;
    const audioFile = `/assets/audio/${langCode}/${this.category}/${fileName}.mp3`;
    this.audioService.playSingleFile(audioFile);
  }

  selectCategory(category: string) {
    this.router.navigate(['/learn', this.languageCode, category]);
  }
}
