import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';
import defaultTheme from 'tailwindcss/defaultTheme';
import tailwindForms from '@tailwindcss/forms';
import tailwindTypography from '@tailwindcss/typography';

// Add your custom theme colors here
export const themeColors = {
  primary: colors.fuchsia,
  secondary: colors.gray,
  success: colors.green,
  warning: colors.yellow,
  danger: colors.rose,
  info: colors.indigo,
  dark: colors.slate,
};

export default {
  content: ['./index.html', './src/**/*.{ts,tsx,css}'],
  darkMode: 'class', // or 'false' or 'class'
  theme: {
    fontFamily: {
      sans: ['Poppins', ...defaultTheme.fontFamily.sans],
    },
    extend: {
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
        'fade-in-up': 'fade-in-up 250ms ease-in-out',
      },
      boxShadow: {
        all: '0 0 0 3px rgba(0, 0, 0, 0.05), 0 3px 2px 0 rgba(0, 0, 0, 0.05)',
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
  plugins: [tailwindForms, tailwindTypography],
} satisfies Config;
