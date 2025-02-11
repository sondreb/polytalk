import { test, expect } from '@playwright/test';
import { BlogListComponent } from './blog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

test.describe('BlogListComponent', () => {
  let component: BlogListComponent;
  let fixture: ComponentFixture<BlogListComponent>;

  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, HttpClientTestingModule],
      }).compileComponents();
    });
  });

  test.beforeEach(() => {
    fixture = TestBed.createComponent(BlogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should render loading state initially', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.loading')?.textContent).toContain('Loading posts...');
  });

  // it('should render error state', () => {
  //   component.error = 'Failed to load blog posts. Please try again later.';
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('.error')?.textContent).toContain('Failed to load blog posts. Please try again later.');
  // });

  test('should render blog post summaries', () => {
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

  test('should render empty state when no posts are found', () => {
    component.posts = [];
    component.loading = false;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.empty')?.textContent).toContain('No blog posts found.');
  });
});
