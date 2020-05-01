module.exports = {
    extends: ["@react-native-community", "plugin:prettier/recommended"],
    plugins: ["import"],
    rules: {
      "react/jsx-filename-extension": "off",
      "import/named": "off",
      "react-native/no-color-literals": "error",
      "react-native/no-inline-styles": "error",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/explicit-function-return-type": "off"
    },
    overrides: [
      {
        files: ["*.js", "*.jsx"],
        parser: "babel-eslint"
      },
      {
        files: ["*.ts", "*.tsx"],
        parser: "@typescript-eslint/parser"
      },
      {
        files: ["styles.ts", "styles.tsx"],
        rules: {
          "no-magic-numbers": "off"
        }
      }
    ]
  };