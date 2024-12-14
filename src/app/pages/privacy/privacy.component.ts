import { Component } from '@angular/core';

@Component({
  selector: 'app-privacy',
  standalone: true,
  template: `
    <div class="card page-content">
      <h1>Privacy Policy</h1>
      <p>Last updated: {{ lastUpdated }}</p>
      
      <h2>Information Collection</h2>
      <p>PolyTalk does not collect any personal information or account information. We do not store any user data.</p>

      <h2>Advertising Data</h2>
      <p>Our service uses Google AdSense for displaying advertisements. Google AdSense may collect:</p>
      <ul>
        <li>Cookie data</li>
        <li>Device information</li>
        <li>Usage statistics</li>
      </ul>

      <h2>How Information is Used</h2>
      <p>The only data collection that occurs on PolyTalk is through Google AdSense, which is used to:</p>
      <ul>
        <li>Display relevant advertisements</li>
        <li>Measure ad performance</li>
        <li>Provide personalized ad experience</li>
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
