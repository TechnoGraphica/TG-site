/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        'neon': '0 0 10px rgba(147, 51, 234, 0.7), 0 0 20px rgba(147, 51, 234, 0.5)',
      },
      borderColor: {
        'neon': '#9333ea',
      },
    },
    fontFamily: {
      mono: ['Courier New', 'monospace'],
    },
  },
  plugins: [],
};