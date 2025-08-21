import { Component } from '@angular/core';
import {RegisteredComponent} from '@builder.io/sdk-angular';

@Component({
  selector: 'gh-product-grid',
  imports: [],
  template: `
    <p>
      product-grid works!
    </p>
  `,
  styles: ``
})
export class ProductGrid {

}

export const PRODUCT_GRID_COMPONENT: RegisteredComponent = {
  component: ProductGrid,
  name: "BuilderProductGridComponent",
  meta: {
    selector: "gh-product-grid",
    standalone: true,
  },
  hideFromInsertMenu: false,
  inputs: [
    {
      name: "pageSize",
      type: "number",
      defaultValue: 12,
    },
    {
      name: "showFilters",
      type: "boolean",
      defaultValue: true,
    },
    {
      name: "showPagination",
      type: "boolean",
      defaultValue: true,
    },
    {
      name: "paginationScrollOffset",
      type: "number",
      defaultValue: 170,
    },
    {
      name: "products",
      type: "list",
      subFields: [
        {
          name: "id",
          type: "string",
        },
        {
          name: "filterKeys",
          type: "list",
          subFields: [
            {
              name: "key",
              type: "string",
            }
          ]
        },
        {
          name: "name",
          type: "string",
        },
        {
          name: "description",
          type: "string",
        },
        {
          name: "image",
          type: "string",
        },
        {
          name: "tagLabels",
          type: "list",
          subFields: [
            {
              name: "label",
              type: "string",
            },
            {
              name: "color",
              type: "string",
            }
          ]
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
          defaultValue: true,
        },
        {
          name: "addToCartLabel",
          type: "string",
          defaultValue: "Add to Cart",
        }
      ],
      defaultValue: []
    },
    {
      name: "filters",
      type: "list",
      subFields: [
        {
          name: "label",
          type: "string"
        },
        {
          name: "defaultActive",
          type: "string",
        },
        {
          name:"options",
          type:"list",
          subFields:[
            {
              name:"label",
              type:"string"
            },
            {
              name:"value",
              type:"string"
            }
          ]
        }
      ],
      defaultValue: []
    }
  ]
}
