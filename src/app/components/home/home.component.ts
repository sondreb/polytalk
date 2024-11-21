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
      padding: 6rem 1rem;
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1));
      border-radius: 24px;
      margin: 2rem 0;
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
      text-align: center;
      background: var(--surface-color);
      border-radius: 16px;
      border: 1px solid rgba(99, 102, 241, 0.1);
      transition: all 0.3s ease;
    }
    .card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 20px rgba(99, 102, 241, 0.15);
    }
    h1 {
      font-size: 3.5rem;
      font-weight: 800;
      background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 1.5rem;
    }
    .hero p {
      font-size: 1.25rem;
      margin-bottom: 2rem;
    }
    .cta-button {
      display: inline-block;
      padding: 1rem 2.5rem;
      background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
      color: white;
      text-decoration: none;
      border-radius: 12px;
      font-size: 1.2rem;
      font-weight: 600;
      transition: all 0.3s ease;
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
    }
    .cta-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(99, 102, 241, 0.3);
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
