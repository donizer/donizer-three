/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridAutoRows: {
        "80pxAuto": "minmax(80px, auto)",
      },
      boxShadow: {
        "custom-cyan-shadow": "0px 0px 4px 1px rgb(25, 201, 255)",
      },
      borderColor: {
        "custom-cyan": "rgb(25, 201, 255)",
      },
    },
  },
  plugins: [],
};
