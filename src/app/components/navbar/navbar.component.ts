import { Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, TranslatePipe],
  template: `
    <nav class="navbar">
      <div class="content-wrapper">
        <a routerLink="/home" class="brand">PolyTalk.Me</a>
        <div class="nav-links">
          <a routerLink="/languages" routerLinkActive="active" class="nav-link">
            <span class="full-text">{{ 'nav.languages' | translate }}</span>
            <span class="icon-only">🌐</span>
          </a>
          <a routerLink="/blog" routerLinkActive="active" class="nav-link">
            <span class="full-text">{{ 'nav.blog' | translate }}</span>
            <span class="icon-only">📝</span>
          </a>
          <a routerLink="/settings" routerLinkActive="active" class="nav-link">
            <span class="full-text">{{ 'nav.settings' | translate }}</span>
            <span class="icon-only">⚙️</span>
          </a>
          @if (showInstall()) {
            <button (click)="installClicked.emit()" class="install-button btn-primary">
              <span>{{ 'nav.install' | translate }}</span>
              <span class="app-text">&nbsp;{{ 'nav.app' | translate }}</span>
            </button>
          }
        </div>
      </div>
    </nav>
  `,
  styles: [
    `
      .navbar {
        background: color-mix(in srgb, var(--surface-color) 85%, transparent);
        backdrop-filter: blur(12px);
        border-bottom: 1px solid var(--border-color);
        padding: 0.75rem 0;
        position: sticky;
        top: 0;
        z-index: 100;
        width: 100%;
      }
      .content-wrapper {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 1rem;
        width: 100%;
        box-sizing: border-box;
        gap: 0.5rem;
      }
      .nav-links {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        flex-wrap: wrap;
        justify-content: flex-end;
      }
      .brand {
        font-size: 1.4rem;
        font-weight: 800;
        letter-spacing: -0.02em;
        background: linear-gradient(
          135deg,
          var(--gradient-start),
          var(--gradient-end)
        );
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        text-decoration: none;
        white-space: nowrap;
        flex-shrink: 0;
      }
      .nav-links a {
        color: var(--text-light);
        text-decoration: none;
        font-weight: 500;
        padding: 0.5rem 0.9rem;
        border-radius: var(--radius-sm);
        transition: background var(--duration) var(--ease),
          color var(--duration) var(--ease);
        white-space: nowrap;
      }
      .nav-links a:hover {
        background: var(--primary-soft);
        color: var(--primary-color);
      }
      .nav-links a.active {
        color: var(--primary-color);
        background: var(--primary-soft);
      }
      .install-button {
        margin-inline-start: 0.5rem;
        padding: 0.5rem 1.1rem;
        white-space: nowrap;
      }
      .nav-link .icon-only {
        display: none;
      }
      .nav-link .full-text {
        display: inline;
      }
      .app-text {
        display: inline;
      }
      @media (max-width: 768px) {
        .content-wrapper {
          padding: 0 0.5rem;
        }
        .nav-links a {
          padding: 0.5rem 0.6rem;
        }
        .install-button {
          margin-inline-start: 0.25rem;
          padding: 0.5rem 0.75rem;
        }
      }
      @media (max-width: 550px) {
        .nav-link .icon-only {
          display: inline;
          font-size: 1.15rem;
        }
        .nav-link .full-text {
          display: none;
        }
        .app-text {
          display: none;
        }
        .brand {
          font-size: 1.2rem;
        }
      }
      @media (max-width: 350px) {
        .brand {
          font-size: 1.05rem;
        }
        .nav-links {
          gap: 0.125rem;
        }
        .nav-links a {
          padding: 0.4rem;
        }
        .install-button {
          margin-inline-start: 0.125rem;
          padding: 0.4rem 0.5rem;
          font-size: 0.85rem;
        }
      }
    `,
  ],
})
export class NavbarComponent {
  readonly showInstall = input(false);
  readonly installClicked = output<void>();
}
