import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LanguageSelectionComponent } from './components/language-selection/language-selection.component';
import { LearningComponent } from './components/learning/learning.component';
import { SettingsComponent } from './components/settings/settings.component';
import { BlogComponent } from './components/blog/blog.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'languages', component: LanguageSelectionComponent },
  { path: 'learn/:fromLanguage/:toLanguage/:category', component: LearningComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'blog', component: BlogComponent }
];
