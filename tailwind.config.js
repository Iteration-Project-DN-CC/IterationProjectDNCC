/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./client/**/*.{js,jsx,html}'], // Scans JSX and HTML files for Tailwind classes
  theme: {
    extend: {
      colors: {
        peach: '#DF7B6C',
        darkerpeach: '#CF695A',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'], // set Monstserrat as default sans font
      },
    },
  },
  plugins: [],
};
