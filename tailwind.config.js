/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./formkit.theme.ts"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        "surface-container-high": "#20201f",
        "surface-container-highest": "#262626",
        "surface-container": "#1a1a1a",
        "surface-container-low": "#131313",
        "surface-container-lowest": "#000000",
        "surface": "#0e0e0e",
        "surface-dim": "#0e0e0e",
        "surface-bright": "#2c2c2c",
        "surface-variant": "#262626",
        "on-surface": "#ffffff",
        "on-surface-variant": "#adaaaa",
        "background": "#0e0e0e",
        "on-background": "#ffffff",
        "primary": "#68d3ff",
        "primary-container": "#00c8fe",
        "primary-fixed": "#00c8fe",
        "primary-dim": "#00b9ec",
        "on-primary": "#00465b",
        "on-primary-fixed": "#002431",
        "on-primary-container": "#003c4f",
        "secondary": "#6ffb85",
        "secondary-dim": "#60ec79",
        "on-secondary": "#005d21",
        "error": "#ff716c",
        "tertiary": "#ff7162",
        "tertiary-dim": "#e2241f",
        "outline": "#767575",
        "outline-variant": "#484847",
        "surface-tint": "#68d3ff",
      },
      fontFamily: {
        "headline": ["Manrope", "sans-serif"],
        "body": ["Inter", "sans-serif"],
        "label": ["Inter", "sans-serif"],
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "1.5rem",
        "full": "9999px",
      }
    },
  },
  plugins: [],
}
