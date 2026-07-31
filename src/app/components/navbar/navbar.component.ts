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
        <a routerLink="/home" class="brand" aria-label="PolyTalk.Me">
          <img
            src="polytalk-wordmark.svg"
            alt="PolyTalk.Me"
            class="brand-logo brand-wordmark"
          />
          <img
            src="polytalk-wordmark-dark.svg"
            alt=""
            aria-hidden="true"
            class="brand-logo brand-wordmark brand-wordmark-dark"
          />
          <span class="visually-hidden">PolyTalk.Me</span>
        </a>
        <div class="nav-links">
          <a routerLink="/languages" routerLinkActive="active" class="nav-link">
            <span class="full-text">{{ 'nav.languages' | translate }}</span>
            <span class="icon-only">🌐</span>
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
        display: inline-flex;
        align-items: center;
        text-decoration: none;
        flex-shrink: 0;
        line-height: 0;
        border-radius: var(--radius-sm);
        transition: transform var(--duration) var(--ease);
      }
      .brand:hover {
        transform: scale(1.05);
      }
      .brand:focus-visible {
        outline: 2px solid var(--primary-color);
        outline-offset: 4px;
      }
      .brand-logo {
        display: block;
        height: 38px;
        width: auto;
      }
      /* The wordmark's deep navy is unreadable on dark surfaces, so a recoloured
         variant is swapped in whenever the dark theme is active. */
      .brand-wordmark-dark {
        display: none;
      }
      :host-context(body.dark-theme) .brand-wordmark:not(.brand-wordmark-dark) {
        display: none;
      }
      :host-context(body.dark-theme) .brand-wordmark-dark {
        display: block;
      }
      .visually-hidden {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
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
        .brand-logo {
          height: 34px;
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
      }
      @media (max-width: 350px) {
        .brand-logo {
          height: 30px;
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
