import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly THEME_KEY = 'app-theme';

  constructor() {
    this.applyTheme();
  }

  applyTheme() {
    const savedTheme = this.getSavedTheme();
    this.setTheme(savedTheme);
  }

  saveTheme(theme: string) {
    localStorage.setItem(this.THEME_KEY, theme);
  }

  setTheme(theme: string) {
    if (theme === 'auto') {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      theme = prefersDark ? 'dark' : 'light';
    }

    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(`${theme}-theme`);
  }

  getSavedTheme(): string {
    return localStorage.getItem(this.THEME_KEY) || 'auto';
  }
}
