import { Component } from '@angular/core';
import {RegisteredComponent} from '@builder.io/sdk-angular';

@Component({
  selector: 'gh-event-button',
  imports: [],
  template: `
    <p>
      event-button works!
    </p>
  `,
  styles: ``
})
export class EventButton {

}

export const EVENT_BUTTON_COMPONENT: RegisteredComponent = {
  component: EventButton,
  name: "EventButtonComponent",
  meta: {
    selector: "gh-event-button",
    standalone: true,
  },
  inputs: [
    {
      name: "event",
      type: "Function",
    },
    {
      name: "label",
      type: "string",
    }
  ]
}
