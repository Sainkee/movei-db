/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient": "linear-gradient(90deg, #f89e00, #da2f68)",
      },
      color: {
        "color-gradient": "linear-gradient(90deg, #f89e00, #da2f68)",
      },
    },
  },
  plugins: [],
};
