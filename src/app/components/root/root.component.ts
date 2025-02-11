import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-root',
  standalone: true,
  template: ``,
  styles: [``],
})
export class HomeRootComponent implements OnInit {
  private readonly FROM_LANGUAGE_KEY = 'polytalk-from-language';
  private readonly TO_LANGUAGE_KEY = 'polytalk-to-language';

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    // Check if we're accessing home directly (not through navigation)
    const fromLang = localStorage.getItem(this.FROM_LANGUAGE_KEY);
    const toLang = localStorage.getItem(this.TO_LANGUAGE_KEY);

    if (fromLang && toLang) {
      this.router.navigate(['/learn', fromLang, toLang, 'words']);
    } else {
      this.router.navigate(['/home']);
    }
  }

  // Static method to store language preferences
  static storeLanguagePreference(fromLang: string, toLang: string) {
    localStorage.setItem('lastFromLanguage', fromLang);
    localStorage.setItem('lastToLanguage', toLang);
  }
}
