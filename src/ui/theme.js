const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const culori = require("culori");

const theme = { ...defaultTheme, color: colors };

theme.color.light = {
  background: toHex(theme.color.slate["50"]),
  foreground: toHex(theme.color.white),
  font: toHex(theme.color.slate["900"]),
  font2: toHex(theme.color.slate["700"]),
  themeColor: toHex(theme.color.green["400"]),
};

theme.color.dark = {
  background: toHex(theme.color.black),
  foreground: toHex(theme.color.slate["950"]),
  font: toHex(theme.color.slate["100"]),
  font2: toHex(theme.color.slate["300"]),
  themeColor: toHex(theme.color.green["600"]),
};

/*
 * Note: Since tailwind's colors are in OKLCH format and they are not supported by
 *       older clients (such as gmail), we use culori to convert them to hex codes.
 */
function toHex(code) {
  return culori.formatHex(code) || code;
}

module.exports = theme;

// https://tailwindcss.com/docs/font-family
// https://tailwindcss.com/docs/customizing-colors#default-color-palette
