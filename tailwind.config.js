/** @type {import('tailwindcss').Config} */
export default  {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: '#b87333',
        letras: '#ee9f05',
        cerrar: '#efcead',
        div: '#eeeeee'
        }
    },
  },
  plugins: [],
}