import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TermsComponent } from './terms.component';

describe('TermsComponent', () => {
  let component: TermsComponent;
  let fixture: ComponentFixture<TermsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Terms of Service');
  });

  it('should render last updated date', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p')?.textContent).toContain('Last updated:');
  });

  it('should render acceptance of terms section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('1. Acceptance of Terms');
  });

  it('should render changes to terms section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2:nth-of-type(2)')?.textContent).toContain('2. Changes to Terms');
  });

  it('should render usage license section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2:nth-of-type(3)')?.textContent).toContain('3. Usage License');
  });

  it('should render user conduct section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2:nth-of-type(4)')?.textContent).toContain('4. User Conduct');
  });

  it('should render termination section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2:nth-of-type(5)')?.textContent).toContain('5. Termination');
  });
});
