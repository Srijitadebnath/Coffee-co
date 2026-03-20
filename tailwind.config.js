/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          light: '#EBC1BE', // Lighter pastel pink
          dark: '#E6B7B5', // Base pastel pink
        },
        primary: '#3A1F17', // Dark chocolate brown
        secondary: '#F5EDEB', // Off-white / cream
        muted: '#6B4A3F', // Muted brown
        accent: {
          light: '#C69C6D',
          DEFAULT: '#8B5E3C', // Medium coffee
          dark: '#4B2E2B',
        }
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        cursive: ['Pacifico', 'cursive'],
      },
      fontWeight: {
        light: 300,
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
      },
      borderRadius: {
        '2xl': '1rem',
      },
    },
  },
  plugins: [],
}
