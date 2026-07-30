import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  template: `
    <div class="hero">
      <div class="hero-content">
        <h1>{{ 'home.title' | translate }}</h1>
        <p>{{ 'home.subtitle' | translate }}</p>
        <div class="cta-buttons">
          <a routerLink="/languages" class="cta-button primary">
            {{ 'home.startLearning' | translate }}
            <span class="arrow">→</span>
          </a>
        </div>
      </div>
    </div>

    <div class="features grid">
      <div class="card">
        <div class="icon">📚</div>
        <h2>{{ 'home.words' | translate }}</h2>
        <p>{{ 'home.wordsDesc' | translate }}</p>
      </div>
      <div class="card">
        <div class="icon">🔢</div>
        <h2>{{ 'home.numbers' | translate }}</h2>
        <p>{{ 'home.numbersDesc' | translate }}</p>
      </div>
      <div class="card">
        <div class="icon">💭</div>
        <h2>{{ 'home.sentences' | translate }}</h2>
        <p>{{ 'home.sentencesDesc' | translate }}</p>
      </div>
    </div>

    <div class="store-banners">
      <div class="store-banner microsoft">
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
            <h3>{{ 'home.getWindows' | translate }}</h3>
            <a
              href="https://apps.microsoft.com/detail/9NLCCGZQ48TX"
              target="_blank"
              class="store-description-link"
            >
              {{ 'home.installWindows' | translate }}
            </a>
          </div>
        </div>
      </div>

      <div class="store-banner google">
        <div class="store-content">
          <div class="store-icon">
            <a href="https://play.google.com/store/apps/details?id=me.polytalk.twa">
              <img
                src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                width="200"
                alt="Get it on Google Play"
              />
            </a>
          </div>
          <div class="store-text">
            <h3>{{ 'home.getAndroid' | translate }}</h3>
            <a
              href="https://play.google.com/store/apps/details?id=me.polytalk.twa"
              target="_blank"
              class="store-description-link"
            >
              {{ 'home.installAndroid' | translate }}
            </a>
          </div>
        </div>
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
      <p>{{ 'home.disclaimer' | translate }}</p>
    </div>
  `,
  styles: [
    `
      .hero {
        text-align: center;
        padding: 5rem 1.5rem;
        background: linear-gradient(
            125deg,
            rgba(130, 80, 255, 0.16) 0%,
            rgba(255, 110, 110, 0.12) 45%,
            rgba(80, 200, 255, 0.16) 100%
          ),
          radial-gradient(
            circle at top right,
            rgba(255, 170, 100, 0.14) 0%,
            transparent 60%
          ),
          radial-gradient(
            circle at bottom left,
            rgba(80, 200, 255, 0.16) 0%,
            transparent 60%
          );
        border-radius: var(--radius-xl);
        border: 1px solid var(--border-color);
        margin: 0 0 4rem;
        position: relative;
        overflow: hidden;
        box-shadow: var(--shadow-sm);
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
        margin: 0 auto 4rem;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.5rem;
        max-width: 1200px;
      }

      .card {
        padding: 2rem 1.5rem;
        text-align: center;
        background: var(--surface-color);
        border-radius: var(--radius-lg);
        border: 1px solid var(--border-color);
        transition: transform var(--duration) var(--ease),
          box-shadow var(--duration) var(--ease),
          border-color var(--duration) var(--ease);
        position: relative;
      }

      .card h2 {
        font-size: 1.15rem;
        margin: 0 0 0.5rem;
      }

      .card p {
        margin: 0;
        color: var(--text-light);
        font-size: 0.95rem;
      }

      .card:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow-lg);
        border-color: var(--primary-color);
      }

      .icon {
        font-size: 2rem;
        margin-bottom: 1rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 56px;
        height: 56px;
        border-radius: var(--radius-lg);
        background: var(--primary-soft);
        transition: transform var(--duration) var(--ease);
      }

      .card:hover .icon {
        transform: scale(1.08);
      }

      h1 {
        font-size: 3.25rem;
        line-height: 1.1;
        font-weight: 800;
        background: linear-gradient(
          135deg,
          var(--gradient-start),
          var(--gradient-end)
        );
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        margin: 0 0 1.5rem;
        padding-bottom: 0.15em;
      }

      .hero p {
        font-size: 1.15rem;
        line-height: 1.6;
        max-width: 46rem;
        margin: 0 auto 2rem;
        color: var(--text-light);
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
        padding: 0.95rem 2.25rem;
        text-decoration: none;
        border-radius: var(--radius-md);
        font-size: 1.05rem;
        font-weight: 600;
        transition: all var(--duration) var(--ease);
      }

      .cta-button.primary {
        background: linear-gradient(
          135deg,
          var(--gradient-start),
          var(--gradient-end)
        );
        color: white;
        box-shadow: var(--shadow-brand);
      }

      .cta-button.secondary {
        background: var(--surface-color);
        color: var(--text-color);
        border: 1px solid var(--border-strong);
      }

      .cta-button:hover {
        transform: translateY(-2px);
      }

      .cta-button.primary:hover {
        box-shadow: 0 12px 24px rgba(99, 102, 241, 0.4);
      }

      .cta-button.secondary:hover {
        border-color: var(--primary-color);
        color: var(--primary-color);
      }

      .arrow {
        margin-inline-start: 0.5rem;
        transition: transform 0.3s ease;
      }

      .cta-button:hover .arrow {
        transform: translateX(4px);
      }

      :host-context([dir='rtl']) .cta-button:hover .arrow {
        transform: translateX(-4px);
      }

      .store-banners {
        max-width: 1000px;
        margin: 0 auto 3rem;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.5rem;
      }

      .store-banner {
        border-radius: var(--radius-lg);
        padding: 1.5rem;
        transition: transform var(--duration) var(--ease),
          box-shadow var(--duration) var(--ease);
      }

      .store-banner:hover {
        transform: translateY(-3px);
        box-shadow: var(--shadow-lg);
      }

      .store-banner.microsoft {
        background: linear-gradient(135deg, #0078d4, #005a9e);
      }

      .store-banner.google {
        background: linear-gradient(135deg, #01875f, #137333);
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
        font-size: 1.25rem;
        margin: 0;
        font-weight: 600;
      }

      .store-description-link {
        display: block;
        margin: 0.5rem 0 0;
        opacity: 0.9;
        color: white;
        text-decoration: none;
        transition: all 0.3s ease;
        cursor: pointer;
      }

      .store-description-link:hover {
        opacity: 1;
        text-decoration: underline;
        transform: translateX(4px);
      }

      @media (max-width: 768px) {
        .store-banners {
          grid-template-columns: 1fr;
          margin: 2rem 1rem;
          gap: 1rem;
        }

        .store-content {
          text-align: center;
        }
      }

      .disclaimer {
        margin: 0 auto;
        padding: 1rem;
        text-align: center;
        color: var(--text-light);
        font-size: 0.85rem;
        line-height: 1.6;
        max-width: 800px;
      }

      @media (max-width: 768px) {
        .hero {
          padding: 3rem 1rem;
          margin-bottom: 2.5rem;
        }

        h1 {
          font-size: 2.25rem;
        }

        .hero p {
          font-size: 1.05rem;
        }

        .features.grid {
          grid-template-columns: 1fr;
          gap: 1rem;
          margin-bottom: 2.5rem;
        }

        .card {
          padding: 1.5rem 1.25rem;
        }
      }
    `,
  ],
})
export class HomeComponent {}
