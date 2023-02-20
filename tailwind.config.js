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
        '144': '40rem',
        '192': '49.5rem',
        '4.5': '1.1rem',
      },
      height: {
        '144': '40rem',
        '192': '49.5rem',
        '4.5': '1.1rem'
      },
      spacing: {
        '1/6': '16%',
        'paybtn': '11.75rem',
        'requestbtn': '10.75rem',
        '25': '6.3rem',
      },
      padding: {
        '42': '10.78rem',
      },
      margin: {
        '1.25': '0.29rem',
        '26': '6.5rem',
      },
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
    },
    backgroundImage: {
      'profile1': "url('/cat-profile-1.jpg')",
      'profile2': "url('/cat-profile-2.jpg')",
      'profile3': "url('/cat-profile-3.jpg')",
      'profile4': "url('/cat-profile-4.jpg')"
    },
    screens: {
      'xs': '350px',
      'sm': '660px',
      'md': '795px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
