import {computed, inject, Injectable, signal} from '@angular/core';
import {LocaleService} from '../locale/locale.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private localeService = inject(LocaleService)
  private languageSignal = signal<string>('US')
  language = computed(()=> this.languageSignal())

  availableLanguages = computed<string[]>(() => {
    const locale = this.localeService.locale();
    return locale.availableLanguages
  })

  setLanguage(lang: string): void {
    const currentLanguages = this.availableLanguages();
    const existingLanguage = currentLanguages.find((language) => language === lang);
    if (existingLanguage) {
      this.languageSignal.set(existingLanguage);
    }
  }
}
