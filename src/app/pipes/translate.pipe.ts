import { Pipe, PipeTransform, inject } from '@angular/core';
import { TranslationService } from '../services/translation.service';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false,
})
export class TranslatePipe implements PipeTransform {
  private translationService = inject(TranslationService);

  transform(key: string): string {
    // Access languageChange signal to trigger re-evaluation on language switch
    this.translationService.languageChange();
    return this.translationService.translate(key);
  }
}
