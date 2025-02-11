import { test, expect } from '@playwright/test';
import { LanguageSelectionComponent } from './language-selection.component';
import { LanguageService } from '../../services/language.service';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

test.describe('LanguageSelectionComponent', () => {
  let component: LanguageSelectionComponent;
  let fixture: ComponentFixture<LanguageSelectionComponent>;
  let languageService: LanguageService;

  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, CommonModule, NoopAnimationsModule],
        providers: [LanguageService],
      }).compileComponents();
    });
  });

  test.beforeEach(() => {
    fixture = TestBed.createComponent(LanguageSelectionComponent);
    component = fixture.componentInstance;
    languageService = TestBed.inject(LanguageService);
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should render language cards', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const languageCards = compiled.querySelectorAll('.language-card');
    expect(languageCards.length).toBeGreaterThan(0);
  });

  test('should load languages from the service', () => {
    const languages = languageService.getLanguages();
    expect(component.languages).toEqual(languages);
  });
});
