const eslintjs = require("@eslint/js");
const globals = require("globals");

const eslintconfig = [
  eslintjs.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.commonjs,
        ...globals.es2021,
      },
    },
  },
  {
    files: ["src/server/router.static/js/**"],
    languageOptions: {
      globals: {
        window: true,
        document: true,
        self: true,
        caches: true,
        clients: true,
      },
    },
  },
];

module.exports = eslintconfig;
