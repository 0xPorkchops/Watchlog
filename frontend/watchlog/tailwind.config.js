// tailwind.config.js
export default {
    content: ["./App.{js,jsx,ts,tsx}", "./screens/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        colors: {
          bg: '#040316',
          text: '#fbfbfe',
          light: '#fefcf1',
          accent: '#bde4ef',
          primary: '#f5c024',
        },
        fontFamily: {
          inter: ['Inter'],
        },
      },
    },
    plugins: [],
  }
  
  