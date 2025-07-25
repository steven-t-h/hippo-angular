import { Component } from '@angular/core';
import {RegisteredComponent} from '@builder.io/sdk-angular';

@Component({
  selector: 'gh-register-form',
  imports: [],
  template: `
    <p>
      register-form works!
    </p>
  `,
  styles: ``
})
export class RegisterForm {

}

export const REGISTER_FORM_COMPONENT: RegisteredComponent = {
  component: RegisterForm,
  name: "Register Form",
  meta: {
    selector: "gh-register-form",
    standalone: true,
  },
  inputs: [
    {
      name: "acceptCheckBox",
      type: "object",
      subFields: [
        {
          name: "label",
          type: "html",
        },
        {
          name: "separatorText",
          type: "html",
        },
        {
          name: "termsText",
          type: "string",
        },
        {
          name: "termsLink",
          type: "url",
        },
        {
          name: "privacyText",
          type: "string",
        },
        {
          name: "privacyLink",
          type: "url",
        },
      ],
      folded: true,
    },
  ]
}
