import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlogPostComponent } from './blog-post.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DomSanitizer } from '@angular/platform-browser';

describe('BlogPostComponent', () => {
  let component: BlogPostComponent;
  let fixture: ComponentFixture<BlogPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [DomSanitizer],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render loading state initially', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.loading')?.textContent).toContain('Loading post...');
  });

  // it('should render error state', () => {
  //   component.error = 'Failed to load blog post. Please try again later.';
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('.error')?.textContent).toContain('Failed to load blog post. Please try again later.');
  // });

  it('should render blog post content', () => {
    component.content = '<p>Test blog post content</p>';
    component.loading = false;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.post-content')?.innerHTML).toContain('Test blog post content');
  });

  it('should render blog post metadata', () => {
    component.metadata = {
      title: 'Test Blog Post',
      date: '2023-01-01',
      description: 'Test description',
      tags: ['test', 'blog'],
    };
    component.loading = false;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.post-header time')?.textContent).toContain('Jan 1, 2023');
    expect(compiled.querySelector('.tag')?.textContent).toContain('test');
  });
});
