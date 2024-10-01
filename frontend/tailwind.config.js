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
  plugins: [],
}

