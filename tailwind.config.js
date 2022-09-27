module.exports = {
  purge: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gray: {
          900: 'rgb(5,5,15)',
          950: 'rgb(30,30,40)'
        },
        red: {
          950: 'rgb(210,4,45)'
        },
        white: 'rgb(250,250,250)',
      }
    }
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      display: ["group-hover"],
      boxShadow: ["focus-within"],
      borderRadius: ["first","last"]
    },
  },
  plugins: [
    require('tailwind-accent-color')(),
  ],
}
