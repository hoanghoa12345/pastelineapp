/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
        },
        dark: {
          50: "#86C8EA",
          100: "#74C0E7",
          200: "#51B0E2",
          300: "#2EA1DC",
          400: "#218AC1",
          500: "#1B719E",
          600: "#15587B",
          700: "#0F3F58",
          800: "#092635",
          900: "#010405",
          950: "#000000",
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            fontSize: "1rem",
            maxWidth: "85ch",
            h1: {
              fontSize: "1.75rem",
              fontWeight: "600",
            },
            h2: {
              fontSize: "1.4rem",
            },
          },
        },
        xl: {
          css: {
            fontSize: "1rem",
            lineHeight: "1.5",
            h1: {
              fontSize: "1.75rem",
              fontWeight: "600",
            },
            h2: {
              fontSize: "1.25rem",
            },
            p: {
              lineHeight: "1.5",
            },
            pre: {
              fontSize: "1em",
            },
            li: {
              marginTop: "0.25rem",
              marginBottom: "0.25rem",
            },
          },
        },
      }),
    },
    fontFamily: {
      body: ["Inter", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif, system-ui"],
      sans: ["Inter", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif, system-ui"],
      serif: ["Times New Roman", "Times", "serif"],
      mono: ["Fira Code", "Fira Mono", "Roboto Mono", "Menlo", "Monaco", "Consolas", "Courier New", "monospace"],
    },
  },

  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
