

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        ssp: ["Source Sans Pro", "sans-serif"],
      },
      colors: {
        'background': '#EDF2F4',
        'custom-blue-dark': '#121063',
        'custom-cyan': '#3ab7bf',
        'custom-gray': '#738290',
        'custom-teal': '#0B7A75',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}