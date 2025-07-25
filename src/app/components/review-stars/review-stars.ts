import {Component, computed, input, TemplateRef, ViewChild} from '@angular/core';
import {NgTemplateOutlet} from '@angular/common';

@Component({
  selector: 'gh-review-stars',
  imports: [
    NgTemplateOutlet
  ],
  template: `
    @if (reviewCount() > 0 && rating() > 3){
      <span [style]="{ height: starHeight }" class="reviews_stars flex h-5 justify-start items-center">
         @for (type of starTypes; track type) {
           <ng-container [ngTemplateOutlet]="getTemplate(type)"></ng-container>
         }
      </span>
    }
    <!-- Templates for different star types -->
    <ng-template #fullStar>
      <svg class="max-h-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path [attr.fill]="resolvedFillColor()" d="M10,15.3L4.8,18l1-5.8L1.6,8.1l5.8-0.8L10,2l2.6,5.3l5.8,0.8l-4.2,4.1l1,5.8L10,15.3z"/>
      </svg>
    </ng-template>
    <ng-template #halfStar>
      <svg class="max-h-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path [attr.fill]="resolvedFillColor()" d="M10,15.3L4.8,18l1-5.8L1.6,8.1l5.8-0.8L10,2V15.3z"/>
        <path fill="#E2E2E2" d="M10,2l2.6,5.3l5.8,0.8l-4.2,4.1l1,5.8L10,15.3V2z"/>
      </svg>
    </ng-template>
    <ng-template #quarterStar>
      <svg class="max-h-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path fill="#E2E2E2" d="M6.5,7.4l0.9-0.1L10,2l2.6,5.3l5.8,0.8l-4.2,4.1l1,5.8L10,15.3l-3.5,1.8L6.5,7.4z"/>
        <path [attr.fill]="resolvedFillColor()" d="M6.5,17.1L4.8,18l1-5.8L1.6,8.1l4.9-0.7L6.5,17.1z"/>
      </svg>
    </ng-template>
    <ng-template #threeQuarterStar>
      <svg class="max-h-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path [attr.fill]="resolvedFillColor()" d="M13.5,17.1L10,15.3L4.8,18l1-5.8L1.6,8.1l5.8-0.8L10,2l2.6,5.3l0.9,0.1L13.5,17.1z"/>
        <path fill="#E2E2E2" d="M13.5,7.4l4.9,0.7l-4.2,4.1l1,5.8l-1.7-0.9L13.5,7.4z"/>
      </svg>
    </ng-template>
    <ng-template #emptyStar>
      <svg class="max-h-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path fill="#E2E2E2" d="M10,15.3L4.8,18l1-5.8L1.6,8.1l5.8-0.8L10,2l2.6,5.3l5.8,0.8l-4.2,4.1l1,5.8L10,15.3z"/>
      </svg>
    </ng-template>
  `,
  styles: ``
})
export class ReviewStars {

  reviewCount = input<number>(0);
  rating = input<number>(0);
  starHeight = input<string>('18px');
  readonly fillColor = input<string>('#892100');

  @ViewChild('fullStar', { static: true }) fullStar!: TemplateRef<any>;
  @ViewChild('halfStar', { static: true }) halfStar!: TemplateRef<any>;
  @ViewChild('quarterStar', { static: true }) quarterStar!: TemplateRef<any>;
  @ViewChild('threeQuarterStar', { static: true }) threeQuarterStar!: TemplateRef<any>;
  @ViewChild('emptyStar', { static: true }) emptyStar!: TemplateRef<any>;


  // override the value if it comes as an empty string or undefined
  readonly resolvedFillColor = computed(() => {
    const value = this.fillColor();
    const trimmed = value?.trim();
    const isFallback = !trimmed;
    return isFallback ? '#892100' : value;
  });

  get starTypes(): string[] {
    const full = Math.floor(this.rating());
    const remainder = this.rating() % 1;
    let partial: string | null = null;

    if (remainder >= 0.75) partial = 'threeQuarter';
    else if (remainder >= 0.5) partial = 'half';
    else if (remainder >= 0.25) partial = 'quarter';

    const stars: string[] = Array(full).fill('full');

    if (partial) stars.push(partial);

    while (stars.length < 5) {
      stars.push('empty');
    }

    return stars;
  }

  getTemplate(type: string): TemplateRef<any> {
    switch (type) {
      case 'full': return this.fullStar;
      case 'half': return this.halfStar;
      case 'quarter': return this.quarterStar;
      case 'threeQuarter': return this.threeQuarterStar;
      default: return this.emptyStar;
    }
  }
}
