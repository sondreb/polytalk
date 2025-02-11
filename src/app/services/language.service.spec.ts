import { test, expect } from '@playwright/test';
import { LanguageService, Language, LearningContent } from './language.service';

test.describe('LanguageService', () => {
  let service: LanguageService;

  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      TestBed.configureTestingModule({}).compileComponents();
    });
    service = TestBed.inject(LanguageService);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('should return a sorted list of languages', () => {
    const languages: Language[] = service.getLanguages();
    expect(languages).toBeTruthy();
    expect(languages.length).toBeGreaterThan(0);
    expect(languages).toEqual(languages.sort((a, b) => a.name.localeCompare(b.name)));
  });

  test('should return learning content for a valid language code', () => {
    const content: LearningContent | undefined = service.getContent('en');
    expect(content).toBeTruthy();
    expect(content?.words).toBeDefined();
    expect(content?.numbers).toBeDefined();
    expect(content?.sentences).toBeDefined();
  });

  test('should return undefined for an invalid language code', () => {
    const content: LearningContent | undefined = service.getContent('invalid-code');
    expect(content).toBeUndefined();
  });
});
