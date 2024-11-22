import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LanguageService, Language } from '../../services/language.service';

@Component({
  selector: 'app-language-selection',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="languages">
      <div class="grid">
        <div
          *ngFor="let language of languages"
          class="card language-card"
          [routerLink]="['/learn', language.code, 'words']"
        >
          <img
            [src]="language.flagImage"
            [alt]="language.name + ' flag'"
            class="flag-image"
          />
          <h2>{{ language.name }}</h2>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .languages {
        padding: 2rem 1rem; /* Added horizontal padding */
      }
      .grid {
        max-width: 1200px; /* Optional: limit maximum width */
        margin: 0 auto; /* Center the grid */
      }
      h1 {
        text-align: center;
        margin-bottom: 2rem;
        color: var(--primary-color);
      }
      .language-card {
        text-align: center;
        cursor: pointer;
        transition: transform 0.2s;
      }
      .language-card:hover {
        transform: translateY(-4px);
      }
      .flag {
        font-size: 3rem;
      }
      h2 {
        margin: 1rem 0 0;
        color: var(--text-color);
      }
      .flag-image {
        width: 64px;
        height: 48px;
        border-radius: 4px;
      }
    `,
  ],
})
export class LanguageSelectionComponent {
  languages: Language[];

  constructor(private languageService: LanguageService) {
    this.languages = this.languageService.getLanguages();
  }
}
