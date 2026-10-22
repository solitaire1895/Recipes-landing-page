/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#fffae5',
        butter: '#fef5da',
        forest: '#335230',
        sage: '#70866e',
        flame: '#ff8b20',
      },
      fontFamily: {
        display: ['Unbounded', 'sans-serif'],
        sans: ['Jost', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
