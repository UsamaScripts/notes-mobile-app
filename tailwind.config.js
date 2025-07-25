/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#695AE0",
          light: "#7366E4",
        },
        secondary: {
          DEFAULT: "#5E9BFF",
          light: "#f1f0fb",
        },
        gray: {
          light: "#F6F6F6",
          medium: "#E0E0E0",
          dark: "#333333",
        },
        white: "#FFFFFF",
      },
    },
  },
  plugins: [],
};
