import { Component } from '@angular/core';
import {RegisteredComponent} from '@builder.io/sdk-angular';

@Component({
  selector: 'gh-recent-orders',
  imports: [],
  template: `
    <p>
      recent-orders works!
    </p>
  `,
  styles: ``
})
export class RecentOrders {

}

export const RECENT_ORDERS_COMPONENT: RegisteredComponent = {
  component: RecentOrders,
  name: "RecentOrdersComponent",
  meta: {
    selector: "gh-recent-orders",
    standalone: true,
  },
  inputs: [
    {
      name: "listStyles",
      type: "object",
      subFields: [
        {
          name: "display",
          type: "string",
          defaultValue: "grid",
        },
        {
          name: "gap",
          type: "string",
          defaultValue: "16px",
        },
        {
          name: "margin",
          type: "string",
          defaultValue: "0 0 16px 0",
        }
      ],
      folded: true,
    },
    {
      name: "listItemHeadingStyles",
      type: "object",
      subFields: [
        {
          name: "fontSize",
          type: "string",
          defaultValue: "20px",
        },
        {
          name: "fontWeight",
          type: "string",
          defaultValue: "600",
        },
      ],
      folded: true,
    },
  ]
}
