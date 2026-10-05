/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#121212",
        surface: {
          DEFAULT: "#1E1E1E",
          hover: "#252525"
        },
        accent: {
          primary: "#00E5FF",
          secondary: "#32D74B",
          alert: "#FF453A"
        },
        alert: {
          bg: "#3A1C1C",
          text: "#FF453A"
        },
        border: "#2C2C2E",
        muted: "#98989D"
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"]
      },
      borderRadius: {
        card: "16px"
      }
    }
  },
  plugins: []
};
