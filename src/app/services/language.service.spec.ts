import { TestBed } from '@angular/core/testing';
import { LanguageService, Language, LearningContent } from './language.service';

describe('LanguageService', () => {
  let service: LanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a sorted list of languages', () => {
    const languages: Language[] = service.getLanguages();
    expect(languages).toBeTruthy();
    expect(languages.length).toBeGreaterThan(0);
    expect(languages).toEqual(languages.sort((a, b) => a.name.localeCompare(b.name)));
  });

  it('should return learning content for a valid language code', () => {
    const content: LearningContent | undefined = service.getContent('en');
    expect(content).toBeTruthy();
    expect(content?.words).toBeDefined();
    expect(content?.numbers).toBeDefined();
    expect(content?.sentences).toBeDefined();
  });

  it('should return undefined for an invalid language code', () => {
    const content: LearningContent | undefined = service.getContent('invalid-code');
    expect(content).toBeUndefined();
  });
});
