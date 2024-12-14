import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LanguageSelectionComponent } from './components/language-selection/language-selection.component';
import { LearningComponent } from './components/learning/learning.component';
import { SettingsComponent } from './components/settings/settings.component';
import { BlogListComponent } from './components/blog/blog.component';
import { BlogPostComponent } from './components/blog/blog-post.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'languages', component: LanguageSelectionComponent },
  { path: 'learn/:fromLanguage/:toLanguage/:category', component: LearningComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'blog', component: BlogListComponent },
  { path: 'blog/:slug', component: BlogPostComponent },
  {
    path: 'privacy',
    loadComponent: () => import('./pages/privacy/privacy.component').then(m => m.PrivacyComponent)
  },
  {
    path: 'terms',
    loadComponent: () => import('./pages/terms/terms.component').then(m => m.TermsComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent)
  }
];
