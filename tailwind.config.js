/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
      keyframes: {
        'slide-up': {
          from: {
            transform: 'translateY(100%)',
          },
          to: {
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        'slide-up': 'slide-up 0.3s ease-out forwards',
      },
      screens: {
        'xs':'0px',
        'sm':'391px'
      }
    },
  },
  plugins: [],
};
