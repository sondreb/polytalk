import { test, expect } from '@playwright/test';
import { ThemeService } from './theme.service';

test.describe('ThemeService', () => {
  let service: ThemeService;

  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      TestBed.configureTestingModule({});
      service = TestBed.inject(ThemeService);
    });
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('should save and retrieve theme correctly', () => {
    service.saveTheme('dark');
    expect(service.getSavedTheme()).toBe('dark');
  });

  test('should apply theme correctly', () => {
    spyOn(service, 'setTheme');
    service.applyTheme();
    expect(service.setTheme).toHaveBeenCalled();
  });

  test('should set theme to dark', () => {
    service.setTheme('dark');
    expect(document.body.classList.contains('dark-theme')).toBeTrue();
    expect(document.documentElement.style.getPropertyValue('color-scheme')).toBe('dark');
  });

  test('should set theme to light', () => {
    service.setTheme('light');
    expect(document.body.classList.contains('light-theme')).toBeTrue();
    expect(document.documentElement.style.getPropertyValue('color-scheme')).toBe('light');
  });

  // it('should set theme to auto and apply dark if prefers-color-scheme is dark', () => {
  //   spyOn(window.matchMedia('(prefers-color-scheme: dark)'), 'matches').and.returnValue(true);
  //   service.setTheme('auto');
  //   expect(document.body.classList.contains('dark-theme')).toBeTrue();
  // });

  // it('should set theme to auto and apply light if prefers-color-scheme is light', () => {
  //   spyOn(window.matchMedia('(prefers-color-scheme: dark)'), 'matches').and.returnValue(false);
  //   service.setTheme('auto');
  //   expect(document.body.classList.contains('light-theme')).toBeTrue();
  // });
});
