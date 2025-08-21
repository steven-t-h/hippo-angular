import {computed, inject, Injectable, signal} from '@angular/core';
import {BrandService} from '../brand/brand.service';
import {Locale} from './locale.model';
import {firstValueFrom} from 'rxjs';

const defaultLocale: Locale = {
  name: "United States",
  code: "US",
  currencyCode: "USD",
  availableLanguages: [
    "en"
  ],
  defaultLanguage: "en"
}

@Injectable({
  providedIn: 'root'
})
export class LocaleService {
  private brandService = inject(BrandService);
  private localeSignal = signal<Locale>(defaultLocale)
  locale = computed(() => this.localeSignal())

  availableLocales = computed<Locale[]>(() => {
    const brandConfig = this.brandService.brand
    if (brandConfig) {
      return brandConfig.availableLocales;
    }
    return [defaultLocale]
  })

  setLocaleByCode(code: string): void {
    const currentLocales = this.availableLocales();
    const existingLocale = currentLocales.find((locale) => locale.code === code);
    if (existingLocale) {
      this.localeSignal.set(existingLocale);
    }
  }

  setLocaleByCurrencyCode(currencyCode: string): void {
    const currentLocales = this.availableLocales();
    const existingLocale = currentLocales.find((locale) => locale.currencyCode === currencyCode);
    if (existingLocale) {
      this.localeSignal.set(existingLocale);
    }
  }
}
