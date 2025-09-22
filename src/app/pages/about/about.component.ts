import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <div class="card page-content">
      <h1>About PolyTalk</h1>
      
      <p>PolyTalk is a fun and intuitive language learning app that helps you learn the basics of any language. What makes PolyTalk unique is its flexibility - you can learn from any language to any language!</p>

      <h2>Our Mission</h2>
      <p>We believe that language learning should be accessible to everyone, regardless of their native language. Our mission is to break down language barriers and make basic communication possible between people of all backgrounds.</p>

      <h2>Features</h2>
      <ul>
        <li>Learn from any language to any language</li>
        <li>Basic vocabulary and common phrases</li>
        <li>Simple and intuitive interface</li>
        <li>Free to use</li>
      </ul>

      <h2>Review Our App</h2>
      <p>If you enjoy using PolyTalk, we'd love to hear from you! Your reviews help us improve and reach more language learners.</p>
      <div class="review-links">
        <a href="https://apps.microsoft.com/detail/9NLCCGZQ48TX" target="_blank" rel="noopener" class="review-link microsoft">
          <span class="review-icon">⭐</span>
          <span class="review-text">
            <strong>Review on Microsoft Store</strong>
            <small>Share your experience with Windows users</small>
          </span>
        </a>
        <a href="https://play.google.com/store/apps/details?id=me.polytalk.twa" target="_blank" rel="noopener" class="review-link google">
          <span class="review-icon">⭐</span>
          <span class="review-text">
            <strong>Review on Google Play</strong>
            <small>Help Android users discover PolyTalk</small>
          </span>
        </a>
      </div>

      <h2>Contact</h2>
      <p>For support or inquiries, please visit our <a href="https://github.com/sondreb/polytalk" target="_blank" rel="noopener">GitHub repository</a></p>
      <p>Follow us on X: <a href="https://x.com/PolyTalkMe" target="_blank" rel="noopener">PolyTalkMe</a></p>
    
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
