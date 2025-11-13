/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f7ff',
          100: '#ebefff',
          200: '#d6deff',
          300: '#b8c5ff',
          400: '#94a3ff',
          500: '#667eea',
          600: '#5568d3',
          700: '#4651b8',
          800: '#3a3f94',
          900: '#2f3470',
        },
      },
    },
  },
  plugins: [],
}
