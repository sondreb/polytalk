import { test, expect } from '@playwright/test';
import { TermsComponent } from './terms.component';

test.describe('TermsComponent', () => {
  let component: TermsComponent;
  let fixture: ComponentFixture<TermsComponent>;

  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      TestBed.configureTestingModule({
        imports: [TermsComponent],
      }).compileComponents();
    });
  });

  test.beforeEach(() => {
    fixture = TestBed.createComponent(TermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should render title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Terms of Service');
  });

  test('should render last updated date', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p')?.textContent).toContain('Last updated:');
  });

  test('should render acceptance of terms section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('1. Acceptance of Terms');
  });

  test('should render changes to terms section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2:nth-of-type(2)')?.textContent).toContain('2. Changes to Terms');
  });

  test('should render usage license section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2:nth-of-type(3)')?.textContent).toContain('3. Usage License');
  });

  test('should render user conduct section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2:nth-of-type(4)')?.textContent).toContain('4. User Conduct');
  });

  test('should render termination section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2:nth-of-type(5)')?.textContent).toContain('5. Termination');
  });
});
