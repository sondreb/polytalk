import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlogListComponent } from './blog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BlogListComponent', () => {
  let component: BlogListComponent;
  let fixture: ComponentFixture<BlogListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlogListComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render loading state initially', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.loading')?.textContent).toContain('Loading posts...');
  });

  it('should render error state', () => {
    component.error = 'Failed to load blog posts. Please try again later.';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.error')?.textContent).toContain('Failed to load blog posts. Please try again later.');
  });

  it('should render blog post summaries', () => {
    component.posts = [
      {
        title: 'Test Blog Post',
        date: '2023-01-01',
        description: 'Test description',
        tags: ['test', 'blog'],
        file: 'test-blog-post.md',
      },
    ];
    component.loading = false;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.blog-summary h2 a')?.textContent).toContain('Test Blog Post');
    expect(compiled.querySelector('.blog-summary time')?.textContent).toContain('Jan 1, 2023');
    expect(compiled.querySelector('.blog-summary .description')?.textContent).toContain('Test description');
    expect(compiled.querySelector('.blog-summary .tag')?.textContent).toContain('test');
  });

  it('should render empty state when no posts are found', () => {
    component.posts = [];
    component.loading = false;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.empty')?.textContent).toContain('No blog posts found.');
  });
});
