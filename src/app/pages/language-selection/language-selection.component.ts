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
      <div class="search-bar">
        <svg viewBox="0 0 24 24" aria-hidden="true" class="search-icon">
          <circle cx="11" cy="11" r="6.5" />
          <path d="m16 16 4 4" />
        </svg>
        <input
          type="search"
          [value]="query()"
          (input)="onQueryInput($event)"
          [attr.aria-label]="'langSelect.search' | translate"
          [attr.placeholder]="'langSelect.search' | translate"
        />
      </div>

      @if (favoriteLanguages().length > 0 && !query()) {
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
        @if (favoriteLanguages().length > 0 && !query()) {
          <h3 class="section-title">{{ 'langSelect.allLanguages' | translate }}</h3>
        }
        @if (filteredLanguages().length === 0) {
          <p class="empty">{{ 'langSelect.noResults' | translate }}</p>
        } @else {
          <div class="grid" [@listAnimation]="filteredLanguages().length">
            @for (language of filteredLanguages(); track language.code) {
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
        }
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
      :host {
        display: block;
      }
      .languages {
        max-width: 1200px;
        margin: 0 auto;
        width: 100%;
      }
      .search-bar {
        position: relative;
        display: flex;
        align-items: center;
        margin-bottom: 1.5rem;
      }
      .search-icon {
        position: absolute;
        inset-inline-start: 0.9rem;
        width: 18px;
        height: 18px;
        fill: none;
        stroke: var(--text-light);
        stroke-width: 2;
        stroke-linecap: round;
        pointer-events: none;
      }
      .search-bar input {
        width: 100%;
        padding-inline-start: 2.6rem;
        padding-block: 0.7rem;
        border-radius: var(--radius-pill);
        background: var(--surface-color);
        box-shadow: var(--shadow-sm);
      }
      .section-title {
        font-size: 0.8rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--text-light);
        margin: 0 0 0.75rem 0;
      }
      .favorites-section {
        margin-bottom: 2rem;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 1rem;
      }
      .empty {
        color: var(--text-light);
        text-align: center;
        padding: 2rem 0;
      }
      .language-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.75rem;
        text-align: center;
        cursor: pointer;
        padding: 1.25rem 0.75rem;
        position: relative;
      }
      .language-card:hover {
        transform: translateY(-3px);
        border-color: var(--primary-color);
      }
      .favorite-card {
        border-color: var(--primary-color);
        background: linear-gradient(
          180deg,
          var(--primary-soft),
          var(--surface-color) 60%
        );
      }
      .remove-favorite {
        position: absolute;
        top: 0.35rem;
        inset-inline-end: 0.35rem;
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 50%;
        border: none;
        background: var(--surface-muted);
        color: var(--text-light);
        font-size: 1rem;
        line-height: 1;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        opacity: 0;
        transition: opacity var(--duration) var(--ease),
          background var(--duration) var(--ease);
      }
      .favorite-card:hover .remove-favorite,
      .remove-favorite:focus-visible {
        opacity: 1;
      }
      .remove-favorite:hover {
        background: var(--accent-color);
        color: white;
      }
      h2 {
        margin: 0;
        color: var(--text-color);
        font-size: 1rem;
        font-weight: 600;
        line-height: 1.2;
      }
      .flag-image {
        width: 56px;
        height: 42px;
        border-radius: var(--radius-sm);
        object-fit: cover;
        box-shadow: var(--shadow-sm);
      }

      @media (max-width: 768px) {
        .grid {
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 0.75rem;
        }
        h2 {
          font-size: 0.95rem;
        }
        .remove-favorite {
          opacity: 1;
        }
      }

      @media (max-width: 480px) {
        .grid {
          grid-template-columns: repeat(auto-fill, minmax(104px, 1fr));
        }
        h2 {
          font-size: 0.85rem;
        }
        .flag-image {
          width: 44px;
          height: 33px;
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
  query = signal<string>('');

  filteredLanguages = computed(() => {
    const term = this.query().trim().toLowerCase();
    if (!term) return this.languages();
    return this.languages().filter(
      (language) =>
        language.name.toLowerCase().includes(term) ||
        language.code.toLowerCase().includes(term)
    );
  });

  favoriteLanguages = computed(() => {
    // Access the signal to react to changes
    this.languageService.favoriteLanguageCodes();
    return this.languageService.getFavoriteLanguages();
  });

  onQueryInput(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
  }

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
