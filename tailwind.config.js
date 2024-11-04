/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: "320px",
      md: "560px",
      lg: "768px",
      xl: "1200px",
    },
    fontFamily: {
      inter: ["Inter", "sans-serif"],
    },
    extend: {
      colors: {
        'primary2': {
          100: "#DAD7CD",
          300: "#A3B18A",
          500: "#588157",
          700: "#3A5A40",
          900: "#344E41",
        },
        'primary': {
          50: "#AFBAB0",
          100: "#C6E2C8",
          300: "#8fb996",
          500: "#709775",
          700: "#415d43",
          900: "#111d13",
        },
      },
    },
  },
  plugins: [],
}