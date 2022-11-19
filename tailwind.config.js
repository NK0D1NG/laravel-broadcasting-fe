/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{vue,js,ts}'],
  theme: {
      extend: {
        colors: {
          'vp-purple': '#8499ff',
          'vp-light-blue': '#08ebf1',
          'vp-blue': '#00c0f0',
          'vp-grey': '#555555',
          'vp-light-grey': '#777777',
        }
      },
  },
  plugins: [require("daisyui")],
}
