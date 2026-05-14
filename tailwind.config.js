/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ethiopia-green': '#078838',
        'ethiopia-gold': '#FCDD09',
        'ethiopia-red': '#DA121A',
        'warm-brown': '#8B5A2B',
        'earth-green': '#4A7C59',
        'sky-blue': '#4A90D9',
      },
      fontFamily: {
        'sans': ['Inter', 'Noto Sans Ethiopic', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}