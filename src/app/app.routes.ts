import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LanguageSelectionComponent } from './components/language-selection/language-selection.component';
import { LearningComponent } from './components/learning/learning.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'languages', component: LanguageSelectionComponent },
  { path: 'learn/:fromLanguage/:toLanguage/:category', component: LearningComponent }
];
