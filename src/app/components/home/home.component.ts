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

    <div class="disclaimer">
      <p>
        Please note that this application may contain errors in translations, pronunciations, or cultural context. 
        Some content is generated using AI technology, which can occasionally produce inaccurate results. 
        This tool is meant for basic learning purposes only and should not be considered a substitute for professional language instruction.
      </p>
    </div>
  `,
  styles: [`
    .hero {
      text-align: center;
      padding: 4rem 1rem;
    }
    .features.grid {
      margin: 4rem auto;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
      max-width: 1200px;
      padding: 0 1rem;
    }
    .card {
      padding: 2rem;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.05);
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
    .disclaimer {
      margin-top: 3rem;
      padding: 1rem;
      text-align: center;
      color: var(--text-color);
      opacity: 0.8;
      font-size: 0.9rem;
      max-width: 800px;
      margin-left: auto;
      margin-right: auto;
    }
    @media (max-width: 768px) {
      .hero {
        padding: 2rem 1rem;
      }
      .features.grid {
        grid-template-columns: 1fr;
        margin: 2rem auto;
      }
      h1 {
        font-size: 2rem;
      }
      .hero p {
        font-size: 1.1rem;
      }
    }
  `]
})
export class HomeComponent {}
