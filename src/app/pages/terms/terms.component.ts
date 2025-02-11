import { Component } from '@angular/core';

@Component({
  selector: 'app-terms',
  standalone: true,
  template: `
    <div class="card page-content">
      <h1>Terms of Service</h1>
      <p>Last updated: {{ lastUpdated }}</p>

      <h2>1. Acceptance of Terms</h2>
      <p>By accessing and using PolyTalk, you accept and agree to be bound by these Terms of Service.</p>

      <h2>2. Changes to Terms</h2>
      <p>We reserve the right to modify these terms at any time. We will notify users of any material changes.</p>

      <h2>3. Usage License</h2>
      <p>We grant you a personal, non-exclusive, non-transferable license to use PolyTalk.</p>

      <h2>4. User Conduct</h2>
      <p>You agree not to misuse our services or help anyone else do so.</p>

      <h2>5. Termination</h2>
      <p>We may terminate or suspend your access to PolyTalk at any time, without prior notice.</p>
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
export class TermsComponent {
  lastUpdated = '2024-12-12';

  ngAfterViewInit() {
    window.scrollTo(0, 0);
  }
}
