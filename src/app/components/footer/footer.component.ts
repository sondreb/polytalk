import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  template: `
    <footer>
      <div class="footer-content">
        <nav>
          <a routerLink="/privacy">{{ 'footer.privacy' | translate }}</a>
          <a routerLink="/terms">{{ 'footer.terms' | translate }}</a>
          <a routerLink="/about">{{ 'footer.about' | translate }}</a>
        </nav>
        <p class="copyright">&copy; {{ currentYear }} PolyTalk.Me | <a href="https://x.com/PolyTalkMe" target="_blank">&#64;PolyTalkMe</a></p>
      </div>
    </footer>
  `,
  styles: [
    `
      footer {
        width: 100%;
        padding: 1.5rem 1rem;
        background: var(--surface-color);
        border-top: 1px solid var(--border-color);
        box-sizing: border-box;
        flex-shrink: 0;
      }
      .footer-content {
        max-width: 1200px;
        margin: 0 auto;
        text-align: center;
        padding: 0 1rem;
        box-sizing: border-box;
      }
      nav {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 1.5rem;
        margin-bottom: 0.75rem;
      }
      nav a {
        color: var(--text-light);
        text-decoration: none;
        font-size: 0.9rem;
        transition: color var(--duration) var(--ease);
      }
      nav a:hover {
        color: var(--primary-color);
      }
      p {
        color: var(--text-light);
        margin: 0;
      }
      .copyright {
        font-size: 0.85rem;
        color: var(--text-light);
      }
    `,
  ],
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
