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
        ecs: {
          paramount: "#F9F8F2", // The main porcelain background
          secondary: "#EAE8DF", // Secondary details/cards
          brand: {
            dark: "#024653", // Primary Text / Dark Teal
            DEFAULT: "#0E6168",
            light: "#1D7F7F", // Light Teal
          },
          accent: {
            DEFAULT: "#08BF5F", // Natural green for highlights
            hover: "#05D16E",
          },
        },
        // Legacy support if needed, or mapping to new variables
        brand: {
          dark: "#024653",
          DEFAULT: "#0E6168",
          light: "#1D7F7F",
        },
        accent: {
          DEFAULT: "#08BF5F",
          hover: "#05D16E",
        },
        cream: "#F9F8F2",
      },
      fontFamily: {
        opensans: ["var(--font-opensans)", "sans-serif"],
        // Keep outfit as fallback or for transition if referenced
        outfit: ["var(--font-opensans)", "sans-serif"],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
    },
  },
  plugins: [],
};
