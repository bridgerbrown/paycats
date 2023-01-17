const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      Hind: ['Hind Vadodara', 'sans-serif'],
    },
    fontSize: {
      base: '1.05rem',
    }
  },
  plugins: [],
}
