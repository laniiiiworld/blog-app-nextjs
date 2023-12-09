import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: { light: colors.zinc[200] },
        light: colors.zinc[500],
        hover: '#27abe9',
        point: '#27abe9',
      },
      height: {
        test: '1000px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;
