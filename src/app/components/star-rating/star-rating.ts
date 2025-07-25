import {Component, input} from '@angular/core';
import {RegisteredComponent} from '@builder.io/sdk-angular';
import {ReviewStars} from '../review-stars/review-stars';

@Component({
  selector: 'gh-star-rating',
  imports: [
    ReviewStars
  ],
  template: `
    <main>
      <section>
        @if (reviewCount() > 0 && rating() > 3) {
          <div class="flex h-6 justify-start items-center">
            <gh-review-stars
              [reviewCount]="reviewCount()"
              [rating]="rating()"
              [fillColor]="fillColor()">
            </gh-review-stars>
            <div class="ml-2 cursor-pointer text-[#0b7bc1] hover:text-[#192c7c]">
              {{ reviewCount() }} Reviews
            </div>
          </div>
        }
      </section>
    </main>
  `,
})
export class StarRating {
  rating = input<number>(0);
  reviewCount = input<number>(0);
  fillColor = input<string>('#892100');
}

export const STAR_RATING_COMPONENT: RegisteredComponent = {
  component: StarRating,
  name: "StarRatingComponent",
  meta: {
    selector: "gh-star-rating",
    standalone: true,
  },
  inputs: [
    {
      name: "rating",
      type: "number",
    },
    {
      name: "reviewCount",
      type: "number",
    },
    {
      name: "fillColor",
      type: "color",
      defaultValue: "#892100",
    }
  ]
}
