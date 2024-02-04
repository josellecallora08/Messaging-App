/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'mobile': "url('/mobile-bg.svg')",
      },
      backgroundColor:{
        'theme': '#A07EFF'
      },
      borderColor:{
        'theme': '#A07EFF'
      },
      textColor:{
        'placeholder': '#948989',
        'theme': '#A07EFF',
        'logo': '#713FFD'
      },
      fontFamily:{
        'logo':'logo-font'
      },
      boxShadow:{
        'md-inner': '2px 2px 4px inset'
      }
    },
  },
  plugins: [],
}

