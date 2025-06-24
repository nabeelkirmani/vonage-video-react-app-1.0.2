/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0B57D0',
          dark: '#0B57D0',
        },
        secondary: '#EAF1FB',
        accent: {
          DEFAULT: '#1ED760',
          dark: '#1DB954',
        },
        darkGray: {
          55: 'rgb(32, 33, 36, .55)',
          100: 'rgb(32, 33, 36)',
        },
        notVeryGray: {
          55: 'rgba(60, 64, 67, .55)',
          100: 'rgb(60, 64, 67)',
        },
      },
      screens: {
        xs: '350px',
        ...defaultTheme.screens,
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
};
