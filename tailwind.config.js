/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cyber-green': '#00ff88',
        'cyber-blue': '#00d4ff',
        'dark-bg': '#0a0e27',
        'dark-card': '#1a1f3a',
      }
    },
  },
  plugins: [],
}
