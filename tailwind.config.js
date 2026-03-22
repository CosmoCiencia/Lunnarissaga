/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        midnight: '#04030a',
        ember: '#7fd3ff',
        ash: '#d9c7ff'
      },
      fontFamily: {
        ritual: ['"Cormorant Garamond"', 'serif'],
        display: ['"Cinzel"', 'serif']
      }
    }
  },
  plugins: []
};
