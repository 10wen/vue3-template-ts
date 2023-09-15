module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/eslint-config-typescript",
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2020,
    sourceType: "module",
    jsxPragma: "React",
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
  },
  // settings: {
  //   "import/resolver": {
  //     alias: {
  //       map: [
  //         ["@", "./src"]
  //         // 添加其他别名配置
  //       ],
  //       extensions: [".ts", ".js", ".jsx", ".json"]
  //     }
  //   }
  // },
  rules: {
    "no-console": "off",
    "comma-dangle": [2, "never"], //禁止使用拖尾逗号
    // // TS
    // "@typescript-eslint/no-explicit-any": "off",
    // "no-debugger": "off",
    // "@typescript-eslint/explicit-module-boundary-types": "off",
    // "@typescript-eslint/ban-types": "off",
    // "@typescript-eslint/ban-ts-comment": "off",
    // "@typescript-eslint/no-empty-function": "off",
    // "@typescript-eslint/no-non-null-assertion": "off",
    // "@typescript-eslint/no-unused-vars": [
    //   "error",
    //   {
    //     argsIgnorePattern: "^_",
    //     varsIgnorePattern: "^_",
    //   },
    // ],
    // "no-unused-vars": [
    //   "error",
    //   {
    //     argsIgnorePattern: "^_",
    //     varsIgnorePattern: "^_",
    //   },
    // ],
    // // Vue
    // "vue/no-v-html": "off",
    // "vue/require-default-prop": "off",
    // "vue/require-explicit-emits": "off",
    // "vue/multi-word-component-names": "off",
    // "vue/html-self-closing": [
    //   "error",
    //   {
    //     html: {
    //       void: "always",
    //       normal: "always",
    //       component: "always",
    //     },
    //     svg: "always",
    //     math: "always",
    //   },
    // ],
    // // Prettier
    // "prettier/prettier": [
    //   "error",
    //   {
    //     endOfLine: "auto",
    //   },
    // ],
  },
};
