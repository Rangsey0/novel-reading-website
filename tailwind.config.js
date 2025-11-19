/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // <-- scan all React files
  ],
  theme: {
    extend: {
      animation: {
        "pulse-slow": "pulse 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
      float: {
        "0%": { transform: "translateY(0px)" },
        "50%": { transform: "translateY(-15px)" },
        "100%": { transform: "translateY(0px)" },
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
