import { test, expect } from '@playwright/test';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { RouterTestingModule } from '@angular/router/testing';

test.describe('AppComponent', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      TestBed.configureTestingModule({
        imports: [
          AppComponent,
          RouterTestingModule,
          ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: false, // Disable during tests
          }),
        ],
      }).compileComponents();
    });
  });

  test('should create the app', async ({ page }) => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  test('should render title', async ({ page }) => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.brand')?.textContent).toContain('PolyTalk.Me');
  });
});
