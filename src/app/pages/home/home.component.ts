import { Component, OnInit } from '@angular/core';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="hero">
      <div class="hero-content">
        <h1>Learn Any Language with PolyTalk</h1>
        <p>
          Master basic words, numbers, and essential phrases in any language,
          and learn more about language learning tips and tricks on our blog.
        </p>
        <div class="cta-buttons">
          <a routerLink="/languages" class="cta-button primary">
            Start Learning
            <span class="arrow">→</span>
          </a>
          <a routerLink="/blog" class="cta-button secondary">
            Read Blog
            <span class="arrow">→</span>
          </a>
        </div>
      </div>
    </div>

    <div class="features grid">
      <div class="card">
        <div class="icon">📚</div>
        <h2>Words</h2>
        <p>Learn essential vocabulary with native pronunciation</p>
      </div>
      <div class="card">
        <div class="icon">🔢</div>
        <h2>Numbers</h2>
        <p>Master counting and basic numerals</p>
      </div>
      <div class="card">
        <div class="icon">💭</div>
        <h2>Sentences</h2>
        <p>Practice common phrases and expressions</p>
      </div>
    </div>

    <div class="store-banner">
      <div class="store-content">
        <div class="store-icon">
          <a href="https://apps.microsoft.com/detail/9NLCCGZQ48TX">
            <img
              src="https://get.microsoft.com/images/en-us%20dark.svg"
              width="200"
            />
          </a>
        </div>
        <div class="store-text">
          <h3>Get PolyTalk for Windows</h3>
          <p>Install the native app for a better learning experience</p>
        </div>
        <a
          href="https://apps.microsoft.com/detail/9NLCCGZQ48TX"
          target="_blank"
          class="store-button"
        >
          Get it from Microsoft Store
          <span class="arrow">→</span>
        </a>
      </div>
    </div>

    <div class="ad-banner">
      <script type="text/javascript">
        aclib.runBanner({
          zoneId: '9196982',
        });
      </script>
    </div>

    <div class="disclaimer">
      <p>
        Please note that this application may contain errors in translations,
        pronunciations, or cultural context. Some content is generated using AI
        technology, which can occasionally produce inaccurate results. This tool
        is meant for basic learning purposes only and should not be considered a
        substitute for professional language instruction.
      </p>
    </div>
  `,
  styles: [
    `
      .hero {
        text-align: center;
        padding: 8rem 1rem;
        background: linear-gradient(
            125deg,
            rgba(130, 80, 255, 0.15) 0%,
            rgba(255, 110, 110, 0.15) 30%,
            rgba(80, 200, 255, 0.15) 100%
          ),
          radial-gradient(
            circle at top right,
            rgba(255, 170, 100, 0.12) 0%,
            rgba(130, 80, 255, 0.08) 50%,
            transparent 100%
          ),
          radial-gradient(
            circle at bottom left,
            rgba(80, 200, 255, 0.15) 0%,
            rgba(130, 80, 255, 0.1) 50%,
            transparent 100%
          );
        border-radius: 32px;
        margin: 2rem 0;
        position: relative;
        overflow: hidden;
        box-shadow: inset 0 0 100px rgba(130, 80, 255, 0.1),
          0 10px 40px rgba(130, 80, 255, 0.1);
      }

      .hero::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z' fill='rgba(255, 255, 255, 0.05)' fill-rule='evenodd'/%3E%3C/svg%3E");
        opacity: 0.6;
        mix-blend-mode: overlay;
      }

      .hero-content {
        position: relative;
        z-index: 1;
        animation: fadeIn 0.8s ease-out;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .features.grid {
        margin: 6rem auto;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2.5rem;
        max-width: 1200px;
        padding: 0 1rem;
      }

      .card {
        padding: 2.5rem 2rem;
        text-align: center;
        background: var(--surface-color);
        border-radius: 24px;
        border: 1px solid rgba(99, 102, 241, 0.1);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
      }

      .card:hover {
        transform: translateY(-8px);
        box-shadow: 0 20px 40px rgba(99, 102, 241, 0.2);
        border-color: rgba(99, 102, 241, 0.2);
      }

      .icon {
        font-size: 2.5rem;
        margin-bottom: 1.5rem;
        display: inline-block;
        transform: scale(1);
        transition: transform 0.3s ease;
      }

      .card:hover .icon {
        transform: scale(1.2);
      }

      h1 {
        font-size: 4rem;
        line-height: 1.2;
        font-weight: 800;
        background: linear-gradient(
          135deg,
          var(--gradient-start),
          var(--gradient-end)
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-bottom: 2rem;
        padding-bottom: 0.2em;
      }

      .hero p {
        font-size: 1.4rem;
        margin-bottom: 2.5rem;
        color: var(--text-color);
        opacity: 0.9;
      }

      .cta-buttons {
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
      }

      .cta-button {
        display: inline-flex;
        align-items: center;
        padding: 1.2rem 3rem;
        text-decoration: none;
        border-radius: 16px;
        font-size: 1.2rem;
        font-weight: 600;
        transition: all 0.3s ease;
      }

      .cta-button.primary {
        background: linear-gradient(
          135deg,
          var(--gradient-start),
          var(--gradient-end)
        );
        color: white;
        box-shadow: 0 8px 20px rgba(99, 102, 241, 0.3);
      }

      .cta-button.secondary {
        background: transparent;
        color: var(--text-color);
        border: 2px solid var(--text-color);
        opacity: 0.8;
      }

      .cta-button:hover {
        transform: translateY(-2px);
      }

      .cta-button.primary:hover {
        box-shadow: 0 12px 24px rgba(99, 102, 241, 0.4);
      }

      .cta-button.secondary:hover {
        opacity: 1;
        border-color: var(--gradient-end);
        color: var(--gradient-end);
      }

      .arrow {
        margin-left: 0.5rem;
        transition: transform 0.3s ease;
      }

      .cta-button:hover .arrow {
        transform: translateX(4px);
      }

      .store-banner {
        background: linear-gradient(135deg, #0078d4, #005a9e);
        border-radius: 24px;
        margin: 4rem auto;
        padding: 2rem;
        max-width: 1000px;
      }

      .store-content {
        display: flex;
        align-items: center;
        gap: 2rem;
        color: white;
      }

      .store-text {
        flex: 1;
      }

      .store-text h3 {
        font-size: 1.5rem;
        margin: 0;
        font-weight: 600;
      }

      .store-text p {
        margin: 0.5rem 0 0;
        opacity: 0.9;
      }

      .store-button {
        display: inline-flex;
        align-items: center;
        background: white;
        color: #0078d4;
        padding: 0.8rem 1.5rem;
        border-radius: 12px;
        text-decoration: none;
        font-weight: 600;
        transition: all 0.3s ease;
      }

      .store-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      }

      @media (max-width: 768px) {
        .store-content {
          flex-direction: column;
          text-align: center;
          gap: 1rem;
        }

        .store-banner {
          margin: 2rem 1rem;
        }
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
          padding: 4rem 1rem;
        }

        h1 {
          font-size: 2.5rem;
        }

        .hero p {
          font-size: 1.2rem;
        }

        .features.grid {
          grid-template-columns: 1fr;
          gap: 1.5rem;
          margin: 3rem auto;
        }

        .card {
          padding: 2rem 1.5rem;
        }
      }
    `,
  ],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    // Check if we're accessing home directly (not through navigation)
    if (this.route.snapshot.queryParams['direct'] !== 'true') {
      const fromLang = localStorage.getItem('lastFromLanguage');
      const toLang = localStorage.getItem('lastToLanguage');

      if (fromLang && toLang) {
        this.router.navigate(['/learn'], {
          queryParams: {
            from: fromLang,
            to: toLang,
          },
        });
      }
    }
  }

  // Static method to store language preferences
  static storeLanguagePreference(fromLang: string, toLang: string) {
    localStorage.setItem('lastFromLanguage', fromLang);
    localStorage.setItem('lastToLanguage', toLang);
  }
}
