/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/utils/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#fec00f",
        "primary-tint": "#e2b703",
        secondary: "#807e7e",
        "secondary-shade": "#d6d6d6",
        "dark-shade": "#2e2e2e",
        dark: "#202020",
        "dark-tint": "#959595",
        danger: "#D11317",
        warning: "#F6B12D",
        success: "#00800A",
        light: "#F2F2F2",
      },
      fontFamily: {
        almarai: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
