/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = plugin(function({ addComponents, theme, config }) {
  // buttons
  addComponents({
    '.button': {
      borderWidth: '3px',
      borderColor: 'transparent',
      borderRadius: '50px',
      fontFamily: theme('fontFamily.display'),
      fontSize: theme('fontSize.sm'),
      textTransform: 'uppercase',
      padding: '.5rem 1.5rem',
      letterSpacing: theme('letterSpacing.widest'),
      transition: 'all .3s ease',
      "&:disabled": {
        backgroundColor: theme('colors.neutral.300'),
        borderColor: theme('colors.neutral.300'),
        color: theme('colors.neutral.500'),
      },
    },
    '.button--primary': {
      backgroundColor: '#2945b8',
      borderColor: '#2945b8',
      color: '#FFFFFF',
      '&:hover': {
        backgroundColor: '#192c7c',
        borderColor: '#192c7c',
      },
      "&:disabled": {
        backgroundColor: theme('colors.neutral.300'),
        borderColor: theme('colors.neutral.300'),
        color: theme('colors.neutral.500'),
      },
    },
    '.button--secondary': {
      backgroundColor: '#2945b8',
      borderColor: '#2945b8',
      color: '#FFFFFF',
      '&:hover': {
        backgroundColor: '#192c7c',
        borderColor: '#192c7c',
      },
      '&:focus': {
        outline: '#2945b8',
      },
      "&:disabled": {
        backgroundColor: theme('colors.neutral.300'),
        borderColor: theme('colors.neutral.300'),
        color: theme('colors.neutral.500'),
      },
    },
    '.button--outline': {
      backgroundColor: theme('colors.transparent'),
      borderColor: '#2945b8',
      color: '#2945b8',
      '&:hover': {
        color: '#192c7c',
        borderColor: '#192c7c',
      },
      "&:disabled": {
        backgroundColor: theme('colors.neutral.300'),
        borderColor: theme('colors.neutral.300'),
        color: theme('colors.neutral.500'),
      },
    },
    '.button--danger': {
      backgroundColor: theme('colors.errorColor'),
      borderColor: theme('colors.errorColor'),
      color: '#FFFFFF',
      '&:hover': {
        backgroundColor: theme('colors.errorColor'),
        borderColor: theme('colors.errorColor'),
      },
      "&:disabled": {
        backgroundColor: theme('colors.neutral.300'),
        borderColor: theme('colors.neutral.300'),
        color: theme('colors.neutral.500'),
      },
    },
    '.button--checkoutCart': {
      backgroundColor: '#2c2c2c',
      borderColor: '#2c2c2c',
      color: '#FFFFFF',
      '&:hover': {
        backgroundColor: '#1c1c1c',
        borderColor: '#1c1c1c',
      },
      "&:disabled": {
        backgroundColor: '#7c7c7c',
        borderColor: '#7c7c7c',
        color: '#FFFFFF',
      },
    },
    '.button--checkoutV2': {
      backgroundColor: '#2c2c2c',
      borderColor: '#2c2c2c',
      color: '#FFFFFF',
      '&:hover': {
        backgroundColor: '#1c1c1c',
        borderColor: '#1c1c1c',
      },
      "&:disabled": {
        backgroundColor: '#7c7c7c',
        borderColor: '#7c7c7c',
        color: '#FFFFFF',
      },
    },
    // cancel now button in subscription-cancellation
    '.button--cancelNow': {
      backgroundColor: theme('colors.transparent'),
      borderColor: '#2945b8',
      color: '#2945b8',
      '&:hover': {
        color: '#192c7c',
        borderColor: '#192c7c',
      },
      "&:disabled": {
        backgroundColor: theme('colors.neutral.300'),
        borderColor: theme('colors.neutral.300'),
        color: theme('colors.neutral.500'),
      },
    },
    '.button--dontCancel': {
      backgroundColor: '#2945b8',
      borderColor: '#2945b8',
      color: '#FFFFFF',
      '&:hover': {
        backgroundColor: '#192c7c',
        borderColor: '#192c7c',
      },
      "&:disabled": {
        backgroundColor: theme('colors.neutral.300'),
        borderColor: theme('colors.neutral.300'),
        color: theme('colors.neutral.500'),
      },
    },
  })
  // END buttons
})

