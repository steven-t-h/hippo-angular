import {Component, computed, inject} from '@angular/core';
import {Content, type RegisteredComponent,} from '@builder.io/sdk-angular';
import {environment} from '../../../../environments/environment';
import {CUSTOM_COMPONENTS} from '../builder-registry';
import {AuthService} from '../../../services/auth/auth.service';
import {CmsService} from '../../../services/cms/cms.service';
import {LocaleService} from '../../../services/locale/locale.service';
import {LanguageService} from '../../../services/language/language.service';
import {ProductService} from '../../../services/product/product.service';


@Component({
  selector: 'gh-cms-page',
  template: `
    @let loggedIn = isLoggedIn();
    @if (hippoCatalog.isLoading()) {
      <p class="text-center text-2xl">Loading catalog...</p>
    } @else if (hippoCatalog.error()) {
      <p class="text-center text-2xl">Error loading catalog: {{ hippoCatalog.error() }}</p>
    } @else {
      <p class="text-center text-2xl">Catalog loaded successfully: {{ hippoCatalog.value()?.length ?? 0 }} Products</p>
    }
    @if (content()) {
      <section>
        <p>Logged In: {{ loggedIn }}</p>
        <button (click)="toggleLogin()">Toggle Login</button>
        <builder-content
          [model]="model"
          [content]="content()"
          [apiKey]="apiKey"
          [customComponents]="customComponents"
          [data]="{ isLoggedIn: loggedIn }"
          [locale]="locale()"
          [canTrack]="canTrack"
        ></builder-content>
      </section>
    } @else if (contentLoading()) {
      <div class="w-fit mx-auto my-10 min-h-screen">
        <p class="text-center text-2xl">Loading...</p>
      </div>
    } @else {
      <div class="w-fit mx-auto my-10 min-h-screen">
        <p class="text-center text-2xl">No content found</p>
      </div>
    }
  `,
  imports: [
    Content as any,
    // This is a workaround for the fact that Content is not set as a standalone component
  ],
})
export class CmsPageComponent {
  private localeService = inject(LocaleService);
  private languageService = inject(LanguageService);
  private auth = inject(AuthService);
  private cmsService = inject(CmsService)
  private productService = inject(ProductService);

  canTrack = true;
  apiKey = environment.builderApiKey;
  model = 'page';
  customComponents: RegisteredComponent[] = CUSTOM_COMPONENTS;

  content = this.cmsService.content
  contentLoading = this.cmsService.contentLoading;
  hippoCatalog = this.productService.hippoCatalog;
  locale = computed(() => {
    return this.languageService.language().toLowerCase() + '-' + this.localeService.locale().code;
  })
  isLoggedIn = this.auth.isLoggedIn
  authLoading = this.auth.loading;

  toggleLogin = async () => {
    if (this.isLoggedIn()){
      await this.auth.logOut()
    } else {
      await this.auth.logIn();
    }
  };
}

