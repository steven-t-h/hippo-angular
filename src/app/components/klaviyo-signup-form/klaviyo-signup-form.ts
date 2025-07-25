import { Component } from '@angular/core';
import {RegisteredComponent} from '@builder.io/sdk-angular';

@Component({
  selector: 'gh-klaviyo-signup-form',
  imports: [],
  template: `
    <p>
      klaviyo-signup-form works!
    </p>
  `,
  styles: ``
})
export class KlaviyoSignupForm {

}

export const KLAVIYO_SIGNUP_FORM_COMPONENT: RegisteredComponent = {
  component: KlaviyoSignupForm,
  name: "KlaviyoSignupFormComponent",
  meta: {
    selector: "gh-klaviyo-signup-form",
    standalone: true,
  },
  inputs: [
    {
      name: "listId",
      type: "string",
      required: true,
    },
    {
      name: "aboveFormContent",
      type: "uiBlocks",
      defaultValue: [
        {
          "@type": "@builder.io/sdk:Element",
          "layerName": "Above Form Content Box",
          "children": [
            {
              "@type": "@builder.io/sdk:Element",
              "component": {
                "name": "Text",
                "options": {
                  "text": "<p>Join Our Newsletter</p>"
                }
              },
              "responsiveStyles": {
                "large": {
                  "fontSize": "20px",
                  "fontWeight": "600",
                  "color": "#FFFFFF",
                  "marginBottom": "10px",
                }
              }
            },
          ],
        },
      ],
    },
    {
      name: "firstNamePlaceholder",
      type: "string",
      defaultValue: "First Name",
      required: true,
    },
    {
      name: "inputCSSProperties",
      type: "object",
      folded: true,
      subFields: [
        { name: 'padding', type: 'string' },
        { name: 'margin', type: 'string' },
        { name: 'textAlign', type: 'string' },
        { name: 'border', type: 'string' },
        { name: 'borderRadius', type: 'string' },
        { name: 'gap', type: 'string' },
        { name: 'color', type: 'color' },
        { name: 'backgroundColor', type: 'color' },
        { name: 'fontSize', type: 'string' },
        { name: 'fontWeight', type: 'string' },
        { name: 'fontFamily', type: 'string' },
        { name: 'letterSpacing', type: 'string' },
        { name: 'height', type: 'string' },
      ],
      defaultValue: {
        padding: '0px 0px 0px 16px',
        margin: '0',
        textAlign: 'left',
        border: '1px solid rgb(255, 255, 255)',
        borderRadius: '999px',
        color: 'rgb(0, 0, 0)',
        backgroundColor: 'rgb(255, 255, 255)',
        fontSize: '16px',
        fontWeight: '400',
        fontFamily: '"Red Hat Text", Arial, "Helvetica Neue", Helvetica, sans-serif',
        letterSpacing: '1px',
        height: '48px',
      },
      required: false,
    },
    {
      name: "buttonCSSProperties",
      type: "object",
      folded: true,
      subFields: [
        { name: 'background', type: 'color' },
        { name: 'border', type: 'string' },
        { name: 'borderRadius', type: 'string' },
        { name: 'color', type: 'color' },
        { name: 'fontFamily', type: 'string' },
        { name: 'fontSize', type: 'string' },
        { name: 'fontWeight', type: 'string' },
        { name: 'letterSpacing', type: 'string' },
        { name: 'lineHeight', type: 'string' },
        { name: 'padding', type: 'string' },
        { name: 'textAlign', type: 'string' },
        { name: 'height', type: 'string' },
      ],
      defaultValue: {
        background: 'rgba(0, 255, 255, 0)',
        border: '2px solid rgb(255, 255, 255)',
        borderRadius: '999999px',
        color: 'rgb(255, 255, 255)',
        fontFamily: '"Red Hat Text", Arial, "Helvetica Neue", Helvetica, sans-serif',
        fontSize: '13px',
        fontWeight: '700',
        letterSpacing: '2px',
        lineHeight: '1',
        padding: '0px 10px',
        textAlign: 'center',
        height: '48px',
      },
      required: false,
    },
    {
      name: "buttonHoverCSSProperties",
      type: "object",
      folded: true,
      subFields: [
        { name: 'background', type: 'color' },
        { name: 'border', type: 'string' },
        { name: 'color', type: 'color' },
      ],
      defaultValue: {
        background: '#192C7C',
      },
      required: false,
    },
    {
      name: "emailPlaceholder",
      type: "string",
      defaultValue: "Email Address",
      required: true,
    },
    {
      name: "submitButtonText",
      type: "html",
      defaultValue: "SUBSCRIBE",
      required: true,
    },
    {
      name: "belowFormContent",
      type: "uiBlocks",
      defaultValue: [
        {
          "@type": "@builder.io/sdk:Element",
          "layerName": "Below Form Content Box",
          "children": [
            {
              "@type": "@builder.io/sdk:Element",
              "component": {
                "name": "Text",
                "options": {
                  "text": "<p>Join the revolution in holistic health and wellness with Gundry MD, your trusted source for the latest research, insights, and tips on achieving optimal well-being.</p>"
                }
              },
              "responsiveStyles": {
                "large": {
                  "color": "#FFFFFF",
                  "marginBottom": "10px",
                }
              }
            },
          ]
        },
      ],
    },
    {
      name: "successContent",
      type: "uiBlocks",
      defaultValue: [
        {
          "@type": "@builder.io/sdk:Element",
          "layerName": "Below Form Content Box",
          "children": [
            {
              "@type": "@builder.io/sdk:Element",
              "component": {
                "name": "Text",
                "options": {
                  "text": "<p>Thanks for Signing up!</p>"
                }
              },
              "responsiveStyles": {
                "large": {
                  "color": "#FFFFFF",
                  "fontSize": "28px",
                  "marginBottom": "10px",
                  "textAlign": "center",
                  "padding": "0px 20px",
                }
              }
            },
          ]
        },
      ],
    },
  ],
  shouldReceiveBuilderProps: {
    builderBlock: true,
    builderComponents: true,
    builderContext: true,
  },
};
