import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

// Add your custom theme colors here
const themeColors = {
  primary: colors.violet,
  secondary: colors.gray,
  success: colors.emerald,
  warning: colors.amber,
  danger: colors.rose,
  info: colors.indigo,
  dark: colors.slate,
};
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,scss}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins'],
      },
      transitionProperty: {
        width: 'width',
        height: 'height',
        margin: 'margin',
      },
      keyframes: {
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 300ms ease-in-out',
      },
      colors: themeColors,
      variables: {
        DEFAULT: themeColors,
      },
      borderRadius: {
        primary: '0.4rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@mertasan/tailwindcss-variables'),
    require('@tailwindcss/typography'),
  ],
} satisfies Config;
