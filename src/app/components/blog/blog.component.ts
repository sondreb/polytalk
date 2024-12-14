import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as marked from 'marked';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  posts: { title: string; content: SafeHtml }[] = [];

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    const postsDirectory = 'assets/blog/';
    this.http.get(postsDirectory + 'posts.json').subscribe((posts: any) => {
      posts.forEach((post: any) => {
        this.http.get(postsDirectory + post.file, { responseType: 'text' }).subscribe((content: string) => {
          const htmlContent = marked(content);
          this.posts.push({ title: post.title, content: this.sanitizer.bypassSecurityTrustHtml(htmlContent) });
        });
      });
    });
  }
}
