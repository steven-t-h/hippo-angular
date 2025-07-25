import { Component } from '@angular/core';
import {RegisteredComponent} from '@builder.io/sdk-angular';

@Component({
  selector: 'gh-link-block',
  imports: [],
  template: `
    <p>
      link-block works!
    </p>
  `,
  styles: ``
})
export class LinkBlock {

}

export const LINK_BLOCK_COMPONENT: RegisteredComponent = {
  component: LinkBlock,
  name: "LinkBlockComponent",
  hideFromInsertMenu: true,
  meta: {
    selector: "gh-link-block",
    standalone: true,
  },
  inputs: [
    {
      name: "href",
      type: "string",
      defaultValue: "/",
    },
    {
      name: "target",
      type: "string",
      defaultValue: "_self",
    },
    {
      name: "children",
      type: "uiBlocks",
      defaultValue: [
        {
          "@type": "@builder.io/sdk:Element",
          "component": {
            "name": "Text",
            "options": {
              "text": "<p><strong style=\"font-size: 16px; color: rgb(41, 69, 184);\">with a FREE My Health Account</strong></p>"
            }
          }
        }
      ]
    }
  ],
  shouldReceiveBuilderProps: {
    builderBlock: true,
    builderComponents: true,
    builderContext: true,
  },
}
