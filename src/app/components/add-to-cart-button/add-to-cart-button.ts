import { Component } from '@angular/core';
import {RegisteredComponent} from '@builder.io/sdk-angular';

@Component({
  selector: 'gh-add-to-cart-button',
  imports: [],
  template: `
    <p>
      add-to-cart-button works!
    </p>
  `,
  styles: ``
})
export class AddToCartButton {

}


export const ADD_TO_CART_BUTTON_COMPONENT: RegisteredComponent = {
  component: AddToCartButton,
  name: "AddToCartButtonComponent",
  meta: {
    selector: "gh-add-to-cart-button",
    standalone: true,
  },
  inputs: [
    {
      name: "productIds",
      type: "list",
      subFields: [
        {
          name: "id",
          type: "string",
        },
        {
          name: "quantity",
          type: "number",
        },
        {
          name: "isSubscription",
          type: "boolean",
        }
      ]
    },
    {
      name: "label",
      type: "string",
      defaultValue: "ADD TO CART",
    }
  ]
}
