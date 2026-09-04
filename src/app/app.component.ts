import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UpdateService } from './services/update.service';
import { FooterComponent } from './components/footer/footer.component';
import { ThemeService } from './services/theme.service';
import { PremiumService } from './services/premium.service';
import { TranslatePipe } from './pipes/translate.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavbarComponent, FooterComponent, TranslatePipe],
  template: `
    @if (updateService.updateAvailable()) {
      <div class="update-banner">
        {{ 'update.available' | translate }}
        <button (click)="updateService.updateNow()">{{ 'update.now' | translate }}</button>
      </div>
    }
    <app-navbar
      [showInstall]="showInstallPrompt()"
      (installClicked)="installPwa()"
    />
    <main>
      <router-outlet />
    </main>
    <app-footer />
  `,
  styles: [
    `
      main {
        flex: 1;
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem 1.5rem;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
      }

      @media (max-width: 768px) {
        main {
          padding: 1rem;
        }
      }

      @media (max-width: 480px) {
        main {
          padding: 0.75rem;
        }
      }

      .update-banner {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        padding: 1rem;
        background: linear-gradient(
          135deg,
          var(--gradient-start),
          var(--gradient-end)
        );
        color: white;
        text-align: center;
        z-index: 1000;
      }
      .update-banner button {
        margin-inline-start: 1rem;
        padding: 0.5rem 1rem;
        border: none;
        background: white;
        color: var(--primary-color);
        cursor: pointer;
        border-radius: 24px;
        transition: transform 0.2s, background-color 0.2s;
        font-size: 1rem;
      }
      .update-banner button:hover {
        transform: scale(1.05);
        background-color: #f0f0f0;
      }

      :host {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        width: 100%;
        overflow-x: hidden;
      }
    `,
  ],
})
export class AppComponent {
  readonly updateService = inject(UpdateService);
  private readonly themeService = inject(ThemeService);
  private readonly premiumService = inject(PremiumService);

  readonly showInstallPrompt = signal(false);
  private deferredPrompt: any;

  constructor() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      this.showInstallPrompt.set(true);
    });

    this.themeService.applyTheme();
  }

  async installPwa() {
    if (!this.deferredPrompt) return;

    this.deferredPrompt.prompt();
    const { outcome } = await this.deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      this.showInstallPrompt.set(false);
    }

    this.deferredPrompt = null;
  }
}
