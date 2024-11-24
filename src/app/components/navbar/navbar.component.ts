import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <nav class="navbar">
      <div class="content-wrapper">
        <a routerLink="/" class="brand">PolyTalk.Me</a>
        <div class="nav-links">
          <a routerLink="/languages" class="nav-link">
            <span class="full-text">Languages</span>
            <span class="icon-only">🌐</span>
          </a>
          <button
            *ngIf="showInstall"
            (click)="onInstallClick()"
            class="install-button"
          >
            <span>Install</span>
            <span class="app-text">App</span>
          </button>
        </div>
      </div>
    </nav>
  `,
  styles: [
    `
      .navbar {
        background: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(10px);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        padding: 1rem;
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
      }
      @media (max-width: 768px) {
        .content-wrapper {
          padding: 0 0.5rem;
        }
      }
      .nav-links {
        display: flex;
        align-items: center;
        gap: 1rem;
      }
      .nav-content {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .brand {
        font-size: 1.5rem;
        font-weight: bold;
        background: linear-gradient(
          135deg,
          var(--gradient-start),
          var(--gradient-end)
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-decoration: none;
      }
      .nav-links a {
        color: var(--text-color);
        text-decoration: none;
        padding: 0.5rem 1rem;
        border-radius: 8px;
        transition: all 0.3s ease;
      }
      .nav-links a:hover {
        background: linear-gradient(
          135deg,
          var(--gradient-start),
          var(--gradient-end)
        );
        color: white;
      }
      .install-button {
        margin-left: 1rem;
        background: linear-gradient(
          135deg,
          var(--gradient-start),
          var(--gradient-end)
        );
        background-size: 200% 100%;
        background-position: 0% 0%;
        color: white;
        padding: 0.5rem 1.5rem;
        border-radius: 8px;
        font-weight: 600;
        transition: all 0.3s ease;
      }
      .install-button:hover {
        background: linear-gradient(
          135deg,
          var(--secondary-color),
          var(--secondary-dark)
        );
        background-size: 200% 100%;
        background-position: 100% 0%;
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
      @media (max-width: 450px) {
        .nav-link .icon-only {
          display: inline;
        }
        .nav-link .full-text {
          display: none;
        }
        .app-text {
          display: none;
        }
      }
    `,
  ],
})
export class NavbarComponent {
  @Input() showInstall = false;
  @Output() installClicked = new EventEmitter<void>();

  onInstallClick() {
    this.installClicked.emit();
  }
}
