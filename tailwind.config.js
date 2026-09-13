/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ga: {
          50: '#eef8ff',
          100: '#d9efff',
          200: '#bce2ff',
          300: '#8ecfff',
          400: '#59b2ff',
          500: '#3291ff',
          600: '#1a71f5',
          700: '#135be1',
          800: '#1648b6',
          900: '#173f8f',
          950: '#122757',
        },
        bank: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc7fb',
          400: '#38a9f6',
          500: '#0f8de6',
          600: '#026fc5',
          700: '#03589f',
          800: '#074b83',
          900: '#0c3f6d',
          950: '#082848',
        }
      }
    },
  },
  plugins: [],
}
