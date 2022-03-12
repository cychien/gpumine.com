const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  darkMode: "class",
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screen: {
      sm: "640px",
      lg: "1024px",
    },
    container: {
      padding: {
        DEFAULT: "16px",
        sm: "32px",
      },
    },
    // Exclude unnecessary colors
    colors: {},
    fontFamily: {
      sans: ["Noto Sans TC", ...defaultTheme.fontFamily.sans],
      mono: ["Azeret Mono", ...defaultTheme.fontFamily.mono],
    },
    extend: {
      // Put under `extends` to avoid being overwritten by daisyui
      colors: {
        "text-default": {
          light: "#312c30",
          dark: colors.white,
        },
        "input-border": {
          light: "#7c7c7c",
          dark: "#a0a0a0",
        },
        "bg-primary": {
          light: colors.white,
          dark: "#171717",
        },
        "card-bg": {
          light: colors.white,
          dark: "rgba(255, 255, 255, 0.1)",
        },
        white: colors.white,
        primary: {
          700: "#1d2080",
          500: "#2b62f6",
          400: "#3569f5",
          200: "#6485dd",
        },
        gray: {
          900: "#000000",
          500: "#4d4d4d",
          300: "#9d9d9d",
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    styled: false,
    themes: [],
    base: false,
  },
};
