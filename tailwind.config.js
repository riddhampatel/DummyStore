/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#ecf8ff",
          100: "#d8f0ff",
          600: "#0b6db8",
          700: "#0a4f85",
          900: "#07253b",
        },
      },
      boxShadow: {
        panel: "0 10px 30px rgba(16, 33, 51, 0.08)",
      },
    },
  },
  plugins: [],
};