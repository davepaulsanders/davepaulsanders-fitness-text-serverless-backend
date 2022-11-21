/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        DEFAULT: "0 3px 10px rgb(0 0 0 / 0.2)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
