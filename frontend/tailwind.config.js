/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        plum: {
          DEFAULT: '#381932',
          muted: '#4e444a',
        },
        cream: {
          DEFAULT: '#fff8f3',
          section: '#fef2e5',
          card: '#f8ecdf',
          elevated: '#f2e6da',
        },
        gold: {
          DEFAULT: '#fed65b',
          bright: '#ffe082',
        },
        frost: {
          DEFAULT: '#121214',
          layer: '#0f0f10',
          elevated: '#1a1a1d',
          text: '#f5ede6',
          'text-secondary': '#d6cfc7',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'lg': '12px',
        'xl': '16px',
      },
    },
  },
  plugins: [],
}
