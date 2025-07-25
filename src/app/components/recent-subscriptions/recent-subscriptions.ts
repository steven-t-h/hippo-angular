import { Component } from '@angular/core';

@Component({
  selector: 'gh-recent-subscriptions',
  imports: [],
  template: `
    <p>
      recent-subscriptions works!
    </p>
  `,
  styles: ``
})
export class RecentSubscriptions {

}

export const RECENT_SUBSCRIPTIONS_COMPONENT = {
  component: RecentSubscriptions,
  name: "RecentSubscriptionsComponent",
  meta: {
    selector: "gh-recent-subscriptions",
    standalone: true,
  },
  inputs: [
    {
      name: "noSubscriptionsContent",
      type: "uiBlocks",
      defaultValue: [
        {
          '@type': '@builder.io/sdk:Element',
          component: {
            name: 'Text',
            options: {
              text: 'No subscriptions found.',
            },
          },
        },
      ],
    },
    {
      name: "manageSubscriptionsButtonText",
      type: "text",
      defaultValue: "Manage Subscriptions",
    }
  ],
  shouldReceiveBuilderProps: {
    builderBlock: true,
    builderComponents: true,
    builderContext: true,
  },
};
