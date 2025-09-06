/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      fontFamily:{
        warang: ['"Noto Sans Warang Citi"', 'sans-serif'],
      },
     boxShadow: {
       custom: '0px 1px 5px #0000001a',
      },  
    },
  },
  plugins: [],
};
