import {computed, inject, Injectable, signal} from '@angular/core';
import {BuilderContent, fetchOneEntry, isEditing, isPreviewing} from '@builder.io/sdk-angular';
import {LocaleService} from '../locale/locale.service';
import {LanguageService} from '../language/language.service';

interface CmsContentRequest {
  apiKey: string;
  urlPath?: string;
  model?: string;
  userAttributes?: Record<string, any>;
  options?: Record<string, any>;
}

@Injectable({
  providedIn: 'root'
})
export class CmsService {
  private localeService = inject(LocaleService);
  private languageService = inject(LanguageService);
  private builderContent = signal<BuilderContent | null>(null)
  private builderContentLoading = signal<boolean>(false);
  private lastRequest = signal<CmsContentRequest | null>(null);

  content = computed<BuilderContent | null>(() => {
    return this.builderContent();
  });
  contentLoading = computed<boolean>(() => {
    return this.builderContentLoading();
  });

  async fetchContent(request: CmsContentRequest) {
    const previewOrEdit = isPreviewing() || isEditing()
    const locale = this.localeService.locale();
    const language = this.languageService.language();
    this.builderContentLoading.set(true);
    this.builderContent.set(null);
    return fetchOneEntry({
      apiKey: request.apiKey,
      model: request.model || 'page',
      userAttributes: {
        urlPath: request.urlPath,
        ...request.userAttributes
      },
      options: {
        ...request.options,
        cachebust: previewOrEdit
      },
      includeUnpublished: previewOrEdit,
      locale: language + '-' + locale.code
    }).then((content) => {
      this.builderContent.set(content);
      this.builderContentLoading.set(false);
    }).catch((error) => {
      console.error('Error fetching content:', error);
      this.builderContent.set(null);
      this.builderContentLoading.set(false);
    })
  }
}
