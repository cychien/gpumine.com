const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screen: {
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
      // TODO:
      sans: ["Noto Sans TC", ...defaultTheme.fontFamily.sans],
      // mono: defaultTheme.fontFamily.mono,
    },
    extend: {
      // Put under `extends` to avoid being overwritten by daisyui
      colors: {
        primary: {
          700: "#1d2080",
          500: "#2b62f6",
          400: "#3569f5",
        },
        gray: {
          900: "#000000",
          500: "#4d4d4d",
          300: "#9d9d9d",
          "old-text-default": "#312c30",
          "old-input-border": "#7c7c7c",
        },
        white: colors.white,
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
