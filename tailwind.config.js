/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          dark: "#024653",
          DEFAULT: "#0E6168",
          light: "#1D7F7F",
        },
        accent: {
          DEFAULT: "#05D16E", // Bright Green
          hover: "#08BF5F",
        },
        cream: "#F9F8F2",
        // Mapping existing classes to new brand identity
        cyan: {
          500: "#024653", // Dark Teal (replaces Cyan)
        },
        fuchsia: {
          500: "#05D16E", // Bright Green (replaces Fuchsia)
        },
        emerald: {
          500: "#08BF5F", // Secondary Green
        },
      },
      fontFamily: {
        outfit: ["var(--font-outfit)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
