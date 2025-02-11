import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LanguageSelectionComponent } from './language-selection.component';
import { LanguageService } from '../../services/language.service';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('LanguageSelectionComponent', () => {
  let component: LanguageSelectionComponent;
  let fixture: ComponentFixture<LanguageSelectionComponent>;
  let languageService: LanguageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, CommonModule, NoopAnimationsModule],
      providers: [LanguageService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageSelectionComponent);
    component = fixture.componentInstance;
    languageService = TestBed.inject(LanguageService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render language cards', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const languageCards = compiled.querySelectorAll('.language-card');
    expect(languageCards.length).toBeGreaterThan(0);
  });

  // it('should navigate to the correct route on language card click', () => {
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   const languageCard = compiled.querySelector('.language-card') as HTMLElement;
  //   languageCard.click();
  //   fixture.detectChanges();
  //   expect(component.onLanguageSelect).toHaveBeenCalled();
  // });

  it('should load languages from the service', () => {
    const languages = languageService.getLanguages();
    expect(component.languages).toEqual(languages);
  });

  // it('should save selected from language to localStorage', () => {
  //   const fromLanguageCode = 'es';
  //   component.fromLanguageCode = fromLanguageCode;
  //   component.ngOnInit();
  //   expect(localStorage.getItem('polytalk-from-language')).toBe(fromLanguageCode);
  // });
});
