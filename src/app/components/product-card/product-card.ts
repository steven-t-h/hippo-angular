import { Component } from '@angular/core';
import {RegisteredComponent} from '@builder.io/sdk-angular';

@Component({
  selector: 'gh-product-card',
  imports: [],
  template: `
    <p>
      Product Card Placeholder Component
    </p>
  `,
  styles: ``
})
export class ProductCard {

}

export const PRODUCT_CARD_COMPONENT: RegisteredComponent = {
  component: ProductCard,
  name: "ProductCardComponent",
  meta: {
    selector: "gh-product-card",
    standalone: true,
  },
  inputs: [
    {
      name: "productId",
      type: "string",
    },
    {
      name: "tagLabels",
      type: "list",
      subFields: [
        {
          name: "label",
          type: "string",
        }, {
          name: "color",
          type: "string",
        }
      ]
    },
    {
      name: "image",
      type: "string",
    },
    {
      name: "name",
      type: "string",
      defaultValue: "Product Name",
    },
    {
      name: "description",
      type: "string",
      defaultValue: "Product Description",
    },
    {
      name: "rating",
      type: "number",
    },
    {
      name: "reviewCount",
      type: "number",
    },
    {
      name: "guestPriceLabel",
      type: "string",
      defaultValue: "Guest Price",
    },
    {
      name: "priceLabel",
      type: "string",
      defaultValue: "Member Price",
    },
    {
      name: "productSlug",
      type: "string",
    },
    {
      name: "productLinkLabel",
      type: "string",
    },
    {
      name: "showAddToCartButton",
      type: "boolean",
    },
    {
      name: "addToCartLabel",
      type: "string",
    }
    ,
    {
      name: "showLoginButton",
      type: "boolean",
    },
    {
      name: "loginButtonText",
      type: "string",
    }
  ],
}
