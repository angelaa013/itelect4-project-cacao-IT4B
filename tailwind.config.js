/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4A3525", // Soft Warm Espresso Brown for readable minimalist text
          light: "#6B503B",
          dark: "#2D1F15",
        },
        secondary: "#F4A21A", // Pawhome Warm Golden Amber
        accent: "#FA799F",    // Pawhome Soft Rose Pink
        cream: {
          DEFAULT: "#FFF8EC", // Light Cream Main Background
          card: "#FFFDF7",    // Minimalist Light Card Background
          yellow: "#FFF1D6",  // Soft Pastel Amber Card
          pink: "#FDE8F0",    // Soft Pastel Pink Card
        },
        "dark-brown": "#2D1F15",
      },
    },
  },
  plugins: [],
}


