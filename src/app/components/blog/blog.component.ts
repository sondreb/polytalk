import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';

interface BlogPost {
  title: string;
  date: string;
  description: string;
  tags: string[];
  file: string;
  featured_image?: string;
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="blog-container">

    <div>
        <script type="text/javascript">
            aclib.runBanner({
                zoneId: '9196990',
            });
        </script>
    </div>

      @if (loading) {
        <div class="loading">Loading posts...</div>
      } @else if (error) {
        <div class="error">{{error}}</div>
      } @else if (posts.length === 0) {
        <div class="empty">No blog posts found.</div>
      } @else {
        @for (post of posts; track post.title) {
          <article class="blog-summary">
            @if (post.featured_image) {
              <div class="thumbnail">
                <img [src]="post.featured_image + '?auto=format&fit=crop&w=600&h=350'" [alt]="post.title">
              </div>
            }
            <header>
              <h2><a [routerLink]="['/blog', post.file.replace('.md', '')]">{{post.title}}</a></h2>
              <time>{{post.date | date:'mediumDate'}}</time>
            </header>
            <p class="description">{{post.description}}</p>
            <div class="tags">
              @for (tag of post.tags; track tag) {
                <span class="tag">{{tag}}</span>
              }
            </div>
            <a class="read-more" [routerLink]="['/blog', post.file.replace('.md', '')]">Read more...</a>
          </article>
        }
      }
    </div>
  `,
  styles: [`
    .blog-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    .blog-summary {
      margin-bottom: 2rem;
      padding: 2rem;
      border-radius: 12px;
      background: var(--surface-color);
      color: var(--text-color);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .blog-summary:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    .blog-summary h2 {
      margin-bottom: 0.5rem;
    }
    .blog-summary h2 a {
      color: var(--primary-color);
      text-decoration: none;
      font-weight: 600;
    }
    .blog-summary h2 a:hover {
      color: var(--primary-color-dark);
    }
    .description {
      color: var(--text-color);
      margin: 1rem 0;
      line-height: 1.6;
    }
    .tags {
      margin: 1rem 0;
    }
    .tag {
      background: var(--surface-color);
      padding: 0.3rem 0.8rem;
      border-radius: 20px;
      margin-right: 0.5rem;
      font-size: 0.9rem;
      color: var(--text-light);
      display: inline-block;
      margin-bottom: 0.5rem;
      border: 1px solid var(--text-light);
    }
    .read-more {
      display: inline-block;
      padding: 0.5rem 1.5rem;
      background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
      color: var(--text-light);
      text-decoration: none;
      border-radius: 24px;
      font-weight: 500;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .read-more:hover {
      transform: scale(1.05);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
      text-decoration: none;
    }
    time {
      color: var(--text-light);
      font-size: 0.9rem;
      display: block;
      margin-bottom: 1rem;
    }
    .loading, .error, .empty {
      text-align: center;
      padding: 3rem;
      color: var(--text-light);
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    .error {
      color: #d32f2f;
      background: #ffebee;
    }
    .thumbnail {
      margin: -2rem -2rem 1.5rem -2rem;
      border-radius: 12px 12px 0 0;
      overflow: hidden;
      height: 250px;
    }
    .thumbnail img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
    .blog-summary:hover .thumbnail img {
      transform: scale(1.05);
    }
  `]
})
export class BlogListComponent implements OnInit {
  posts: BlogPost[] = [];
  loading = true;
  error: string | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  async loadPosts(): Promise<void> {
    try {
      const response = await fetch('assets/blog/posts.json');
      if (!response.ok) throw new Error('Failed to load posts index');
      this.posts = await response.json();
      this.loading = false;
    } catch (error) {
      this.error = 'Failed to load blog posts. Please try again later.';
      this.loading = false;
      console.error('Error loading blog posts:', error);
    }
  }
}
