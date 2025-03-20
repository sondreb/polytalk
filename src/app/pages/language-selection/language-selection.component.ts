import { Component, signal, effect, DestroyRef, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LanguageService, Language } from '../../services/language.service';
import { trigger, style, animate, transition, query, stagger } from '@angular/animations';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-language-selection',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <script type="text/javascript">
        aclib.runInterstitial({
            zoneId: '9197070',
        });
    </script>

    <section class="languages">
      <div class="grid" [@listAnimation]="languages().length">
        @for (language of languages(); track language.code) {
          <div
            class="card language-card"
            [routerLink]="['/learn', fromLanguageCode(), language.code, 'words']"
            (click)="onLanguageSelect()"
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
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 1.5rem;
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

  onLanguageSelect(): void {
    window.scrollTo(0, 0);
  }
}
