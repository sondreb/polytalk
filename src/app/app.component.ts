import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UpdateService } from './services/update.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavbarComponent],
  template: `
    <div *ngIf="updateService.updateAvailable()" class="update-banner">
      A new version is available!
      <button (click)="updateService.updateNow()">Update Now</button>
    </div>
    <app-navbar
      [showInstall]="showInstallPrompt"
      (installClicked)="installPwa()"
    />
    <main>
      <router-outlet />
    </main>
  `,
  styles: [
    `
      .fullscreen-container {
        position: relative;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
      }

      .fullscreen-container .logo {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .fullscreen-container h1 {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 3rem;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
      }

      .install-button {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 12px 24px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 24px;
        font-size: 1.1rem;
        cursor: pointer;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        transition: transform 0.2s;
      }

      .install-button:hover {
        transform: scale(1.05);
        background-color: #0056b3;
      }

      main {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
      }

      @media (max-width: 768px) {
        main {
          padding: 1rem;
        }
      }

      @media (max-width: 480px) {
        main {
          padding: 0.5rem;
        }
      }

      .update-banner {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        padding: 1rem;
        background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
        color: white;
        text-align: center;
        z-index: 1000;
      }
      .update-banner button {
        margin-left: 1rem;
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
    `,
  ],
})
export class AppComponent {
  showInstallPrompt = false;
  private deferredPrompt: any;

  constructor(public updateService: UpdateService) {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      this.showInstallPrompt = true;
    });
  }

  async installPwa() {
    if (!this.deferredPrompt) return;

    this.deferredPrompt.prompt();
    const { outcome } = await this.deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      this.showInstallPrompt = false;
    }

    this.deferredPrompt = null;
  }
}
