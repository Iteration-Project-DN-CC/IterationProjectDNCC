/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./client/**/*.{js,jsx,html}'], // Scans JSX and HTML files for Tailwind classes
  theme: {
    extend: {
      colors: {
        peach: '#DF7B6C',
        darkerpeach: '#CF695A'
      },
    },
    //   fontFamily: {
    //     // Optional: Add custom font families
    //     sans: ['Nunito', 'Arial', 'sans-serif'],
    // },
  },
  plugins: [],
};
