/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: '590px',
        sx: '470px',
      },
      fontFamily: {
        serif: ['Lora', 'serif']
      },
    },
  },
  plugins: [],
};
