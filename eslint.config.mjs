import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Node.js source files
  {
    files: ["**/*.{js,cjs}"],
    ignores: ["src/server/router.static/**"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: globals.node,
      sourceType: "commonjs",
    },
  },
  // Browser JS files
  {
    files: ["src/server/router.static/js/*.js"],
    ignores: ["src/server/router.static/js/sw.js"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: globals.browser,
      sourceType: "script",
    },
  },
  // Service worker
  {
    files: ["src/server/router.static/js/sw.js"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: globals.serviceworker,
      sourceType: "script",
    },
  },
]);
