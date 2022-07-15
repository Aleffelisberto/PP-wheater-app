/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat'],
        'lato': ['Lato']
      },
      backgroundImage: {
        'weather-bg': 'url("assets/weather-bg.jpg")'
      }
    },
  },
  plugins: [],
}
