module.exports = {
  purge: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
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
