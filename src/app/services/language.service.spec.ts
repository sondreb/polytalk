import { TestBed } from '@angular/core/testing';
import { LanguageService, Language, LearningContent } from './language.service';
import {
  PREMIUM_CONTENT,
  PREMIUM_NUMBER_KEYS,
  PREMIUM_SENTENCE_KEYS,
  PREMIUM_WORD_KEYS,
} from './premium-content';

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

  it('should keep the free catalog unchanged when premium is off', () => {
    const content = service.getContent('en');
    expect(Object.keys(content?.words ?? {}).length).toBe(22);
    expect(Object.keys(content?.numbers ?? {}).length).toBe(17);
    expect(Object.keys(content?.sentences ?? {}).length).toBe(21);
    expect(content?.words['I']).toBeUndefined();
    expect(content?.numbers['11']).toBeUndefined();
    expect(content?.sentences["What's your name?"]).toBeUndefined();
  });

  it('should merge the extra pack when premium is requested', () => {
    const content = service.getContent('en', true);
    expect(Object.keys(content?.words ?? {}).length).toBe(49);
    expect(Object.keys(content?.numbers ?? {}).length).toBe(32);
    expect(Object.keys(content?.sentences ?? {}).length).toBe(39);
    expect(content?.words['I']).toBe('I');
    expect(content?.numbers['11']).toBe('eleven');
    expect(content?.sentences["What's your name?"]).toBe("What's your name?");
  });

  it('should use the specified Norwegian extra-pack values', () => {
    const content = service.getContent('no', true);
    expect(content?.words['I']).toBe('jeg');
    expect(content?.words['to pay']).toBe('å betale');
    expect(content?.numbers['11']).toBe('elleve');
    expect(content?.numbers['500']).toBe('fem hundre');
    expect(content?.sentences["What's your name?"]).toBe('Hva heter du?');
    expect(content?.sentences['Is this vegetarian?']).toBe('Er dette vegetarisk?');
  });

  it('should provide the extra pack for every language', () => {
    const languages = service.getLanguages();
    expect(languages.length).toBe(39);

    for (const language of languages) {
      const extra = service.getPremiumContent(language.code);
      expect(extra).withContext(language.code).toBeTruthy();
      expect(Object.keys(extra?.words ?? {})).toEqual([...PREMIUM_WORD_KEYS]);
      expect(Object.keys(extra?.numbers ?? {})).toEqual([...PREMIUM_NUMBER_KEYS]);
      expect(Object.keys(extra?.sentences ?? {})).toEqual([
        ...PREMIUM_SENTENCE_KEYS,
      ]);
      expect(PREMIUM_CONTENT[language.code]).toBeTruthy();
    }
  });
});
