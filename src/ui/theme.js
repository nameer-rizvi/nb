const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

const theme = {
  ...defaultTheme,
  color: colors,
};

theme.color.light = {
  background: theme.color.slate["50"],
  foreground: theme.color.white,
  font: theme.color.slate["900"],
  font2: theme.color.slate["700"],
  themeColor: theme.color.green["400"],
};

theme.color.dark = {
  background: theme.color.black,
  foreground: theme.color.slate["950"],
  font: theme.color.slate["100"],
  font2: theme.color.slate["300"],
  themeColor: theme.color.green["600"],
};

module.exports = theme;

// https://tailwindcss.com/docs/font-family
// https://tailwindcss.com/docs/customizing-colors#default-color-palette
