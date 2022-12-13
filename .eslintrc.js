const eslintConfig = {
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  rules: {
    "@typescript-eslint/no-unused-vars": "error",
    "react/no-unescaped-entities": 0,
  },
};

module.exports = eslintConfig;
