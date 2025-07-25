import { Component } from '@angular/core';
import {RegisteredComponent} from '@builder.io/sdk-angular';

@Component({
  selector: 'gh-swiper-slider',
  imports: [],
  template: `
    <p>
      swiper-slider works!
    </p>
  `,
  styles: ``
})
export class SwiperSlider {

}

export const SWIPER_SLIDER_COMPONENT: RegisteredComponent = {
  component: SwiperSlider,
  name: "SwiperSliderComponent",
  friendlyName: "Swiper Slider",
  defaultStyles: {
    marginTop: "20px",
    marginBottom: "20px",
  },
  meta: {
    selector: "gh-swiper-slider",
    standalone: true,
  },
  inputs: [
    {
      name: "swiperContainerClass",
      type: "string",
      helperText: "CSS class for the swiper container.",
    },
    {
      name: "swiperOptions",
      type: "json",
      helperText: "Swiper options in JSON format. See https://swiperjs.com/swiper-api#parameters for more details.",
      defaultValue: {
        "pagination": {
          "type": "bullets",
          "dynamicBullets": true,
          "clickable": true,
          "dynamicMainBullets": 3
        },
        "slidesPerView": 1,
        "spaceBetween": 20,
        "loop": true,
        "breakpoints": {
          "640": {
            "slidesPerView": 2
          }
        }
      },
    },
    {
      name: "showNavigationArrows",
      type: "boolean",
      defaultValue: true,
      helperText: "This will show/hide the navigation arrows"
    },
    {
      name: 'slides',
      type: 'list',
      helperText: "Slides for the swiper slider.",
      subFields: [
        {
          name: 'blocks',
          type: 'uiBlocks',
          hideFromUI: true,
          defaultValue: [
            {
              '@type': '@builder.io/sdk:Element',
              component: {
                name: 'Text',
                options: {
                  text: 'Add your slide content.',
                },
              },
            },
          ],
        },
      ],
    },
    {
      name: "prevButtonContent",
      type: "html",
      helperText: "Content for the previous button.",
      required: false,
    },
    {
      name: "nextButtonContent",
      type: "html",
      helperText: "Content for the next button.",
      required: false,
    },
    {
      name: "swiperThumbContainerClass",
      type: "string",
      helperText: "CSS class for the swiper thumbs container.",
      required: false,
    },
    {
      name: "swiperThumbOptions",
      type: "json",
      helperText: "Swiper options in JSON format. See https://swiperjs.com/swiper-api#parameters for more details.",
      required: false,
    },
    {
      name: 'thumbSlides',
      type: 'list',
      helperText: "Slides for use with the thumb gallery style. https://swiperjs.com/demos#thumbs-gallery",
      subFields: [
        {
          name: 'blocks',
          type: 'uiBlocks',
          hideFromUI: true,
          defaultValue: [
            {
              '@type': '@builder.io/sdk:Element',
              component: {
                name: 'Text',
                options: {
                  text: 'Add your thumb slide content.',
                },
              },
            },
          ],
        },
      ],
    },
  ],
  shouldReceiveBuilderProps: {
    builderBlock: true,
    builderComponents: true,
    builderContext: true,
  },
}
