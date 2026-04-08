/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eefbf7",
          100: "#d7f6eb",
          200: "#b2ecd9",
          300: "#7edec1",
          400: "#43c8a0",
          500: "#1fad85",
          600: "#168b6c",
          700: "#156f58",
          800: "#155848",
          900: "#13493d"
        },
        ink: "#0f172a",
        mist: "#f8fafc"
      },
      boxShadow: {
        glow: "0 20px 60px rgba(31, 173, 133, 0.2)"
      },
      backgroundImage: {
        grid: "radial-gradient(circle at 1px 1px, rgba(148,163,184,0.18) 1px, transparent 0)"
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["DM Sans", "sans-serif"]
      }
    }
  },
  plugins: []
};
