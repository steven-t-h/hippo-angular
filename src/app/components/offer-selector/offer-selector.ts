import { Component } from '@angular/core';
import {RegisteredComponent} from '@builder.io/sdk-angular';

@Component({
  selector: 'gh-offer-selector',
  imports: [],
  template: `
    <p>
      offer-selector works!
    </p>
  `,
  styles: ``
})
export class OfferSelector {

}

export const OFFER_SELECTOR_COMPONENT: RegisteredComponent = {
  component: OfferSelector,
  name: "OfferSelectorComponent",
  friendlyName: 'Offer Selector',
  defaults: {
    bindings: {
      "component.options.productSlug": "state.product.data.gh.slug",
    },
  },
  meta: {
    selector: "gh-offer-selector",
    standalone: true,
  },
  inputs: [
    {
      name: 'productSlug',
      type: 'string',
      required: true,
      helperText: "Slug of the product to display offers for. If not provided, productId is used.",
      friendlyName: 'Slug',
    },
    {
      name: "productFlavors",
      friendlyName: 'Flavors / Options',
      type: "list",
      defaultValue: [],
      required: false,
      subFields: [
        {
          type: "string",
          name: "slug",
          friendlyName: 'Slug',
        },
        {
          type: "string",
          name: "productTitle",
        },
      ]
    },
    {
      name: "flavorSelectorOptions",
      type: "object",
      required: false,
      folded: true,
      subFields: [
        {
          type: "string",
          name: "label",
        },
      ],
    },
    {
      name: "actionButtonLabel",
      type: "string",
      defaultValue: "ADD TO CART",
    },
    {
      name: "subscriptionOfferText",
      type: "string",
      defaultValue: `Or $PRICE when you subscribe & save`,
      helperText: "Text to show for subscription offer. Use $PRICE placeholder for the price.",
    },
    {
      name: "memberOfferText",
      type: "string",
      defaultValue: "Or pay member price of",
    },
    {
      name: "subscriptionToggleText",
      type: "string",
      defaultValue: "Subscribe & save",
    }, {
      name: "otpToggleText",
      type: "string",
      defaultValue: "Single purchase",
    },
    {
      name: "bestSellerImage",
      type: "file",
      defaultValue: "https://cdn.gundrymd.com/wp-content/uploads/2024/03/icon-best-seller-badge-3x.png",
    },
    {
      name: "bestValueImage",
      type: "file",
      defaultValue: "https://cdn.gundrymd.com/wp-content/uploads/2024/03/icon-best-value-badge-3x.png",
    },
    {
      name: "showSavings",
      type: "boolean",
      defaultValue: true,
    },
    {
      name: "savingsType",
      type: "string",
      enum: ["percentage", "dollar"],
      defaultValue: "dollar",
    },
    {
      name: "showMemberPriceMessage",
      type: "boolean",
      defaultValue: true,
    },
    {
      name: "showSubscriptionPriceMessage",
      type: "boolean",
      defaultValue: true,
    },
    {
      name: "signupOfferCSSProperties",
      type: "object",
      folded: true,
      subFields: [
        {
          name: 'padding',
          type: 'string',
        },
        {
          name: 'margin',
          type: 'string',
        },
        {
          name: 'textAlign',
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
        {
          name: 'gap',
          type: 'string',
        },
        {
          name: 'color',
          type: 'string',
        },
      ],
      defaultValue: {
        padding: '16px',
        margin: '0',
        textAlign: 'center',
        border: '2px solid #B9C9EE',
        borderRadius: '20px',
        gap: '10px',
        color: '#2945B8',
      },
    },
    {
      name: "signupOfferPriceCSSProperties",
      type: "object",
      folded: true,
      subFields: [
        {
          name: 'color',
          type: 'string',
        },
        {
          name: 'fontSize',
          type: 'string',
        },
        {
          name: 'fontWeight',
          type: 'string',
        },
      ],
      defaultValue: {
        color: '#2945B8',
        fontSize: '34px',
        fontWeight: 'bold',
      },
    },
    {
      name: "signupOfferPriceCSSPropertiesAdditional",
      type: "json",
      helperText: "Additional CSS properties to apply to the signup offer price.",
    },
    {
      name: "signupOfferCSSPropertiesAdditional",
      type: "json",
      helperText: "Additional CSS properties to apply to the signup offer block.",
    },
    {
      name: "signupOfferBlocks",
      type: "uiBlocks",
      helperText: "Content to show when not logged in.",
      defaultValue:  [],
    },
    {
      name: "scrollToTopOffset",
      type: "number",
      defaultValue: 170,
      helperText: "height of the header to scroll to the top of the offer selector",
    },
    {
      name: "scrollButtonText",
      type: "html",
      defaultValue: `<span class="material-icons">keyboard_arrow_up</span> Back to top`,
    },
  ],
  shouldReceiveBuilderProps: {
    builderBlock: true,
    builderComponents: true,
    builderContext: true,
  },
}
