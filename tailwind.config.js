/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    {
      pattern: /bg-(orange|yellow|green|sky|red|violet)-(400|500|600)/,
      variants: ['hover', 'active'],
    },
  ],
};
