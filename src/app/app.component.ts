import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, CommonModule, NavbarComponent],
    template: `
      <app-navbar />
      <main>
        <router-outlet />
      </main>
    `,
    styleUrl: './app.component.css'
})
export class AppComponent {}
