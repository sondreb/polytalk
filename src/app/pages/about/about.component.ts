import { Component } from '@angular/core';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { PremiumCardComponent } from '../../components/premium-card/premium-card.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [TranslatePipe, PremiumCardComponent],
  template: `
    <div class="card page-content">
      <h1>{{ 'about.title' | translate }}</h1>
      
      <p>{{ 'about.intro' | translate }}</p>

      <h2>{{ 'about.missionTitle' | translate }}</h2>
      <p>{{ 'about.missionText' | translate }}</p>

      <h2>{{ 'about.featuresTitle' | translate }}</h2>
      <ul>
        <li>{{ 'about.feature1' | translate }}</li>
        <li>{{ 'about.feature2' | translate }}</li>
        <li>{{ 'about.feature3' | translate }}</li>
        <li>{{ 'about.feature4' | translate }}</li>
      </ul>

      <h2>{{ 'premium.title' | translate }}</h2>
      <app-premium-card />

      <h2>{{ 'about.reviewTitle' | translate }}</h2>
      <p>{{ 'about.reviewText' | translate }}</p>
      <div class="review-links">
        <a href="https://apps.microsoft.com/detail/9NLCCGZQ48TX" target="_blank" rel="noopener" class="review-link microsoft">
          <span class="review-icon">⭐</span>
          <span class="review-text">
            <strong>{{ 'about.reviewMicrosoft' | translate }}</strong>
            <small>{{ 'about.reviewMicrosoftDesc' | translate }}</small>
          </span>
        </a>
        <a href="https://play.google.com/store/apps/details?id=me.polytalk.twa" target="_blank" rel="noopener" class="review-link google">
          <span class="review-icon">⭐</span>
          <span class="review-text">
            <strong>{{ 'about.reviewGoogle' | translate }}</strong>
            <small>{{ 'about.reviewGoogleDesc' | translate }}</small>
          </span>
        </a>
      </div>

      <h2>{{ 'about.contactTitle' | translate }}</h2>
      <p>{{ 'about.contactGithub' | translate }} <a href="https://github.com/sondreb/polytalk" target="_blank" rel="noopener">{{ 'about.githubRepo' | translate }}</a></p>
      <p>{{ 'about.followX' | translate }} <a href="https://x.com/PolyTalkMe" target="_blank" rel="noopener">PolyTalkMe</a></p>
    
    </div>
  `,
  styles: [`
    .page-content {
      max-width: 800px;
      margin: 0 auto;
    }
    h1 { margin-bottom: 2rem; }
    h2 { margin-top: 2rem; }
    
    .review-links {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      margin: 1.5rem 0;
    }
    
    .review-link {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1.5rem;
      border-radius: 12px;
      text-decoration: none;
      transition: all 0.3s ease;
      border: 2px solid transparent;
    }
    
    .review-link.microsoft {
      background: linear-gradient(135deg, rgba(0, 120, 212, 0.1), rgba(0, 90, 158, 0.1));
      color: #0078d4;
      border-color: rgba(0, 120, 212, 0.2);
    }
    
    .review-link.google {
      background: linear-gradient(135deg, rgba(1, 135, 95, 0.1), rgba(19, 115, 51, 0.1));
      color: #137333;
      border-color: rgba(1, 135, 95, 0.2);
    }
    
    .review-link:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    }
    
    .review-link.microsoft:hover {
      border-color: #0078d4;
      box-shadow: 0 8px 20px rgba(0, 120, 212, 0.2);
    }
    
    .review-link.google:hover {
      border-color: #137333;
      box-shadow: 0 8px 20px rgba(1, 135, 95, 0.2);
    }
    
    .review-icon {
      font-size: 2rem;
      flex-shrink: 0;
    }
    
    .review-text {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    
    .review-text strong {
      font-weight: 600;
      font-size: 1.1rem;
    }
    
    .review-text small {
      opacity: 0.8;
      font-size: 0.9rem;
    }
    
    @media (max-width: 768px) {
      .review-links {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class AboutComponent {
  ngAfterViewInit() {
    window.scrollTo(0, 0);
  }
}
