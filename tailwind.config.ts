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
        hover: colors.green[800],
        point: '#27abe9',
        'green-gray': '#edf1f7',
        'green-light': '#c2d8d2',
      },
      height: {
        test: '1000px',
      },
      keyframes: {
        loading: {
          '0': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(0, 20px)' },
          '100%': { transform: 'translate(0, 0)' },
        },
        palpitate: {
          '0%': { transform: 'scale(1)' },
          '25%': { transform: 'scale(1.3)' },
          '50%': { transform: 'scale(1)' },
          '75%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)' },
        },
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
        'popup-bg': {
          '0%': { opacity: '0' },
          '100%': { opacity: '0.9' },
        },
        popup: {
          '0%': { opacity: '0', transform: 'translateY(400px) scale(0.75)' },
          '75%': { opacity: '1', transform: 'translateY(-16px) scale(1)' },
          '100%': { opacity: '1', transform: 'translateY(0px)' },
        },
        typing: {
          from: { 'box-shadow': 'inset -3px 0px 0px #d2d2d2' },
          to: { 'box-shadow': 'inset -3px 0px 0px transparent' },
        },
      },
      animation: {
        'loading-1': 'loading 0.6s 0.1s linear infinite',
        'loading-2': 'loading 0.6s 0.3s linear infinite',
        'loading-3': 'loading 0.6s 0.5s linear infinite',
        palpitate: 'palpitate 0.8s ease 1',
        'bounce-left': 'bounce-left 1s ease 1',
        'bounce-right': 'bounce-right 1s ease 1',
        'popup-bg': '0.25s ease 0s 1 normal forwards running popup-bg',
        popup: '0.4s ease-in-out 0s 1 normal forwards running popup',
        typing: 'typing .5s alternate infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;
