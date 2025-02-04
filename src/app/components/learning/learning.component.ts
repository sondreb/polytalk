import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
  effect,
} from '@angular/core';
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
                    <span class="label-text">Word Repeat:</span>
                    <span class="label-icon">🔁</span>
                    <input
                      type="number"
                      [(ngModel)]="wordRepeat"
                      (ngModelChange)="saveSettings()"
                      min="1"
                      max="10"
                    />
                  </label>
                  <label>
                    <span class="label-text">Loops:</span>
                    <span class="label-icon">↺</span>
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
                    <span class="checkbox-text">Bilingual</span>
                  </label>
                </div>

                <div class="buttons">
                  <button (click)="startPlayback()">
                    <span class="icon">{{ playButtonIcon }}</span>
                    <span class="button-text">{{ playButtonText }}</span>
                  </button>
                  <button (click)="stopPlayback()" [disabled]="!isPlaying">
                    <span class="icon">■</span>
                    <span class="button-text">Stop</span>
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
        padding: 0.5rem; /* Reduced from 0.75rem */
        margin: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 0.5rem; /* Reduced from 1rem */
        transition: all 0.3s ease;
        background: var(--surface-color);
        width: 100%;
        box-sizing: border-box;
        height: 64px; /* Reduced from 72px */
      }

      .settings {
        display: flex;
        gap: 0.75rem; /* Reduced from 1rem */
        align-items: center;
        background: transparent;
        border-radius: 12px;
      }

      .label-icon {
        display: none;
        font-size: 1.2rem;
      }

      .settings label {
        display: flex;
        align-items: center;
        gap: 0.5rem; /* Reduced from 0.75rem */
        margin: 0;
        font-weight: 500;
        color: var(--text-color);
      }

      @media (max-width: 768px) {
        .settings {
          gap: 0.5rem; /* Reduce gap on mobile */
        }

        .settings label {
          gap: 0.25rem; /* Reduce gap between label elements */
        }

        .buttons button {
          padding: 0.75rem;
          min-width: unset;
        }

        .button-text {
          display: none; /* Hide button text on mobile */
        }

        .checkbox-text {
          display: none; /* Hide checkbox text on mobile */
        }
      }

      /* Remove/update these media queries that were changing the layout */
      @media (max-width: 768px) {
        .controls.card {
          flex-direction: row;
          gap: 0.5rem;
        }

        .settings {
          flex-direction: row;
          width: auto;
        }
      }

      .controls-wrapper {
        position: relative;
        height: 72px;
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
        height: 72px;
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
        scroll-margin-bottom: 150px;
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
        width: 45px; /* Increased from 20px */
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
        min-width: 120px; /* Consistent min-width for both buttons */
        width: 120px; /* Fixed width for both buttons */
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
      }

      @media (max-width: 768px) {
        .buttons button {
          width: 48px; /* Fixed width for mobile */
          min-width: 48px;
          padding: 0.75rem;
        }
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
        .settings {
          flex-direction: row;
          gap: 0.75rem;
          width: 100%;
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
        padding: 2em 0 1em 0;
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

      /* Override card hover effect for controls - updated to explicitly handle inner elements */
      .controls.card:hover,
      .content.card:hover {
        /* Added content.card here */
        transform: none;
        box-shadow: none;
      }

      /* Keep hover effect only for play buttons and other interactive elements */
      .buttons button:not(:disabled):hover {
        transform: translateY(-2px);
      }

      .play-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
      }

      .icon {
        font-size: 1.2rem;
        line-height: 1;
      }

      @media (max-width: 1024px) {
        .button-text {
          display: none;
        }

        .buttons button {
          min-width: unset;
          padding: 0.75rem;
        }

        .checkbox-label .checkbox-text {
          display: none;
        }

        .checkbox-label::after {
          content: 'Bilingual';
        }
      }

      @media (max-width: 768px) {
        .label-text {
          display: none;
        }

        .label-icon {
          display: inline-block;
        }
      }

      @media (max-width: 600px) {
        .label-icon {
          display: none;
        }

        .checkbox-label::after {
          content: '';
        }
      }

      @media (max-width: 768px) {
        .controls.card {
          padding: 0.25rem; /* Reduced from 0.5rem */
          gap: 0.25rem; /* Reduced from 0.5rem */
        }

        .settings {
          gap: 0.25rem; /* Reduced from 0.75rem */
        }

        .settings label {
          gap: 0.25rem; /* Reduced from 0.5rem */
        }

        .settings input[type='number'] {
          padding: 0.25rem;
          width: 35px; /* Increased from 16px for mobile */
        }

        .checkbox-label {
          gap: 0.25rem; /* Reduced from 0.75rem */
        }

        .buttons {
          gap: 0.5rem; /* Reduced from 1rem */
        }

        .buttons button {
          padding: 0.5rem; /* Reduced from 0.75rem */
          width: 40px; /* Reduced from 48px */
          min-width: 40px; /* Reduced from 48px */
        }

        .checkbox-label input[type='checkbox'] {
          width: 1.25rem; /* Reduced from 1.5rem */
          height: 1.25rem; /* Reduced from 1.5rem */
        }
      }

      @media (max-width: 768px) {
        .learning {
          padding: 0;
        }

        .content-wrapper {
          padding: 0;
        }

        .content.card {
          margin: 0;
          padding: 0;
        }

        .item {
          padding: 0.5rem;
        }

        .native,
        .translation {
          gap: 0.5rem; /* Reduce spacing between play button and text */
        }

        /* Reduce margins around other elements */
        .language-header {
          margin-bottom: 0.5rem;
          padding: 0.5rem;
        }

        .tabs {
          margin-bottom: 0.5rem;
          padding: 0.25rem;
        }

        .offline-controls {
          margin: 0.5rem 0;
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
  private readonly TO_LANGUAGE_KEY = 'polytalk-to-language';
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
  private canResume = false;

  // Add getters for button text and icon
  get playButtonText(): string {
    if (this.isPlaying) return 'Pause';
    return this.canResume ? 'Resume' : 'Start';
  }

  get playButtonIcon(): string {
    if (this.isPlaying) return '⏸';
    return this.canResume ? '▶' : '▶';
  }

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

    effect(() => {
      this.isPlaying = this.audioService.isPlaying();
    });

    effect(() => {
      const file = this.audioService.currentFile();
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

  ngOnInit() {
    this.availableLanguages = this.languageService.getLanguages();

    this.route.params.subscribe((params) => {
      // Scroll to top when route params change
      window.scrollTo(0, 0);

      this.fromLanguageCode = params['fromLanguage'];

      this.fromLanguageCode = params['fromLanguage'];
      this.toLanguageCode = params['toLanguage'];
      this.category = params['category'];

      this.updateLanguages();
      this.loadItems();
    });
  }

  ngOnDestroy() {
    this.stopPlayback();
    // Ensure proper cleanup of audio service
    // No cleanup method available on audioService
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
    // Stop any current playback and reset resume state
    if (this.isPlaying) {
      this.stopPlayback();
    }
    this.canResume = false;

    const settings = {
      wordRepeat: this.wordRepeat,
      loopRepeat: this.loopRepeat,
      playBothLanguages: this.playBothLanguages,
    };
    localStorage.setItem(this.SETTINGS_KEY, JSON.stringify(settings));
  }

  async startPlayback() {
    // If playing, pause playback
    if (this.isPlaying) {
      this.pausePlayback();
      return;
    }

    // Reset queue if settings have changed
    if (this.settingsChanged()) {
      this.canResume = false;
    }

    // Only prepare new queue if not resuming from pause
    if (!this.canResume) {
      let audioFiles: string[] = [];
      // ...existing queue preparation code...
      if (this.isOffline) {
        // Check all audio files first
        const unavailableFiles: string[] = [];

        for (const item of this.currentItems) {
          const sanitizedFileName = this.sanitizeKey(item.key);
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
            return;
          }
        }

        this.audioService.setQueue(audioFiles, this.loopRepeat);
      } else {
        this.currentlyPlayingItem = undefined;

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

        this.audioService.setQueue(audioFiles, this.loopRepeat);
      }

      // Start caching audio files in the background
      this.audioService.cacheAudioFiles(audioFiles);
    }

    this.audioService.play();
    this.canResume = false;
  }

  pausePlayback() {
    this.audioService.stop(true); // Pass true to indicate pause
    this.canResume = true;
  }

  stopPlayback() {
    this.currentlyPlayingItem = undefined;
    this.canResume = false; // Reset canResume since we're doing a full stop
    this.audioService.stop(false); // Pass false to indicate full stop

    if (this.playbackTimeout) {
      clearTimeout(this.playbackTimeout);
      this.playbackTimeout = null;
    }
  }

  // Add method to force restart playback
  restartPlayback() {
    this.canResume = false;
    this.stopPlayback();
    this.startPlayback();
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
    this.canResume = false;
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

      // Get content for both languages
      const fromContent = this.languageService.getContent(
        this.fromLanguageCode
      );
      const toContent = this.languageService.getContent(this.toLanguageCode);

      // Build list of all audio files across all categories
      allCategories.forEach((category) => {
        const fromItems = fromContent
          ? fromContent[category as keyof LearningContent]
          : {};
        const toItems = toContent
          ? toContent[category as keyof LearningContent]
          : {};

        // Use the keys from both languages
        const allKeys = new Set([
          ...Object.keys(fromItems),
          ...Object.keys(toItems),
        ]);

        allKeys.forEach((key) => {
          const sanitizedFileName = this.sanitizeKey(key);
          // Add both language versions
          audioFiles.push(
            `/assets/audio/${this.fromLanguageCode}/${category}/${sanitizedFileName}.mp3`
          );
          audioFiles.push(
            `/assets/audio/${this.toLanguageCode}/${category}/${sanitizedFileName}.mp3`
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
            if (response.ok) {
              // Only cache successful responses
              await cache.put(file, response);
            }
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

    localStorage.setItem(this.FROM_LANGUAGE_KEY, this.fromLanguageCode);
    localStorage.setItem(this.TO_LANGUAGE_KEY, this.toLanguageCode);
  }

  onLanguageChange(type: 'from' | 'to', value: string) {
    this.canResume = false;
    if (type === 'from') {
      this.fromLanguageCode = value;
      // Save from language preference
      localStorage.setItem(this.FROM_LANGUAGE_KEY, value);
    } else {
      this.toLanguageCode = value;
      localStorage.setItem(this.TO_LANGUAGE_KEY, value);
    }
    this.updateLanguages();
    this.router.navigate([
      '/learn',
      this.fromLanguageCode,
      this.toLanguageCode,
      this.category,
    ]);
  }

  // Add a method to track settings changes
  private lastSettings = {
    wordRepeat: 1,
    loopRepeat: 2,
    playBothLanguages: true,
  };

  private settingsChanged(): boolean {
    const changed =
      this.wordRepeat !== this.lastSettings.wordRepeat ||
      this.loopRepeat !== this.lastSettings.loopRepeat ||
      this.playBothLanguages !== this.lastSettings.playBothLanguages;

    // Update last settings
    this.lastSettings = {
      wordRepeat: this.wordRepeat,
      loopRepeat: this.loopRepeat,
      playBothLanguages: this.playBothLanguages,
    };

    return changed;
  }

  // Add a method to handle stop button click with additional safety
  @HostListener('document:visibilitychange')
  onVisibilityChange() {
    if (document.hidden && this.isPlaying) {
      this.stopPlayback();
    }
  }
}
