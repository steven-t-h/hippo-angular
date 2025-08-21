import {inject, Injectable, resource} from '@angular/core';
import {BrandService} from '../brand/brand.service';
import {LocaleService} from '../locale/locale.service';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';
import {AuthService} from '../auth/auth.service';
import {Product} from './product.model';
import {LanguageService} from '../language/language.service';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private brandService = inject(BrandService)
  private languageService = inject(LanguageService)
  private localeService = inject(LocaleService)
  private authService = inject(AuthService)
  private http = inject(HttpClient)

  /**
   * The `hippoCatalog` resource fetches products based on the current brand, locale, language, and authentication status.
   * As a resource, it automatically updates whenever any of the parameters change.
   * You can access the state of the resource (e.g., loading, error, data) using the `hippoCatalog` signal.
   */
  hippoCatalog = resource({
    // The params value recomputes whenever any read signals change.
    params: () => ({
      brand: this.brandService.brand,
      locale: this.localeService.locale(),
      language: this.languageService.language(),
    }),
    // The resource calls this function every time the `params` value changes.
    loader: ({params}) => {
      if (params.brand) {
        return this.getHippoProducts({
          brand: params.brand.name,
          locale: params.locale.code,
          language: params.language,
        });
      }
      return Promise.resolve([]);
    },
  });


  /**
   * Fetches products from the Hippo Commerce Service based on the provided brand, locale, and language.
   * @param request
   * @private
   */
  private async getHippoProducts(request: {
    brand: string,
    locale: string,
    language: string,
  }): Promise<Product[]> {
    const {brand, locale, language} = request;
    console.log('[Product Service] feed');
    const url = `${environment.commerceApiUrl}/product/feed`
    const credentials = btoa(`${environment.apiUser}:${environment.apiPassword}`)
    try {
      return await firstValueFrom(
        this.http.get<Product[]>(url, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'x-brand': brand,
            'x-locale': locale,
            'x-language': language,
            'Authentication': `Basic ${credentials}`
          },
          credentials: 'include'
        }));
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  }

}
