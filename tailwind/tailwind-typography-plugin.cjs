/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = plugin(function({ addBase, theme }) {
  addBase({
    // :root CSS variables
    ':root': {
      '--gh-typography-font1': theme('fontFamily.sans'),
      '--gh-typography-font2': theme('fontFamily.display'),
      '--gh-typography-font3': theme('fontFamily.serif'),
      '--gh-color-base': theme('colors.primaryTextColor'),
      '--gh-color-base2': '#fff',
      '--gh-color-brandPrimary': theme('colors.brandPrimary'),
      '--gh-color-brandSecondary': theme('colors.brandSecondary'),
      '--gh-color-brandTertiary': theme('colors.brandPrimary3'),
      '--gh-color-background1': '#F1F7FF',
      '--gh-color-background2': '#E8F4FF',
      '--gh-color-background3': '#E7F3AB',
      '--gh-color-background4': '#FFF1E6',
      '--gh-color-background5': '#FFEEC2',
      '--gh-color-background6': '#FFDB87',
      '--gh-color-neutralBackground1': '#F5F5F5',
      '--gh-color-neutralBackground2': '#E7E8E8',
    },
    'body': {
      color: theme('colors.primaryTextColor'),
      fontOpticalSizing: 'auto',
    },
    'h1': {
      fontFamily: theme('fontFamily.title'),
      fontSize: '40px',
      fontStyle: 'normal',
      fontWeight: '500',
      lineHeight: '48px',
      '@media (min-width: 768px)': {
        fontSize: '54px',
        lineHeight: '60px',
      },
    },
    'h2': {
      fontFamily: theme('fontFamily.title'),
      fontSize: '34px',
      fontStyle: 'normal',
      fontWeight: '500',
      lineHeight: '44px',
      '@media (min-width: 768px)': {
        fontSize: '44px',
        lineHeight: '52px',
      },
    },
    'h3': {
      fontFamily: theme('fontFamily.title'),
      fontSize: '32px',
      fontStyle: 'normal',
      fontWeight: '500',
      lineHeight: '40px',
      '@media (min-width: 768px)': {
        fontSize: '40px',
        lineHeight: '48px',
      },
    },
    'h4': {
      fontFamily: theme('fontFamily.title'),
      fontSize: '28px',
      fontStyle: 'normal',
      fontWeight: '500',
      lineHeight: '36px',
      '@media (min-width: 768px)': {
        fontSize: '32px',
        lineHeight: '40px',
      },
    },
    'h5': {
      fontFamily: theme('fontFamily.title'),
      fontSize: '24px',
      fontStyle: 'normal',
      fontWeight: '500',
      lineHeight: '36px',
      '@media (min-width: 768px)': {
        lineHeight: '32px',
      },
    },
    'h6': {
      fontFamily: theme('fontFamily.title'),
      fontSize: '20px',
      lineHeight: '28px',
      fontWeight: '500',
    },
    'blockquote': {
      fontFamily: theme('fontFamily.display'),
      fontSize: '32px',
      fontWeight: '700',
      lineHeight: '40px',
      fontStyle: 'normal',
      '@media (min-width: 768px)': {
        fontSize: '40px',
        lineHeight: '48px',
      },
    },
    'a': {
      color: theme('colors.linkColor'),
      cursor: 'pointer',
    },
    'table': {
      backgroundColor: 'transparent',
      width: '100%',
      marginBlockEnd: '15px',
      fontSize: '.9em',
      borderSpacing: '0',
      borderCollapse: 'collapse',
    },
    'table td, table th': {
      padding: '15px',
      lineHeight: '1.5',
      verticalAlign: 'top',
      border: '1px solid hsla(0,0%,50.2%,.5)',
    },
    'table th': {
      fontWeight: '700',
    },
    'table tfoot th, table thead th': {
      fontSize: '1em',
    },
    'table caption+thead tr:first-child td, table caption+thead tr:first-child th, table colgroup+thead tr:first-child td, table colgroup+thead tr:first-child th, table thead:first-child tr:first-child td, table thead:first-child tr:first-child th': {
      borderBlockStart: '1px solid hsla(0,0%,50.2%,.5)',
    },
    'table tbody>tr:nth-child(odd)>td, table tbody>tr:nth-child(odd)>th': {
      backgroundColor: 'hsla(0,0%,50.2%,.07)',
    },
    'table tbody tr:hover>td, table tbody tr:hover>th': {
      backgroundColor: 'hsla(0,0%,50.2%,.1)',
    },
    'table tbody+tbody': {
      borderBlockStart: '2px solid hsla(0,0%,50.2%,.5)',
    },
    '@media (max-width: 767px)': {
      'table table': {
        fontSize: '.8em',
      },
      'table table td, table table th': {
        padding: '7px',
        lineHeight: '1.3',
      },
      'table table th': {
        fontWeight: '400',
      },
    },
  });
});
