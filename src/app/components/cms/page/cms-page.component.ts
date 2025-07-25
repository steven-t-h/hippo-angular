import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
// fails because type imports cannot be injected
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
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
    @if (content) {
      <builder-content
        [model]="model"
        [content]="content"
        [apiKey]="apiKey"
        [customComponents]="customComponents"
        [data]="data"
        [locale]="locale"
        [canTrack]="canTrack"
      ></builder-content>
    } @else {
      <div>404 - Content not found</div>
    }
  `,
  imports: [
    Content as any // This is a workaround for the fact that Content is not set as a standalone component
  ],
})
export class CmsPageComponent {
  protected canTrack: BuilderProps['canTrack'];
  protected apiKey: BuilderProps['apiKey'] = '';
  protected model: BuilderProps['model'] = 'page';
  protected content: BuilderProps['content'] | null = null;
  protected data: BuilderProps['data'];
  protected locale: BuilderProps['locale'] = 'en-US';
  protected customComponents: RegisteredComponent[] = [];

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private http = inject(HttpClient);

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

  async ngOnInit() {
    const urlPath = this.router.url.split('?')[0] || '';
    const queryParams = this.route.snapshot.queryParams;
    const searchParams = new URLSearchParams();
    Object.entries(queryParams).forEach(([key, value]) => {
      searchParams.append(key, value as string);
    });

    const builderProps = await getProps({
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
    this.customComponents = CUSTOM_COMPONENTS
  }
}

const getProps = async (args: {
  pathname: string;
  fetchOneEntry: (opts: any) => Promise<BuilderContent | null>;
  options?: any;
  data?: any;
  apiKey: string;
}) => {
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
      options,
    }),
    canTrack: false,
    data,
    locale: 'en-US',
  }
};
