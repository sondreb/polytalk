import { test, expect } from '@playwright/test';
import { HomeComponent } from './home.component';
import { RouterTestingModule } from '@angular/router/testing';

test.describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule],
      }).compileComponents();
    });
  });

  test.beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should render title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Learn Any Language with PolyTalk');
  });

  test('should render start learning button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.cta-button.primary')?.textContent).toContain('Start Learning');
  });

  test('should render read blog button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.cta-button.secondary')?.textContent).toContain('Read Blog');
  });

  test('should render features section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.features')?.textContent).toContain('Words');
    expect(compiled.querySelector('.features')?.textContent).toContain('Numbers');
    expect(compiled.querySelector('.features')?.textContent).toContain('Sentences');
  });

  test('should render store banner', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.store-banner')?.textContent).toContain('Get PolyTalk for Windows');
  });

  test('should render disclaimer', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.disclaimer')?.textContent).toContain('Please note that this application may contain errors in translations');
  });
});
