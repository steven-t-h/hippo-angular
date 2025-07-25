import {ResolveFn} from '@angular/router';
import {BuilderContent, fetchOneEntry, getBuilderSearchParams} from '@builder.io/sdk-angular';
import {environment} from '../../environments/environment';

export const cmsPageResolver: ResolveFn<BuilderContent | null> = (route, state) => {
  const urlPath = `/${route.url.join('/')}`;
  const searchParams = getBuilderSearchParams(route.queryParams);

  return fetchOneEntry({
    apiKey: environment.builderApiKey,
    model: 'page',
    userAttributes: {
      urlPath,
    },
    options: searchParams,
  });
};
