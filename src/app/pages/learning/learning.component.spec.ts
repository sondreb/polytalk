import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LearningComponent } from './learning.component';
import { LanguageService } from '../../services/language.service';
import { AudioService } from '../../services/audio.service';

describe('LearningComponent', () => {
  let component: LearningComponent;
  let fixture: ComponentFixture<LearningComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, LearningComponent],
      providers: [LanguageService, AudioService],
    }).compileComponents();

    fixture = TestBed.createComponent(LearningComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the language header and selectors', () => {
    expect(element.querySelector('.language-header')).toBeTruthy();
    expect(element.querySelectorAll('.language-selector select').length).toBe(2);
    expect(element.querySelector('.switch-button')).toBeTruthy();
  });

  it('should render one tab per category', () => {
    const tabs = element.querySelectorAll('.tabs button');
    expect(tabs.length).toBe(component.tabs.length);
    expect(tabs[0].textContent).toContain('Words');
    expect(tabs[1].textContent).toContain('Numbers');
    expect(tabs[2].textContent).toContain('Sentences');
  });

  it('should mark the active tab', () => {
    component.category.set('numbers');
    fixture.detectChanges();

    const active = element.querySelector('.tabs button.active');
    expect(active?.textContent).toContain('Numbers');
  });

  it('should render items with both languages and play buttons', () => {
    component.currentItems.set([
      { native: 'Hello', translation: 'Hola', key: 'hello' },
    ]);
    fixture.detectChanges();

    const item = element.querySelector('.item');
    expect(item).toBeTruthy();
    expect(item?.querySelector('.native span')?.textContent).toContain('Hello');
    expect(item?.querySelector('.translation span')?.textContent).toContain(
      'Hola'
    );
    expect(item?.querySelectorAll('.play-button').length).toBe(2);
  });

  it('should render the transport bar with playback controls', () => {
    const buttons = element.querySelectorAll('.transport .buttons button');
    expect(buttons.length).toBe(4);
    expect(element.querySelector('.options-button')).toBeTruthy();
  });

  it('should keep skip and stop disabled while idle', () => {
    const buttons = Array.from(
      element.querySelectorAll<HTMLButtonElement>('.transport .buttons button')
    );

    expect(buttons[0].disabled).toBeTrue();
    expect(buttons[1].disabled).toBeFalse();
    expect(buttons[2].disabled).toBeTrue();
    expect(buttons[3].disabled).toBeTrue();
  });

  it('should render language options in both selectors', () => {
    component.availableLanguages.set([
      { code: 'en', name: 'English', flag: '🇬🇧', flagImage: '/assets/flags/gb.png' },
      { code: 'es', name: 'Spanish', flag: '🇪🇸', flagImage: '/assets/flags/es.png' },
    ]);
    fixture.detectChanges();

    const selects = element.querySelectorAll('.language-selector select');
    const fromOptions = selects[0].querySelectorAll('option');
    const toOptions = selects[1].querySelectorAll('option');

    expect(fromOptions.length).toBe(2);
    expect(toOptions.length).toBe(2);
    expect(fromOptions[0].textContent).toContain('English');
    expect(toOptions[1].textContent).toContain('Spanish');
  });

  it('should only render the options sheet when opened', () => {
    expect(element.querySelector('.sheet')).toBeFalsy();

    component.showOptions.set(true);
    fixture.detectChanges();

    expect(element.querySelector('.sheet')).toBeTruthy();
    expect(element.querySelectorAll('.setting-row').length).toBe(4);
    expect(element.querySelectorAll('.toggle-row').length).toBe(2);
    expect(element.querySelector('.download-button')).toBeTruthy();
  });

  it('should never lower repeat counters below one', () => {
    component.wordRepeat.set(1);
    component.loopRepeat.set(1);

    component.decrementValue('wordRepeat');
    component.decrementValue('loopRepeat');

    expect(component.wordRepeat()).toBe(1);
    expect(component.loopRepeat()).toBe(1);
  });

  it('should swap the language direction', () => {
    component.availableLanguages.set([
      { code: 'en', name: 'English', flag: '🇬🇧', flagImage: '/assets/flags/gb.png' },
      { code: 'es', name: 'Spanish', flag: '🇪🇸', flagImage: '/assets/flags/es.png' },
    ]);
    component.fromLanguageCode.set('en');
    component.toLanguageCode.set('es');

    component.switchLanguages();

    expect(component.fromLanguageCode()).toBe('es');
    expect(component.toLanguageCode()).toBe('en');
  });
});
