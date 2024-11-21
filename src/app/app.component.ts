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
      <app-navbar />
      <main>
        <router-outlet />
      </main>
    `,
    styles: [`
      .update-banner {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        padding: 1rem;
        background: #2196f3;
        color: white;
        text-align: center;
        z-index: 1000;
      }
      .update-banner button {
        margin-left: 1rem;
        padding: 0.5rem 1rem;
        border: 1px solid white;
        background: transparent;
        color: white;
        cursor: pointer;
        border-radius: 4px;
      }
    `]
})
export class AppComponent {
    constructor(public updateService: UpdateService) {}
}
