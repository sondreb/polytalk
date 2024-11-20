import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { LanguageService, LearningContent } from '../../services/language.service';

@Component({
  selector: 'app-learning',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="learning">
      <div class="controls">
        <h2>{{ category | titlecase }} in {{ languageCode | uppercase }}</h2>
        <div class="buttons">
          <button (click)="playNext()">Play Next</button>
          <button (click)="toggleLoop()">
            {{ isLooping ? 'Stop Loop' : 'Start Loop' }}
          </button>
        </div>
      </div>

      <div class="content card">
        <div *ngFor="let item of currentItems" class="item"
             [class.active]="item === currentItem">
          <span class="native">{{ item.native }}</span>
          <span class="translation">{{ item.translation }}</span>
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
  `]
})
export class LearningComponent implements OnInit {
  languageCode: string = '';
  category: string = '';
  content?: LearningContent;
  currentItems: {native: string, translation: string}[] = [];
  currentItem?: {native: string, translation: string};
  isLooping: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.languageCode = params['language'];
      this.category = params['category'];
      this.content = this.languageService.getContent(this.languageCode);
      this.loadItems();
    });
  }

  loadItems() {
    if (!this.content) return;
    
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
}
