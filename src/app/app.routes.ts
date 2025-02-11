import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LanguageSelectionComponent } from './pages/language-selection/language-selection.component';
import { LearningComponent } from './pages/learning/learning.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { BlogListComponent } from './pages/blog/blog.component';
import { BlogPostComponent } from './pages/blog/blog-post.component';
import { HomeRootComponent } from './components/root/root.component';

export const routes: Routes = [
  { path: '', component: HomeRootComponent },
  { path: 'home', component: HomeComponent },
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
