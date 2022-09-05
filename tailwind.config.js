module.exports = {
  content: ['./src/index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      transitionProperty: {
        height: 'height'
      },
      backgroundImage: {
        'hero-pattern':
          'linear-gradient(115deg, rgba(15, 15, 60, 0.9), rgba(40, 40, 80, 0.8)), url(../src/assets/books.jpg)'
      }
    }
  },
  variants: {
    extend: {},
    fontFamily: {
      sans: ['Inter', 'ui-sans-serif', 'system-ui']
    }
  },
  plugins: [require('@tailwindcss/forms')]
};
