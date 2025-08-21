import {inject, Injectable} from '@angular/core';
import {BrandSetting} from './brand.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {firstValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  private http = inject(HttpClient)

  brand: BrandSetting | undefined = undefined;

  async getBrand() {
    if (this.brand) return;
    console.log('[BrandService] init called');
    this.brand = await this.loadBrandConfig()
    return this.brand;
  }

  private async loadBrandConfig() {
    // Simulate an API call to fetch brand configuration
    console.log('[BrandService] Load brandConfig')
    const credentials = btoa(
      `${environment.apiUser}:${environment.apiPassword}`
    )
    const headers = {
      'X-Brand': environment.brand,
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/json'
    }
    console.log('[BrandService] Load brandConfig', headers);
    return await firstValueFrom(this.http.get<BrandSetting>(
        environment.commerceApiUrl + '/config',
        {
          headers: headers,
          credentials: 'include'
        }
      )
    )
  }

}
