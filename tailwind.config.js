/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // Enable dark mode based on class
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '10': '1.5rem', // Custom value for right-10 (1.5rem)
        '20': '8rem',  // Custom value for bottom-20 (7rem)
      },
    },
  },
  plugins: [],
};
