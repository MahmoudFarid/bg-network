module.exports = {
  purge: [],
  theme: {
    extend: {
      colors: {
        primaryText: '#3023AE',
        secondary: '#00234E',
        secondaryLight: '#767e8d',
        bgLight: '#f4f4f4',
        danger: '#c30606'
      }
    },
    container: {
      center: true,
      padding: '1rem'
    }
  },
  variants: {},
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '95%',
          '@screen sm': {
            maxWidth: '750px',
          },
          '@screen md': {
            maxWidth: '900px',
          },
          '@screen lg': {
            maxWidth: '1170px',
          },
          '@screen xl': {
            maxWidth: '1420px',
          },
        }
      })
    }
  ],
}
