/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#3b82f6',
        'primary-dark': '#2563eb',
        'accent': '#10b981',
        'accent-dark': '#059669',
        'bg': '#f8fafc',
        'bg-dark': '#0f172a',
        'card': '#ffffff',
        'card-dark': '#1e293b',
        'border': '#e2e8f0',
        'border-dark': '#334155',
      }
    },
  },
  plugins: [],
}
