import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  Language,
  LanguageService,
  LearningContent,
} from '../../services/language.service';
import { AudioService } from '../../services/audio.service';
import { Observable, BehaviorSubject } from 'rxjs';

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

      <div class="controls-wrapper">
        <div class="controls card" [class.sticky]="isControlsSticky">
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
            <button (click)="stopPlayback()" [disabled]="!isPlaying">
              Stop
            </button>
          </div>
        </div>
        <div
          class="controls-placeholder"
          [class.visible]="isControlsSticky"
        ></div>
      </div>

      <div class="content card">
        <div
          *ngFor="let item of currentItems"
          class="item"
          [class.active]="item === currentItem"
          [class.playing]="item === currentlyPlayingItem"
          [id]="'item-' + item.native"
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

      <div class="offline-controls">
        <button 
          (click)="downloadAllAudio()" 
          [disabled]="isDownloading"
          class="download-button"
        >
          <span *ngIf="!isDownloading">Enable offline</span>
          <span *ngIf="isDownloading">
            Downloading... {{ downloadProgress | async }}%
          </span>
        </button>
      </div>
    </section>
  `,
  styles: [
    `
      .learning {
        padding: 1rem 0;
      }
      .controls {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
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
        scroll-margin-top: 200px;
      }
      .item:hover {
        background: rgba(99, 102, 241, 0.05);
      }
      .item.active {
        background: var(--background-color);
        border-radius: 8px;
      }
      .item.playing {
        background: linear-gradient(
          135deg,
          var(--gradient-start),
          var(--gradient-end)
        );
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
        gap: 1.5rem;
        margin-bottom: 1rem;
        padding: 0.75rem;
        background: rgba(99, 102, 241, 0.05);
        border-radius: 12px;
      }

      .settings label {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-weight: 500;
        color: var(--text-color);
      }

      .settings input[type='number'] {
        width: 70px;
        padding: 0.5rem;
        border: 2px solid rgba(99, 102, 241, 0.2);
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 500;
        color: var(--text-color);
        background: var(--surface-color);
        transition: all 0.2s ease;
        text-align: center;
        -moz-appearance: textfield; /* Firefox */
      }

      .settings input[type='number']::-webkit-outer-spin-button,
      .settings input[type='number']::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      .settings input[type='number']:focus {
        outline: none;
        border-color: var(--primary-color);
        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
      }

      .checkbox-label {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        cursor: pointer;
      }

      .checkbox-label input[type='checkbox'] {
        appearance: none;
        -webkit-appearance: none;
        width: 1.5rem;
        height: 1.5rem;
        border: 2px solid rgba(99, 102, 241, 0.2);
        border-radius: 6px;
        background: var(--surface-color);
        cursor: pointer;
        position: relative;
        transition: all 0.2s ease;
      }

      .checkbox-label input[type='checkbox']:checked {
        background: linear-gradient(
          135deg,
          var(--gradient-start),
          var(--gradient-end)
        );
        border-color: transparent;
      }

      .checkbox-label input[type='checkbox']:checked::after {
        content: '✓';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 1rem;
        font-weight: bold;
      }

      .checkbox-label input[type='checkbox']:focus {
        outline: none;
        border-color: var(--primary-color);
        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
      }

      @media (max-width: 768px) {
        .learning {
          padding: 0.5rem 0;
        }
        .controls {
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 0.75rem;
        }
        .settings {
          flex-direction: column;
          gap: 1rem;
          padding: 0.75rem;
        }

        .settings label {
          width: 100%;
          justify-content: space-between;
        }

        .checkbox-label {
          width: 100%;
        }
        .tabs button {
          padding: 0.5rem 1rem;
          min-width: 80px;
        }
        .item {
          padding: 0.75rem 0.5rem;
        }
        .content.card {
          padding: 0.25rem;
        }
        .controls.card {
          padding: 0.5rem;
          margin: 0 0.25rem;
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
        opacity: 0.9;
        cursor: not-allowed;
        background: #94a3b8; /* Slate 400 - lighter gray with better contrast */
        color: #f1f5f9; /* Slate 100 - very light color for text */
        border: none;
        box-shadow: none;
        transform: none;
      }

      .buttons button:disabled:hover {
        transform: none;
        background: #94a3b8; /* Keep the same color on hover */
      }

      .buttons button:not(:disabled):hover {
        background-color: var(--primary-color);
        color: white;
      }
      .language-header {
        text-align: center;
        margin-bottom: 2rem;
        font-size: 1.5rem;
        color: var(--primary-color);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
      }
      .flag-image {
        width: 48px;
        height: 36px;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      .tabs {
        display: flex;
        justify-content: center;
        gap: 0.5rem;
        margin-bottom: 1rem;
        padding: 0.75rem;
        background: transparent;
        border-radius: 12px;
        box-shadow: none;
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
        background: linear-gradient(
          135deg,
          var(--gradient-start),
          var(--gradient-end)
        );
        color: white;
        font-weight: 600;
      }
      .tabs button:hover:not(.active) {
        background: var(--background-color);
      }
      .native,
      .translation {
        display: flex;
        align-items: center;
        gap: 1rem; /* Increased from 0.5rem to 1rem for more spacing */
      }

      .play-button {
        width: 40px;
        height: 40px;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: linear-gradient(
          135deg,
          var(--gradient-start),
          var(--gradient-end)
        );
        flex-shrink: 0; /* Prevent button from shrinking */
      }
      .controls.card {
        padding: 0.75rem;
        margin: 0 0.5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        transition: all 0.3s ease;
        background: var(--surface-color);
      }
      .controls.card.sticky {
        position: fixed;
        top: 64px; /* Adjust based on navbar height */
        left: 0;
        right: 0;
        margin: 0;
        border-radius: 0;
        background: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(10px);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        z-index: 99;
      }
      .controls-wrapper {
        position: relative;
      }

      .controls-placeholder {
        height: 0;
      }

      .controls-placeholder.visible {
        height: 85px; /* Adjust this value to match your controls height */
      }

      @media (max-width: 768px) {
        .controls-placeholder.visible {
          height: 200px; /* Adjust for mobile layout where controls stack */
        }
      }

      @media (max-width: 768px) {
        .controls.card.sticky {
          top: 56px; /* Adjust for smaller navbar */
        }
        .controls.card {
          flex-direction: column;
          padding: 0.5rem;
          gap: 0.75rem;
        }

        .settings {
          flex-direction: column;
          gap: 0.75rem;
          width: 100%;
        }

        .settings label {
          width: 100%;
          justify-content: space-between;
        }
      }
      .settings {
        display: flex;
        gap: 1.5rem;
        padding: 0;
        margin: 0;
        background: transparent;
        border-radius: 12px;
        align-items: center;
      }

      .settings label {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin: 0;
        font-weight: 500;
        color: var(--text-color);
      }

      .offline-controls {
        margin: 2rem 0.5rem;
        text-align: center;
      }
      
      .download-button {
        padding: 0.75rem 1.5rem;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
        min-width: 200px;
        background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
        color: white;
        border: none;
      }
      
      .download-button:disabled {
        opacity: 0.7;
        cursor: wait;
      }
      
      @media (max-width: 768px) {
        .offline-controls {
          margin: 1rem 0.25rem;
        }
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
  wordRepeat = 1;
  loopRepeat = 2;
  isPlaying = false;
  playBothLanguages = true; // New property
  currentlyPlayingItem?: { native: string; translation: string };
  private playbackTimeout: any;
  private readonly SETTINGS_KEY = 'polytalk-settings';
  selectedLanguage?: Language;
  tabs = ['Words', 'Numbers', 'Sentences'];
  isControlsSticky = false;
  private readonly CONTROLS_SCROLL_THRESHOLD = 166; // Reduced from 200 for earlier activation
  isDownloading = false;
  downloadProgress = new BehaviorSubject<number>(0);

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const scrollPosition =
      window.pageYOffset || document.documentElement.scrollTop;
    this.isControlsSticky = scrollPosition > this.CONTROLS_SCROLL_THRESHOLD;
  }

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
    this.audioService.currentFileState.subscribe((file) => {
      if (!file) {
        this.currentlyPlayingItem = undefined;
        return;
      }

      // Extract the word from the file path and sanitize it
      const fileName = file.split('/').pop()?.replace('.mp3', '');
      if (fileName) {
        this.currentlyPlayingItem = this.currentItems.find(
          (item) => this.sanitizeKey(item.native) === this.sanitizeKey(fileName)
        );

        // Scroll to the currently playing item
        if (this.currentlyPlayingItem) {
          const element = document.getElementById(
            `item-${this.currentlyPlayingItem.native}`
          );
          if (element) {
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            });
          }
        }
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
      const sanitizedFileName = this.sanitizeKey(item.native);
      for (let i = 0; i < this.wordRepeat; i++) {
        if (this.playBothLanguages) {
          audioFiles.push(
            `/assets/audio/en/${this.category}/${sanitizedFileName}.mp3`
          );
          audioFiles.push(
            `/assets/audio/${this.languageCode}/${this.category}/${sanitizedFileName}.mp3`
          );
        } else {
          audioFiles.push(
            `/assets/audio/${this.languageCode}/${this.category}/${sanitizedFileName}.mp3`
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

  playItem(
    item: { native: string; translation: string },
    language: 'en' | 'native'
  ) {
    const sanitizedFileName = this.sanitizeKey(item.native);
    const langCode = language === 'en' ? 'en' : this.languageCode;
    const audioFile = `/assets/audio/${langCode}/${this.category}/${sanitizedFileName}.mp3`;
    this.audioService.playSingleFile(audioFile);
  }

  selectCategory(category: string) {
    this.router.navigate(['/learn', this.languageCode, category]);
  }

  sanitizeKey(key: string) {
    // Remove question marks and other invalid filename characters
    return key.replace(/[?<>:"/\\|*]/g, '').trim();
  }

  // sanitizeText(text: string): string {
  //   return text
  //     .toLowerCase()
  //     .replace(/[^a-z0-9\s]/g, '') // Remove special characters but keep spaces (\s)
  //     .trim();
  // }

  async downloadAllAudio() {
    if (this.isDownloading) return;
    
    this.isDownloading = true;
    this.downloadProgress.next(0);
    
    try {
      // Generate all possible audio file URLs
      const audioFiles: string[] = [];
      
      this.currentItems.forEach(item => {
        const sanitizedFileName = this.sanitizeKey(item.native);
        // Add both English and target language versions
        audioFiles.push(`/assets/audio/en/${this.category}/${sanitizedFileName}.mp3`);
        audioFiles.push(`/assets/audio/${this.languageCode}/${this.category}/${sanitizedFileName}.mp3`);
      });
      
      // Open cache
      const cache = await caches.open('audio-cache');
      
      // Download and cache each file
      let completed = 0;
      
      for (const file of audioFiles) {
        try {
          // Check if already cached
          const cached = await cache.match(file);
          if (!cached) {
            const response = await fetch(file);
            await cache.put(file, response);
          }
          
          completed++;
          this.downloadProgress.next(Math.round((completed / audioFiles.length) * 100));
        } catch (error) {
          console.error(`Error caching file ${file}:`, error);
        }
      }
      
    } catch (error) {
      console.error('Error downloading audio files:', error);
    } finally {
      this.isDownloading = false;
      // Reset progress after a short delay
      setTimeout(() => this.downloadProgress.next(0), 2000);
    }
  }
}
