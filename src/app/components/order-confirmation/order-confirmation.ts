import { Component } from '@angular/core';
import {RegisteredComponent} from '@builder.io/sdk-angular';

@Component({
  selector: 'gh-order-confirmation',
  imports: [],
  template: `
    <p>
      order-confirmation works!
    </p>
  `,
  styles: ``
})
export class OrderConfirmation {

}

export const ORDER_CONFIRMATION_COMPONENT: RegisteredComponent = {
  component: OrderConfirmation,
  name: "OrderConfirmationComponent",
  meta: {
    selector: "gh-order-confirmation",
    standalone: true,
  },
  inputs: [
    {
      name: 'sectionStyles',
      type: 'object',
      subFields: [
        {
          name: 'backgroundColor',
          type: 'color',
          defaultValue: '#e8f4ff',
        },
        {
          name: 'padding',
          type: 'string',
        },
        {
          name: 'margin',
          type: 'string',
        },
        {
          name: 'border',
          type: 'string',
        },
        {
          name: 'borderRadius',
          type: 'string',
        },
      ],
      folded: true,
    },
    {
      name: 'MBGImage',
      type: 'file',
    },
    {
      name: 'MBGText',
      type: 'html',
      defaultValue: 'Our Happy-Healthy Guarantee If you don\'t see improvements, send back your supply & we\'ll refund 100% of your purchase price',
    },
  ]
}
