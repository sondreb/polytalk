import { Component, signal, computed, effect, DestroyRef, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LanguageService, Language } from '../../services/language.service';
import { trigger, style, animate, transition, query, stagger } from '@angular/animations';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-language-selection',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe],
  template: `
    <script type="text/javascript">
        aclib.runInterstitial({
            zoneId: '9197070',
        });
    </script>

    <section class="languages">
      @if (favoriteLanguages().length > 0) {
        <div class="favorites-section">
          <h3 class="section-title">{{ 'langSelect.favorites' | translate }}</h3>
          <div class="grid" [@listAnimation]="favoriteLanguages().length">
            @for (language of favoriteLanguages(); track language.code) {
              <div
                class="card language-card favorite-card"
                [routerLink]="['/learn', fromLanguageCode(), language.code, 'words']"
                (click)="onLanguageSelect(language.code)"
              >
                <button
                  class="remove-favorite"
                  (click)="removeFavorite($event, language.code)"
                  title="Remove from favorites"
                >
                  &times;
                </button>
                <img
                  [src]="language.flagImage"
                  [alt]="language.name + ' flag'"
                  class="flag-image"
                />
                <h2>{{ language.name }}</h2>
              </div>
            }
          </div>
        </div>
      }

      <div class="all-languages-section">
        @if (favoriteLanguages().length > 0) {
          <h3 class="section-title">{{ 'langSelect.allLanguages' | translate }}</h3>
        }
        <div class="grid" [@listAnimation]="languages().length">
          @for (language of languages(); track language.code) {
            <div
              class="card language-card"
              [routerLink]="['/learn', fromLanguageCode(), language.code, 'words']"
              (click)="onLanguageSelect(language.code)"
            >
              <img
                [src]="language.flagImage"
                [alt]="language.name + ' flag'"
                class="flag-image"
              />
              <h2>{{ language.name }}</h2>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(15px)' }),
            stagger(50, [
              animate(
                '0.3s ease-out',
                style({ opacity: 1, transform: 'translateY(0)' })
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
  styles: [
    `
      .languages {
        padding: 2rem 1rem;
        max-width: 1200px;
        margin: 0 auto;
      }
      .section-title {
        font-size: 1.1rem;
        font-weight: 600;
        color: var(--text-color);
        margin: 0 0 1rem 0;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid var(--primary-color);
        display: inline-block;
      }
      .favorites-section {
        margin-bottom: 2rem;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 1.5rem;
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
        position: relative;
      }
      .language-card:hover {
        transform: translateY(-4px);
      }
      .favorite-card {
        border: 1px solid var(--primary-color);
      }
      .remove-favorite {
        position: absolute;
        top: 0.25rem;
        inset-inline-end: 0.25rem;
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 50%;
        border: none;
        background: var(--surface-color);
        color: var(--text-color);
        font-size: 1rem;
        line-height: 1;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        opacity: 0;
        transition: opacity 0.2s, background 0.2s;
      }
      .favorite-card:hover .remove-favorite {
        opacity: 1;
      }
      .remove-favorite:hover {
        background: #e74c3c;
        color: white;
      }
      .flag {
        font-size: 3rem;
      }
      h2 {
        margin: 1rem 0 0;
        color: var(--text-color);
        font-size: 1.1rem;
        line-height: 1.2;
      }
      .flag-image {
        width: 64px;
        height: 48px;
        border-radius: 4px;
      }

      @media (max-width: 768px) {
        .grid {
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        }
        h2 {
          font-size: 1rem;
        }
        .remove-favorite {
          opacity: 1;
        }
      }

      @media (max-width: 480px) {
        .grid {
          grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        }
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
export class LanguageSelectionComponent {
  private readonly languageService = inject(LanguageService);
  private readonly destroyRef = inject(DestroyRef);

  // Constants
  private readonly FROM_LANGUAGE_KEY = 'polytalk-from-language';
  private readonly TO_LANGUAGE_KEY = 'polytalk-to-language';

  // Convert properties to signals
  languages = signal<Language[]>([]);
  fromLanguageCode = signal<string>('en');

  favoriteLanguages = computed(() => {
    // Access the signal to react to changes
    this.languageService.favoriteLanguageCodes();
    return this.languageService.getFavoriteLanguages();
  });

  constructor() {
    // Initialize languages signal
    this.languages.set(this.languageService.getLanguages());

    // Initialize from language signal from localStorage
    const savedFromLanguage = localStorage.getItem(this.FROM_LANGUAGE_KEY);
    if (savedFromLanguage) {
      this.fromLanguageCode.set(savedFromLanguage);
    }

    // Setup page initialization effect (replaces ngAfterViewInit)
    effect(() => {
      window.scrollTo(0, 0);
    });
  }

  onLanguageSelect(code: string): void {
    this.languageService.addFavorite(code);
    window.scrollTo(0, 0);
  }

  removeFavorite(event: Event, code: string): void {
    event.preventDefault();
    event.stopPropagation();
    this.languageService.removeFavorite(code);
  }
}
