const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '192': '49.5rem',
      },
      spacing: {
        '1/6': '16%',
      },
      padding: {
        '42': '10.78rem'
      }
    },
    fontFamily: {
      Hind: ['Hind Vadodara', 'sans-serif'],
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.9rem',
      base: '1.05rem',
      xl: '1.25rem',
      '2xl': '1.4rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
