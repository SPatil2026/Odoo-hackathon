/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-accent': '#4CAF50',
        'secondary-accent': '#FF7043',
        'primary-text': '#212121',
        'secondary-text': '#757575',
        'border-color': '#E0E0E0',
        'background': '#F5F5F5',
        'white': '#FFFFFF',
      },
    },
  },
  plugins: [],
}
