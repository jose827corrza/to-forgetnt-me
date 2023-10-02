/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'dark-blue': '#071952',
      'dark-blue-soft': '#0D2D96',
      'teal': '#0B666A',
      'semi-mint': '#35A29F',
      'mint': '#97FEED',
      'dark': '#000000',
      'white': '#ffffff',
      'background': '#F8F6F4',
      'components': '#E3F4F4',
      'headers': '#D2E9E9',
      'titles': '#C4DFDF',
      'gray-200': '#B2BABB'
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      animation: {
        'spin-slow': 'spin 5s linear infinite',
      }
    },
  },
  plugins: [],
}

