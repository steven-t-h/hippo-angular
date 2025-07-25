import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {
  BuilderContent,
  Content,
  fetchOneEntry,
  getBuilderSearchParams,
  GetContentOptions,
  type RegisteredComponent,
} from '@builder.io/sdk-angular';
import {firstValueFrom} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {CUSTOM_COMPONENTS} from '../builder-registry';
import {Meta, Title} from '@angular/platform-browser';
import {AuthService} from '../../../services/auth/auth.service';


interface BuilderProps {
  canTrack?: boolean;
  apiKey: string;
  model: string;
  content: BuilderContent | null;
  data?: any;
  locale: string;
}

@Component({
  selector: 'gh-cms-page',
  template: `
    @let loggedIn = isLoggedIn();
    @if (content) {
      <section>
        @if (authLoading()){
          <p>Loading...</p>
        } @else {
          <p>Logged In: {{ loggedIn }}</p>
          <button (click)="toggleLogin()">Toggle Login</button>
        }
        <builder-content
          [model]="model"
          [content]="content"
          [apiKey]="apiKey"
          [customComponents]="customComponents"
          [data]="{ isLoggedIn: loggedIn }"
          [locale]="locale"
          [canTrack]="canTrack"
        ></builder-content>
      </section>
    } @else {
      <div>404 - Content not found</div>
    }
  `,
  imports: [
    Content as any // This is a workaround for the fact that Content is not set as a standalone component
  ],
})
export class CmsPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private http = inject(HttpClient);
  private meta = inject(Meta)
  private title = inject(Title)
  private cdr = inject(ChangeDetectorRef);
  private auth = inject(AuthService);

  canTrack: BuilderProps['canTrack'];
  apiKey: BuilderProps['apiKey'] = '';
  model: BuilderProps['model'] = 'page';
  content: BuilderProps['content'] | null = null;
  data: BuilderProps['data'];
  locale: BuilderProps['locale'] = 'en-US';
  customComponents: RegisteredComponent[] = [];
  isLoggedIn = this.auth.isLoggedIn
  authLoading = this.auth.loading;

  toggleLogin = async () => {
    if (this.isLoggedIn()){
      await this.auth.logOut()
    } else {
      await this.auth.logIn();
      await this.handleRouteChange()
    }
  };


  private _httpClientFetch = async (url: string, options: RequestInit) => {
    return firstValueFrom(
      this.http.request<any>(options.method || 'GET', url, {
        body: options.body,
        headers: options.headers as any,
        ...options,
        observe: 'response',
        responseType: 'json',
      })
    ).then((response: HttpResponse<any>) => {
      return {
        ok: response.status >= 200 && response.status < 300,
        status: response.status,
        json: () => Promise.resolve(response.body),
      };
    });
  };

  async ngOnInit(): Promise<void> {
    // Initial load
    await this.handleRouteChange();

    // Listen for route changes
    this.route.url.subscribe(async () => {
      await this.handleRouteChange();
    });
  }

  private async handleRouteChange() {
    const urlPath = this.router.url.split('?')[0] || '';
    console.log('CMS Page URL Path:', urlPath);

    const queryParams = this.route.snapshot.queryParams;
    const searchParams = new URLSearchParams();
    Object.entries(queryParams).forEach(([key, value]) => {
      searchParams.append(key, value as string);
    });

    try {
      const builderProps = await this.getProps({
        apiKey: environment.builderApiKey,
        pathname: urlPath,
        options: getBuilderSearchParams(searchParams),
        fetchOneEntry: (args: GetContentOptions) => {
          return fetchOneEntry({
            ...args,
            //@ts-expect-error builder doesn't type this correctly
            fetch: this._httpClientFetch,
          });
        },
      });

      if (!builderProps) {
        return;
      }

      this.content = builderProps.content;
      this.canTrack = builderProps.canTrack;
      this.apiKey = builderProps.apiKey;
      this.model = builderProps.model;
      this.data = builderProps.data;
      this.locale = builderProps.locale;
      this.customComponents = CUSTOM_COMPONENTS;

      if (this.content) {
        const pageTitle = this.content.data?.title ?? 'Default Title';
        this.title.setTitle(pageTitle);
        this.meta.updateTag({ name: 'description', content: this.content.data?.['description'] || 'Default Description' });
        this.meta.updateTag({ name: 'og:title', content: pageTitle });
        this.meta.updateTag({ name: 'og:description', content: this.content.data?.['description'] || 'Default Description' });
        this.meta.updateTag({ name: 'og:image', content: this.content.data?.['seoImage'] || '' });
      }

      // Trigger change detection to avoid ExpressionChangedAfterItHasBeenCheckedError
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error handling route change:', error);
    }
  }


  async getProps(args: {
    pathname: string;
    fetchOneEntry: (opts: any) => Promise<BuilderContent | null>;
    options?: any;
    data?: any;
    apiKey: string;
  }){
    const {
      pathname: _pathname,
      data = 'mock',
      fetchOneEntry,
      options,
      apiKey,
    } = args;
    return {
      model: 'page',
      apiKey: apiKey,
      content: await fetchOneEntry({
        model: 'page',
        apiKey: apiKey,
        userAttributes: { urlPath: _pathname },
        locale: 'en-US',
        data: {
          isLoggedIn: this.isLoggedIn(),
        },
        options,
      }),
      canTrack: false,
      data,
      locale: 'en-US',
    }
  }
}

