import { Component } from '@angular/core';
import {RegisteredComponent} from '@builder.io/sdk-angular';

@Component({
  selector: 'gh-fbt-carousel',
  imports: [],
  template: `
    <p>
      fbt-carousel works!
    </p>
  `,
  styles: ``
})
export class FbtCarousel {

}

export const FBT_CAROUSEL_COMPONENT: RegisteredComponent = {
  component: FbtCarousel,
  name: "FbtCarouselBuilderComponent",
  friendlyName: "FBT Carousel",
  meta: {
    selector: "fbt-carousel-builder",
    standalone: true,
  },
  inputs: [
    {
      name: "products",
      type: "list",
      required: true,
      copyOnAdd: false,
      subFields: [
        {
          name: "product",
          type: "reference",
          model: "Product",
        }
      ]
    },
    {
      name: "header",
      type: "html",
      defaultValue: "You May Also Like",
      helperText: "Header text for the carousel"
    },
    {
      name: "hideVipPrice",
      type: "boolean",
      defaultValue: false,
      helperText: "Hide VIP price display"
    },
    {
      name: "standardPriceText",
      type: "html",
      defaultValue: "Your Price:",
      helperText: "Text to display for Standard price"
    },
    {
      name: "vipPriceText",
      type: "html",
      defaultValue: "VIP Account Price:",
      helperText: "Text to display for VIP price"
    }
  ],
  shouldReceiveBuilderProps: {
    builderBlock: true,
    builderComponents: true,
    builderContext: true,
  },
}
