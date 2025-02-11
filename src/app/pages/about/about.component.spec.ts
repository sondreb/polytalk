import { test, expect } from '@playwright/test';
import { AboutComponent } from './about.component';

test.describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      TestBed.configureTestingModule({
        imports: [AboutComponent],
      }).compileComponents();
    });
  });

  test.beforeEach(() => {
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should render title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('About PolyTalk');
  });

  test('should render mission section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Our Mission');
  });

  test('should render features list', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const features = compiled.querySelectorAll('ul li');
    expect(features.length).toBeGreaterThan(0);
  });

  test('should render contact section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2:last-of-type')?.textContent).toContain('Contact');
  });
});
