import { Component, OnInit } from '@angular/core';
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
          [routerLink]="['/learn', fromLanguageCode, language.code, 'words']"
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
        padding: 2rem 1rem;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 1rem;
        max-width: 1200px;
        margin: 0 auto;
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
        padding: 1rem;
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
        font-size: 1.2rem;
      }
      .flag-image {
        width: 64px;
        height: 48px;
        border-radius: 4px;
      }

      @media (max-width: 768px) {
        .grid {
          grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        }
        h2 {
          font-size: 1rem;
        }
      }

      @media (max-width: 480px) {
        h2 {
          font-size: 0.9rem;
        }
        .flag-image {
          width: 48px;
          height: 36px;
        }
      }
    `,
  ],
})
export class LanguageSelectionComponent implements OnInit {
  languages: Language[];
  fromLanguageCode: string = 'en';
  private readonly FROM_LANGUAGE_KEY = 'polytalk-from-language';

  constructor(private languageService: LanguageService) {
    this.languages = this.languageService.getLanguages();
  }

  ngOnInit() {
    // Load saved from language, default to 'en' if not found
    const savedFromLanguage = localStorage.getItem(this.FROM_LANGUAGE_KEY);
    if (savedFromLanguage) {
      this.fromLanguageCode = savedFromLanguage;
    }
  }
}
