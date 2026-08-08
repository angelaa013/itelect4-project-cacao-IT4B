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
          DEFAULT: "#3D0C02", // Deep Maroon / Dark Chocolate Brown
          light: "#5B180B",
          dark: "#2B0801",
        },
        secondary: "#FAAB18", // Pawhome Golden Amber Yellow
        accent: "#FA799F",    // Pawhome Rose Pink
        cream: {
          DEFAULT: "#FFFDF3", // Light Cream Background
          card: "#FFFFFF",    // Minimalist Light Card Background
          yellow: "#FEF2D6",  // Soft Pastel Amber Card
          pink: "#FDE8F0",    // Soft Pastel Pink Card
        },
        "dark-brown": "#3D0C02",
        "dark-bg": "#1E0C0E",
        "dark-card": "#2B1517",
      },
    },
  },
  plugins: [],
}


