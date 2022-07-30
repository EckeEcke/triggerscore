module.exports = {
  purge: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gray: {
          900: 'rgb(15,15,25)'
        }
      }
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      display: ["group-hover"],
      boxShadow: ["focus-within"],
      borderRadius: ["first","last"]
    },
  },
  plugins: [],
}
