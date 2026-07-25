/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        blush: {
          bg: "#FFF6F8",
          light: "#FBE4EC",
          DEFAULT: "#F4C2D7",
          dark: "#E8A6BF",
        },
        wine: {
          DEFAULT: "#A8325E",
          dark: "#7D2347",
        },
        plum: "#3B1F2B",
        gold: "#C9A66B",
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "serif"],
        body: ["Jost", "sans-serif"],
      },
    },
  },
  plugins: [],
};
