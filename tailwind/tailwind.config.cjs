/** @type {import('tailwindcss').Config} */
import tailwindTypographyPlugin from './tailwind-typography-plugin.cjs';
import tailwindComponentsPlugin from './tailwind-components-plugin.cjs';

module.exports = {
  content: [
    "./src/**/*.{html,ts,json}"
  ],
  theme: {
    fontFamily: {
      sans: 'Red Hat Text, sans-serif',
      display: 'Red Hat Display, sans-serif',
      serif: 'Lora, serif',
      title: 'Lora, serif'
    },
    extend: {
      borderRadius: {
        // TO DELETE
          loginCard: '40px',
        // END TO DELETE
        inputPrimary: '10px',
      },
      colors: {
        brandPrimary: '#2945b8',
        brandPrimary2: '#b9c9ee',
        brandPrimary3: '#192c7c',
        brandSecondary: '#c2e329',
        brandSecondary2: '#892100',
        brandSecondary3: '#2945B8',
        primaryTextColor: '#13161D',
        linkColor: '#2945B8',
        errorColor: '#da0f0f',
        warningColor: '#fbc02d',
        successColor: '#2F8000',
        // TO DELETE
          headerBackgroundColor: '#ffffff',
          headerTextColor: '#000000',
          headerDropDownBGColor: '#52744b',
          headerDropDownTextColor: '#FFFFFF',
          cartCountBgColor: '#52744b',
          cartCountTextColor: '#FFFFFF',
          // footerBackgroundColor: '#2945b8',
          // footerTextColor: '#FFFFFF',
          // footerLinkColor: '#FFFFFF',
          // footerBorderColor: '#FFFFFF2B',
          // loginCardColor: '#F1F7FF',
          // signupCardColor: '#FFE9D6',
          // cardPrimaryColor: '#FAFAFA',
        // END TO DELETE
        tableHeaderBgColor: '#F7F6F2',
        tableContentBgColor: '#F7F6F2',
        modalBackgroundColor: '#F5F5F5',
        highlightColor: '#F1F7FF',
        termAndConditionsLinkColor: '#2945B8',
      },
      screens: {
        desktop: '1025px',
      },
    },
  },
  plugins: [
    tailwindTypographyPlugin,
    tailwindComponentsPlugin,
  ],
  // option to forcely include certain classes via tailwind
  // safelist: [
  //   {
  //     pattern: /text-(xs|sm|lg|xl|2xl|3xl|4xl)/,
  //     variants: ['md', 'lg', 'desktop'],
  //   },
  // ]
};
