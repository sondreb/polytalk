import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  template: `
    <nav>
      <div class="nav-content">
        <a routerLink="/" class="brand">PolyTalk.Me</a>
        <div class="nav-links">
          <a routerLink="/languages">Languages</a>
        </div>
      </div>
    </nav>
  `,
  styles: [
    `
      nav {
        background: white;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        padding: 1rem;
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
        color: var(--primary-color);
        text-decoration: none;
      }
      .nav-links a {
        color: var(--text-color);
        text-decoration: none;
        padding: 0.5rem 1rem;
        border-radius: 4px;
      }
      .nav-links a:hover {
        background: var(--background-color);
      }
    `,
  ],
})
export class NavbarComponent {}
