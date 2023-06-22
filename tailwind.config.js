/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter']
      },
      colors: {
        'primary': {
          light: '#212121',
          DEFAULT: '#212121',
          dark: '#212121'
        }
      }
    },
  },
  plugins: [],
}

