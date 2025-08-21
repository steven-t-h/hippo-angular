import {ResolveFn} from '@angular/router';
import {getBuilderSearchParams} from '@builder.io/sdk-angular';
import {environment} from '../../environments/environment';
import {inject} from '@angular/core';
import {CmsService} from '../services/cms/cms.service';
import {BrandService} from '../services/brand/brand.service';

export const cmsPageResolver: ResolveFn<void> = async (route, state) => {
  const urlPath = `/${route.url.join('/')}`;
  const cmsService = inject(CmsService)
  const brandService = inject(BrandService)
  const brand = await brandService.getBrand()
  const searchParams = getBuilderSearchParams(route.queryParams);
  await cmsService.fetchContent({
    apiKey: environment.builderApiKey,
    urlPath,
    options: {
      ...searchParams,
    },
  });
};
