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
import { Observable, BehaviorSubject, from } from 'rxjs';

@Component({
  selector: 'app-learning',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="learning">
      <div class="content-wrapper">
        <div class="language-header">
          <div class="language-selector">
            <img
              [src]="fromLanguage?.flagImage"
              [alt]="fromLanguage?.name + ' flag'"
              class="flag-image"
            />
            <select
              [(ngModel)]="fromLanguageCode"
              (ngModelChange)="onLanguageChange('from', $event)"
            >
              <option
                *ngFor="let lang of availableLanguages"
                [value]="lang.code"
              >
                {{ lang.name }}
              </option>
            </select>
          </div>

          <div class="language-direction">→</div>

          <div class="language-selector">
            <img
              [src]="toLanguage?.flagImage"
              [alt]="toLanguage?.name + ' flag'"
              class="flag-image"
            />
            <select
              [(ngModel)]="toLanguageCode"
              (ngModelChange)="onLanguageChange('to', $event)"
            >
              <option
                *ngFor="let lang of availableLanguages"
                [value]="lang.code"
              >
                {{ lang.name }}
              </option>
            </select>
          </div>
        </div>

        <div class="tabs">
          <button
            *ngFor="let tab of tabs"
            [class.active]="category === tab.toLowerCase()"
            (click)="selectCategory(tab.toLowerCase())"
          >
            {{ tab }}
          </button>
        </div>

        <div class="content card">
          <div
            *ngFor="let item of currentItems"
            class="item"
            [class.active]="item === currentItem"
            [class.playing]="item === currentlyPlayingItem"
            [class.offline]="
              isOffline &&
              (unavailableAudio.has(
                '/assets/audio/en/' +
                  category +
                  '/' +
                  sanitizeKey(item.native) +
                  '.mp3'
              ) ||
                unavailableAudio.has(
                  '/assets/audio/' +
                    languageCode +
                    '/' +
                    category +
                    '/' +
                    sanitizeKey(item.native) +
                    '.mp3'
                ))
            "
            [id]="'item-' + item.key"
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

        <div class="controls-wrapper">
          <div class="sticky-container">
            <div class="content-wrapper">
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
                    Play both languages
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
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .learning {
        padding: 1rem 0;
        width: 100%;
      }

      .content-wrapper {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1rem;
      }

      .controls.card {
        padding: 0.75rem;
        margin: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        transition: all 0.3s ease;
        background: var(--surface-color);
        width: 100%;
        box-sizing: border-box;
      }

      .controls.card.sticky {
        position: fixed;
        top: 64px;
        left: 50%;
        transform: translateX(-50%);
        max-width: 1200px;
        width: calc(100% - 2rem);
        margin: 0 auto;
        background: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(10px);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        z-index: 99;
        border-radius: 12px;
      }

      @media (max-width: 768px) {
        .content-wrapper {
          padding: 0 0.5rem;
        }

        .controls.card.sticky {
          width: calc(100% - 1rem);
          border-radius: 0;
        }
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
        scroll-margin-bottom: 150px; // Changed from scroll-margin-top
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
        background: linear-gradient(
          135deg,
          var(--gradient-start),
          var(--gradient-end)
        );
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
      .item.offline {
        opacity: 0.5;
        position: relative;
      }

      .item.offline::after {
        content: '⚠️ Offline';
        position: absolute;
        right: 1rem;
        top: 50%;
        transform: translateY(-50%);
        font-size: 0.8rem;
        color: #666;
      }

      .item.offline .play-button {
        opacity: 0.5;
        cursor: not-allowed;
        background: #ccc;
      }

      @media (max-width: 768px) {
        .item.offline::after {
          font-size: 0.7rem;
          right: 0.5rem;
        }
      }
      .language-header {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 2rem;
        margin-bottom: 2rem;
        padding: 1rem;
      }

      .language-selector {
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      .language-direction {
        font-size: 1.5rem;
        color: var(--primary-color);
        font-weight: bold;
      }

      select {
        padding: 0.5rem;
        border-radius: 8px;
        border: 2px solid rgba(99, 102, 241, 0.2);
        background: var(--surface-color);
        font-size: 1rem;
        color: var(--text-color);
        cursor: pointer;
        min-width: 150px;
      }

      select:focus {
        outline: none;
        border-color: var(--primary-color);
        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
      }

      @media (max-width: 768px) {
        .language-header {
          flex-direction: column;
          gap: 1rem;
        }
      }

      .controls-wrapper {
        position: relative;
        margin-bottom: 1rem;
      }

      .sticky-container {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 99;
        background: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(10px);
        box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.1);
      }

      .controls.card {
        padding: 0.75rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        background: transparent;
        width: 100%;
        box-sizing: border-box;
        margin: 0;
        border-radius: 12px 12px 0 0;
        border: none;
        box-shadow: none;
      }

      .item {
        display: flex;
        justify-content: space-between;
        padding: 1.25rem;
        border-bottom: 1px solid rgba(99, 102, 241, 0.1);
        transition: all 0.3s ease;
        scroll-margin-bottom: 150px;
      }

      @media (max-width: 768px) {
        .sticky-container.sticky {
          top: 56px;
        }

        .controls.card {
          flex-direction: column;
          padding: 0.5rem;
          gap: 0.75rem;
        }
      }
    `,
  ],
})
export class LearningComponent implements OnInit, OnDestroy {
  languageCode: string = '';
  category: string = '';
  content?: LearningContent;
  currentItems: { native: string; translation: string; key: string }[] = [];
  currentItem?: { native: string; translation: string; key: string };
  isLooping: boolean = false;
  wordRepeat = 1;
  loopRepeat = 2;
  isPlaying = false;
  playBothLanguages = true; // New property
  currentlyPlayingItem?: { native: string; translation: string; key: string };
  private playbackTimeout: any;
  private readonly SETTINGS_KEY = 'polytalk-settings';
  private readonly FROM_LANGUAGE_KEY = 'polytalk-from-language';
  selectedLanguage?: Language;
  tabs = ['Words', 'Numbers', 'Sentences'];
  isDownloading = false;
  downloadProgress = new BehaviorSubject<number>(0);
  isOffline = false;
  unavailableAudio = new Set<string>();
  fromLanguageCode: string = 'en';
  toLanguageCode: string = '';
  fromLanguage?: Language;
  toLanguage?: Language;
  availableLanguages: Language[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private languageService: LanguageService,
    private audioService: AudioService
  ) {
    this.loadSettings();
    // Add offline detection
    this.isOffline = !navigator.onLine;
    window.addEventListener('online', () => this.handleConnectionChange(true));
    window.addEventListener('offline', () =>
      this.handleConnectionChange(false)
    );
  }

  ngOnInit() {
    this.availableLanguages = this.languageService.getLanguages();

    this.route.params.subscribe((params) => {
      this.fromLanguageCode = params['fromLanguage'];
      this.toLanguageCode = params['toLanguage'];
      this.category = params['category'];

      this.updateLanguages();
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
          (item) => this.sanitizeKey(item.key) === this.sanitizeKey(fileName)
        );

        // Scroll to the currently playing item
        if (this.currentlyPlayingItem) {
          const element = document.getElementById(
            `item-${this.currentlyPlayingItem.key}`
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
    if (!this.toLanguageCode) return;

    const toContent = this.languageService.getContent(this.toLanguageCode);
    const fromContent = this.languageService.getContent(this.fromLanguageCode);

    if (!toContent || !fromContent) return;

    this.toLanguage = this.languageService
      .getLanguages()
      .find((lang) => lang.code === this.toLanguageCode);

    const toItems = toContent[this.category as keyof LearningContent];
    const fromItems = fromContent[this.category as keyof LearningContent];

    // Keep the English key as 'native' for audio file references
    this.currentItems = Object.entries(toItems).map(([key, toTranslation]) => ({
      native: fromItems[key], // Translation in 'from' language
      translation: toTranslation, // Translation in 'to' language
      key: key, // Keep the English key for audio files
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

    // Load from language from storage
    const savedFromLanguage = localStorage.getItem(this.FROM_LANGUAGE_KEY);
    if (savedFromLanguage && this.fromLanguageCode === 'en') {
      // Only override if current is default 'en'
      this.fromLanguageCode = savedFromLanguage;
      this.updateLanguages();
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

  async startPlayback() {
    if (this.isOffline) {
      // Check all audio files first
      const audioFiles: string[] = [];
      const unavailableFiles: string[] = [];

      for (const item of this.currentItems) {
        const sanitizedFileName = this.sanitizeKey(item.key); // Use English key for file name
        if (this.playBothLanguages) {
          const fromFile = `/assets/audio/${this.fromLanguageCode}/${this.category}/${sanitizedFileName}.mp3`;
          const toFile = `/assets/audio/${this.toLanguageCode}/${this.category}/${sanitizedFileName}.mp3`;

          if (!(await this.checkAudioAvailability(fromFile))) {
            unavailableFiles.push(fromFile);
          } else {
            audioFiles.push(fromFile);
          }

          if (!(await this.checkAudioAvailability(toFile))) {
            unavailableFiles.push(toFile);
          } else {
            audioFiles.push(toFile);
          }
        } else {
          const toFile = `/assets/audio/${this.toLanguageCode}/${this.category}/${sanitizedFileName}.mp3`;
          if (!(await this.checkAudioAvailability(toFile))) {
            unavailableFiles.push(toFile);
          } else {
            audioFiles.push(toFile);
          }
        }
      }

      if (unavailableFiles.length > 0) {
        unavailableFiles.forEach((file) => this.unavailableAudio.add(file));
        if (audioFiles.length === 0) {
          return; // Don't start playback if no files are available
        }
      }

      this.audioService.setDelay(0.25);
      this.audioService.setQueue(audioFiles, this.loopRepeat);
      this.audioService.play();
    } else {
      // Original playback logic for online mode
      this.currentlyPlayingItem = undefined;
      let audioFiles: string[] = [];

      this.currentItems.forEach((item) => {
        const sanitizedFileName = this.sanitizeKey(item.key);
        for (let i = 0; i < this.wordRepeat; i++) {
          if (this.playBothLanguages) {
            audioFiles.push(
              `/assets/audio/${this.fromLanguageCode}/${this.category}/${sanitizedFileName}.mp3`
            );
            audioFiles.push(
              `/assets/audio/${this.toLanguageCode}/${this.category}/${sanitizedFileName}.mp3`
            );
          } else {
            audioFiles.push(
              `/assets/audio/${this.toLanguageCode}/${this.category}/${sanitizedFileName}.mp3`
            );
          }
        }
      });

      this.audioService.setDelay(0.25); // Fixed 250ms delay
      this.audioService.setQueue(audioFiles, this.loopRepeat);
      this.audioService.play();
    }
  }

  stopPlayback() {
    // Reset currently playing item
    this.currentlyPlayingItem = undefined;
    this.audioService.stop();
    if (this.playbackTimeout) {
      clearTimeout(this.playbackTimeout);
    }
  }

  async playItem(
    item: { native: string; translation: string; key: string },
    language: 'en' | 'native'
  ) {
    const sanitizedFileName = this.sanitizeKey(item.key); // Use English key for file name
    const langCode =
      language === 'en' ? this.fromLanguageCode : this.toLanguageCode;
    const audioFile = `/assets/audio/${langCode}/${this.category}/${sanitizedFileName}.mp3`;

    if (this.isOffline) {
      const isAvailable = await this.checkAudioAvailability(audioFile);
      if (!isAvailable) {
        this.unavailableAudio.add(audioFile);
        return; // Don't attempt to play
      }
    }

    this.audioService.playSingleFile(audioFile);
  }

  selectCategory(category: string) {
    this.router.navigate([
      '/learn',
      this.fromLanguageCode,
      this.toLanguageCode,
      category,
    ]);
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
      const cache = await caches.open('audio-cache');
      const audioFiles: string[] = [];
      const allCategories = ['words', 'numbers', 'sentences'];

      // Get content for current language
      const content = this.languageService.getContent(this.languageCode);

      // Build list of all audio files across all categories
      allCategories.forEach((category) => {
        const items = content ? content[category as keyof LearningContent] : {};
        Object.keys(items).forEach((native) => {
          const sanitizedFileName = this.sanitizeKey(native);
          // Add both English and target language versions
          audioFiles.push(
            `/assets/audio/en/${category}/${sanitizedFileName}.mp3`
          );
          audioFiles.push(
            `/assets/audio/${this.languageCode}/${category}/${sanitizedFileName}.mp3`
          );
        });
      });

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
          this.downloadProgress.next(
            Math.round((completed / audioFiles.length) * 100)
          );
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

  private handleConnectionChange(isOnline: boolean) {
    this.isOffline = !isOnline;
    if (isOnline) {
      this.unavailableAudio.clear();
    }
  }

  async checkAudioAvailability(audioPath: string): Promise<boolean> {
    if (!this.isOffline) return true;

    try {
      const cache = await caches.open('audio-cache');
      const cached = await cache.match(audioPath);
      return cached !== undefined;
    } catch (error) {
      console.error('Error checking cache:', error);
      return false;
    }
  }

  updateLanguages() {
    this.fromLanguage = this.availableLanguages.find(
      (lang) => lang.code === this.fromLanguageCode
    );
    this.toLanguage = this.availableLanguages.find(
      (lang) => lang.code === this.toLanguageCode
    );
  }

  onLanguageChange(type: 'from' | 'to', value: string) {
    if (type === 'from') {
      this.fromLanguageCode = value;
      // Save from language preference
      localStorage.setItem(this.FROM_LANGUAGE_KEY, value);
    } else {
      this.toLanguageCode = value;
    }
    this.updateLanguages();
    this.router.navigate([
      '/learn',
      this.fromLanguageCode,
      this.toLanguageCode,
      this.category,
    ]);
  }
}
