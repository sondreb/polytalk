import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer>
      <div class="footer-content">
        <nav>
          <a routerLink="/privacy">Privacy</a>
          <a routerLink="/terms">Terms</a>
          <a routerLink="/about">About</a>
        </nav>
        <p class="copyright">&copy; {{ currentYear }} PolyTalk.Me</p>
      </div>
    </footer>
  `,
  styles: [
    `
      footer {
        width: 100%;
        padding: 1rem;
        background: var(--surface-color);
        border-top: 1px solid rgba(99, 102, 241, 0.1);
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
        margin-bottom: 1rem;
      }
      nav a {
        margin: 0 1rem;
        color: var(--text-light);
        text-decoration: none;
        transition: color 0.3s;
      }
      nav a:hover {
        color: var(--primary-color);
      }
      p {
        color: var(--text-light);
        margin: 0;
      }
      .copyright {
        font-size: 0.875rem; /* 14px when base font-size is 16px */
        color: var(--text-light);
      }
    `,
  ],
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
