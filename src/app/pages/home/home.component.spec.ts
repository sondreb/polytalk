import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Learn Any Language with PolyTalk');
  });

  it('should render start learning button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.cta-button.primary')?.textContent).toContain('Start Learning');
  });

  it('should render read blog button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.cta-button.secondary')?.textContent).toContain('Read Blog');
  });

  it('should render features section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.features')?.textContent).toContain('Words');
    expect(compiled.querySelector('.features')?.textContent).toContain('Numbers');
    expect(compiled.querySelector('.features')?.textContent).toContain('Sentences');
  });

  it('should render store banner', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.store-banner')?.textContent).toContain('Get PolyTalk for Windows');
  });

  it('should render disclaimer', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.disclaimer')?.textContent).toContain('Please note that this application may contain errors in translations');
  });
});
