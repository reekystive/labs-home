/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      transitionTimingFunction: {
        quick: 'cubic-bezier(0, 0.8, 0.5, 1)',
      },
      colors: {
        red: {
          50: '#fff2f1',
          100: '#ffe2df',
          200: '#ffcac5',
          300: '#ffa69d',
          400: '#ff7364',
          500: '#ff4734',
          600: '#ed2915',
          700: '#c81f0d',
          800: '#a51d0f',
          900: '#881f14',
          950: '#650f06',
        },
      },
    },
  },
  plugins: [],
};
