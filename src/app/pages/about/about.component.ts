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

      <h2>Contact</h2>
      <p>For support or inquiries, please visit our <a href="https://github.com/sondreb/polytalk" target="_blank" rel="noopener">GitHub repository</a>.</p>
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
export class AboutComponent {}
