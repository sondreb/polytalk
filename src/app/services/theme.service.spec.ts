import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save and retrieve theme correctly', () => {
    service.saveTheme('dark');
    expect(service.getSavedTheme()).toBe('dark');
  });

  it('should apply theme correctly', () => {
    spyOn(service, 'setTheme');
    service.applyTheme();
    expect(service.setTheme).toHaveBeenCalled();
  });

  it('should set theme to dark', () => {
    service.setTheme('dark');
    expect(document.body.classList.contains('dark-theme')).toBeTrue();
    expect(document.documentElement.style.getPropertyValue('color-scheme')).toBe('dark');
  });

  it('should set theme to light', () => {
    service.setTheme('light');
    expect(document.body.classList.contains('light-theme')).toBeTrue();
    expect(document.documentElement.style.getPropertyValue('color-scheme')).toBe('light');
  });

  it('should set theme to auto and apply dark if prefers-color-scheme is dark', () => {
    spyOn(window.matchMedia('(prefers-color-scheme: dark)'), 'matches').and.returnValue(true);
    service.setTheme('auto');
    expect(document.body.classList.contains('dark-theme')).toBeTrue();
  });

  it('should set theme to auto and apply light if prefers-color-scheme is light', () => {
    spyOn(window.matchMedia('(prefers-color-scheme: dark)'), 'matches').and.returnValue(false);
    service.setTheme('auto');
    expect(document.body.classList.contains('light-theme')).toBeTrue();
  });
});
