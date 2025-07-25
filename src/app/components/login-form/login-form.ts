import { Component } from '@angular/core';
import {RegisteredComponent} from '@builder.io/sdk-angular';

@Component({
  selector: 'gh-login-form',
  imports: [],
  template: `
    <p>
      login-form works!
    </p>
  `,
  styles: ``
})
export class LoginForm {

}

export const LOGIN_FORM_COMPONENT: RegisteredComponent = {
  component: LoginForm,
  name: "Login Form",
  meta: {
    selector: "gh-login-form",
    standalone: true,
  },
  inputs: []
}
