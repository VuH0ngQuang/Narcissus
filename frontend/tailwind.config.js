import plugin from "tailwindcss";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        abeezee: ['ABeeZee', 'sans-serif'],
        parisienne: ['Parisienne', 'cursive'],
      },
      height: {
        '1/12': '8.33333%', // 1/12 is approximately 8.33%
        '2/3': '66.66667%', // 2/3 is approximately 66.67%
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.no-scrollbar': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',

          /* Firefox */
          'scrollbar-width': 'none',

          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }
      })
    })
  ],
}