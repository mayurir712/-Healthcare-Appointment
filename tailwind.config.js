/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#1456FE',
          teal: '#0F9BA6',
          gray: '#212837',
        },
      },
    },
  },
  plugins: [],
}

