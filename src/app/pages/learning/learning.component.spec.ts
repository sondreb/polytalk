import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LearningComponent } from './learning.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LanguageService } from '../../services/language.service';
import { AudioService } from '../../services/audio.service';

describe('LearningComponent', () => {
  let component: LearningComponent;
  let fixture: ComponentFixture<LearningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LearningComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [LanguageService, AudioService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render language selectors', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.language-selector')).toBeTruthy();
  });

  it('should render tabs', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.tabs')).toBeTruthy();
  });

  it('should render content items', () => {
    component.currentItems = [
      { native: 'Hello', translation: 'Hola', key: 'hello' },
    ];
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.item')).toBeTruthy();
  });

  it('should render controls', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.controls')).toBeTruthy();
  });

  it('should render offline controls', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.offline-controls')).toBeTruthy();
  });

  it('should render download button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.download-button')).toBeTruthy();
  });

  it('should render play button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.buttons button')).toBeTruthy();
  });

  it('should render stop button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.buttons button:last-child')).toBeTruthy();
  });

  it('should render settings', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.settings')).toBeTruthy();
  });

  it('should render language header', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.language-header')).toBeTruthy();
  });

  it('should render tabs with correct labels', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const tabs = compiled.querySelectorAll('.tabs button');
    expect(tabs.length).toBe(3);
    expect(tabs[0].textContent).toContain('Words');
    expect(tabs[1].textContent).toContain('Numbers');
    expect(tabs[2].textContent).toContain('Sentences');
  });

  it('should render items with correct content', () => {
    component.currentItems = [
      { native: 'Hello', translation: 'Hola', key: 'hello' },
    ];
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const item = compiled.querySelector('.item');
    expect(item?.querySelector('.native span')?.textContent).toContain('Hello');
    expect(item?.querySelector('.translation span')?.textContent).toContain('Hola');
  });

  it('should render play buttons for items', () => {
    component.currentItems = [
      { native: 'Hello', translation: 'Hola', key: 'hello' },
    ];
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const playButtons = compiled.querySelectorAll('.item .play-button');
    expect(playButtons.length).toBe(2);
  });

  it('should render language selectors with correct options', () => {
    component.availableLanguages = [
      { code: 'en', name: 'English', flag: '🇬🇧', flagImage: '/assets/flags/gb.png' },
      { code: 'es', name: 'Spanish', flag: '🇪🇸', flagImage: '/assets/flags/es.png' },
    ];
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const fromLanguageOptions = compiled.querySelectorAll('.language-selector select')[0].querySelectorAll('option');
    const toLanguageOptions = compiled.querySelectorAll('.language-selector select')[1].querySelectorAll('option');
    expect(fromLanguageOptions.length).toBe(2);
    expect(toLanguageOptions.length).toBe(2);
    expect(fromLanguageOptions[0].textContent).toContain('English');
    expect(toLanguageOptions[1].textContent).toContain('Spanish');
  });
});
