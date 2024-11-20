import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="hero">
      <h1>Learn Any Language with PolyTalk</h1>
      <p>Master basic words, numbers, and essential phrases in any language</p>
      <a routerLink="/languages" class="cta-button">Start Learning</a>
    </div>
    
    <div class="features grid">
      <div class="card">
        <h2>Words</h2>
        <p>Learn essential vocabulary with native pronunciation</p>
      </div>
      <div class="card">
        <h2>Numbers</h2>
        <p>Master counting and basic numerals</p>
      </div>
      <div class="card">
        <h2>Sentences</h2>
        <p>Practice common phrases and expressions</p>
      </div>
    </div>
  `,
  styles: [`
    .hero {
      text-align: center;
      padding: 4rem 1rem;
    }
    h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
      color: var(--primary-color);
    }
    .hero p {
      font-size: 1.25rem;
      margin-bottom: 2rem;
    }
    .cta-button {
      display: inline-block;
      padding: 1rem 2rem;
      background: var(--primary-color);
      color: white;
      text-decoration: none;
      border-radius: 8px;
      font-size: 1.1rem;
      transition: transform 0.2s;
    }
    .cta-button:hover {
      transform: translateY(-2px);
      background: var(--secondary-color);
    }
  `]
})
export class HomeComponent {}
