const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screen: {
      lg: "1280px",
    },
    container: {
      padding: {
        DEFAULT: "16px",
        sm: "32px",
      },
    },
    colors: {
      // TODO:
      primary: {
        700: "#1d2080",
      },
      gray: {
        900: "#000000",
      },
      white: colors.white,
    },
    fontFamily: {
      // TODO:
      sans: ["Noto Sans TC", ...defaultTheme.fontFamily.sans],
      // mono: defaultTheme.fontFamily.mono,
    },
    extend: {},
  },
  plugins: [],
};
