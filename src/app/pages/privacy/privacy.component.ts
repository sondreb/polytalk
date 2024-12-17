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
      <p>Our service uses Adcash for displaying advertisements. Adcash may collect:</p>
      <ul>
        <li>Cookie data</li>
        <li>Device information</li>
        <li>IP address</li>
        <li>Browser information</li>
      </ul>

      <h2>How Information is Used</h2>
      <p>Data collection occurs through the following services:</p>
      <ul>
        <li>Google Analytics: To analyze website usage and improve user experience</li>
        <li>Google Tag Manager: To manage and deploy tracking scripts</li>
        <li>Adcash: To display advertisements and measure ad performance</li>
      </ul>

      <h2>Your Choices</h2>
      <p>You can control your data privacy through these methods:</p>
      <ul>
        <li>Install the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener">Google Analytics Opt-out Browser Add-on</a></li>
        <li>Learn more about Adcash's privacy practices at <a href="https://adcash.com/privacy-policy/" target="_blank" rel="noopener">Adcash Privacy Policy</a></li>
      </ul>

      <h2>Advertising</h2>
      <p>We use Adcash to display advertisements. Adcash uses cookies and similar technologies to serve ads and measure their performance. For more information about how Adcash handles your data, please visit their <a href="https://adcash.com/privacy-policy/" target="_blank" rel="noopener">Privacy Policy</a>.</p>

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
