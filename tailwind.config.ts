import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      screens: {
        'max-lg': { max: '1023px' },
      },
      colors: {
        border: { light: colors.zinc[200] },
        light: colors.zinc[500],
        hover: '#27abe9',
        point: '#27abe9',
        'green-gray': '#edf1f7',
        'green-light': '#c2d8d2',
      },
      height: {
        test: '1000px',
      },
      keyframes: {
        'bounce-left': {
          '0%': { transform: 'translateX(0px)' },
          '50%': { transform: 'translateX(-8px)' },
          '100%': { transform: 'translateX(0px)' },
        },
        'bounce-right': {
          '0%': { transform: 'translateX(0px)' },
          '50%': { transform: 'translateX(8px)' },
          '100%': { transform: 'translateX(0px)' },
        },
      },
      animation: {
        'bounce-left': 'bounce-left 1s ease 1',
        'bounce-right': 'bounce-right 1s ease 1',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;
