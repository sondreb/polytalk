import { Component } from '@angular/core';

@Component({
  selector: 'app-privacy',
  standalone: true,
  template: `
    <div class="card page-content">
      <h1>Privacy Policy</h1>
      <p>Last updated: {{ lastUpdated }}</p>
      
      <h2>Information Collection</h2>
      <p>PolyTalk does not collect personal or account information directly. However, we use third-party services for analytics and advertising.</p>

      <h2>Analytics Data</h2>
      <p>We use Google Analytics to understand website usage patterns. Google Analytics may collect:</p>
      <ul>
        <li>Pages visited and time spent</li>
        <li>Browser and device information</li>
        <li>Geographic location (country/region level)</li>
        <li>Referral sources</li>
      </ul>

      <h2>Advertising Data</h2>
      <p>Our service uses Google AdSense for displaying advertisements. Google AdSense may collect:</p>
      <ul>
        <li>Cookie data</li>
        <li>Device information</li>
        <li>Usage statistics</li>
      </ul>

      <h2>How Information is Used</h2>
      <p>Data collection occurs through Google services:</p>
      <ul>
        <li>Google Analytics: To analyze website usage and improve user experience</li>
        <li>Google Tag Manager: To manage and deploy tracking scripts</li>
        <li>Google AdSense: To display relevant advertisements</li>
      </ul>

      <h2>Your Choices</h2>
      <p>You can control your data privacy through these methods:</p>
      <ul>
        <li>Install the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener">Google Analytics Opt-out Browser Add-on</a></li>
        <li>Adjust your <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener">Google Ads Settings</a></li>
      </ul>

      <h2>Advertising</h2>
      <p>We use Google AdSense to display advertisements. Google AdSense uses cookies to serve ads based on your visits to this and other websites. You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener">Google's Ads Settings</a>.</p>

      <h2>Contact Us</h2>
      <p>If you have questions about this Privacy Policy, <a href="https://github.com/sondreb">please contact us</a>.</p>
    </div>
  `,
  styles: [`
    .page-content {
      max-width: 800px;
      margin: 0 auto;
    }
    h1 { margin-bottom: 2rem; }
    h2 { margin-top: 2rem; }
  `]
})
export class PrivacyComponent {
  lastUpdated = '2024-12-12';
}
