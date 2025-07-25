import { Component } from '@angular/core';
import {RegisteredComponent} from '@builder.io/sdk-angular';

@Component({
  selector: 'gh-route-button',
  imports: [],
  template: `
    <p>
      route-button works!
    </p>
  `,
  styles: ``
})
export class RouteButton {

}

export const ROUTE_BUTTON_COMPONENT: RegisteredComponent = {
  component: RouteButton,
  name: "RouteButtonComponent",
  meta: {
    selector: "gh-route-button",
    standalone: true,
  },
  inputs: [
    {
      name: "route",
      type: "string",
    },
    {
      name: "label",
      type: "string",
    }
  ]
}
