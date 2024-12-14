import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';

interface BlogPostMetadata {
  title: string;
  date: string;
  description: string;
  tags: string[];
}

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="blog-container">
      @if (loading) {
      <div class="loading">Loading post...</div>
      } @else if (error) {
      <div class="error">{{ error }}</div>
      } @else {
      <article class="blog-post">
        <a class="back-link" routerLink="/blog">← Back to Blog</a>
        <div class="post-content" [innerHTML]="content"></div>
        @if (metadata) {
        <header class="post-header">
          <!-- <h1>{{metadata.title}}</h1> -->
          <time>{{ metadata.date | date : 'mediumDate' }}</time>
          <!-- <p class="description">{{metadata.description}}</p> -->
          <div class="tags">
            @for (tag of metadata.tags; track tag) {
            <span class="tag">{{ tag }}</span>
            }
          </div>
        </header>
        }
      </article>
      }
    </div>
  `,
  styles: [
    `
      .blog-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
      }
      .blog-post {
        background: white;
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        line-height: 1.6;
      }
      .back-link {
        display: inline-block;
        padding: 0.5rem 1.5rem;
        background: linear-gradient(
          135deg,
          var(--gradient-start),
          var(--gradient-end)
        );
        color: white;
        text-decoration: none;
        border-radius: 24px;
        font-weight: 500;
        transition: transform 0.2s, box-shadow 0.2s;
      }
      .back-link:hover {
        transform: scale(1.05);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        text-decoration: none;
      }
      .loading,
      .error {
        text-align: center;
        padding: 3rem;
        background: white;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        color: #666;
      }
      .error {
        color: #d32f2f;
        background: #ffebee;
      }

      .post-header {
      }
      .post-header h1 {
        margin: 1rem 0;
        color: var(--primary-color);
      }
      .post-header time {
        color: #666;
        font-size: 0.9rem;
        display: block;
        margin-bottom: 1rem;
      }
      .post-header .description {
        color: #555;
        font-size: 1.1rem;
        margin: 1rem 0;
      }
      .tags {
        margin: 1rem 0;
      }
      .tag {
        background: #f0f0f0;
        padding: 0.3rem 0.8rem;
        border-radius: 20px;
        margin-right: 0.5rem;
        font-size: 0.9rem;
        color: #666;
        display: inline-block;
        margin-bottom: 0.5rem;
        border: 1px solid #e0e0e0;
      }

      :host ::ng-deep .post-content {
        font-size: 1.1rem;
        color: #333;
      }
      :host ::ng-deep .post-content h1,
      :host ::ng-deep .post-content h2,
      :host ::ng-deep .post-content h3 {
        color: var(--primary-color);
        margin: 1.5rem 0 1rem;
      }
      :host ::ng-deep .post-content p {
        margin-bottom: 1.2rem;
      }
      :host ::ng-deep .post-content a {
        color: var(--primary-color);
        text-decoration: none;
      }
      :host ::ng-deep .post-content a:hover {
        text-decoration: underline;
      }
      :host ::ng-deep .post-content img {
        max-width: 100%;
        height: auto;
        border-radius: 8px;
        margin: 1.5rem auto;
        display: block;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }
      :host ::ng-deep .post-content p img {
        margin: 1.5rem auto;
        display: block;
      }
      :host ::ng-deep .post-content img:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        transition: box-shadow 0.3s ease;
      }
    `,
  ],
})
export class BlogPostComponent implements OnInit {
  content: SafeHtml = '';
  metadata: BlogPostMetadata | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.loadPost(slug + '.md');
    } else {
      this.router.navigate(['/blog']);
    }
  }

  async loadPost(filename: string): Promise<void> {
    try {
      const response = await fetch(`assets/blog/${filename}`);
      if (!response.ok) throw new Error('Failed to load post');

      const content = await response.text();

      // Parse frontmatter with more precise regex
      const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
      if (match) {
        const [_, frontmatter, markdown] = match;
        this.metadata = this.parseFrontmatter(frontmatter);
        // Only render the content after the frontmatter
        const htmlContent = await marked(markdown.trim());
        this.content = this.sanitizer.bypassSecurityTrustHtml(htmlContent);
      } else {
        const htmlContent = await marked(content);
        this.content = this.sanitizer.bypassSecurityTrustHtml(htmlContent);
      }

      this.loading = false;
    } catch (error) {
      this.error = 'Failed to load blog post. Please try again later.';
      this.loading = false;
      console.error('Error loading blog post:', error);
    }
  }

  private parseFrontmatter(frontmatter: string): BlogPostMetadata {
    const lines = frontmatter.split(/\r?\n/);
    const metadata: Partial<BlogPostMetadata> = {};

    for (const line of lines) {
      // Skip empty lines
      if (!line.trim()) continue;

      const colonIndex = line.indexOf(':');
      if (colonIndex === -1) continue;

      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();

      // Handle array values (tags)
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1);
      }

      switch (key) {
        case 'tags':
          // Split by comma, handle quoted values
          metadata.tags = value
            .split(',')
            .map((tag) => tag.trim().replace(/^["']|["']$/g, ''))
            .filter((tag) => tag.length > 0);
          break;
        case 'title':
          metadata.title = value.replace(/^["']|["']$/g, '');
          break;
        case 'date':
          metadata.date = value;
          break;
        case 'description':
          metadata.description = value.replace(/^["']|["']$/g, '');
          break;
      }
    }

    if (
      !metadata.title ||
      !metadata.date ||
      !metadata.description ||
      !metadata.tags
    ) {
      throw new Error('Invalid frontmatter: missing required fields');
    }

    return metadata as BlogPostMetadata;
  }
}
