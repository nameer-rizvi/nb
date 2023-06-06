const eslintrc = {
  env: {
    browser: true,
    commonjs: true,
    es2022: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:import/recommended"],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "no-inner-declarations": "off",
  },
};

module.exports = eslintrc;
