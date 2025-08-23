import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    rules: {
      "semi": ["error", "always"],
      "no-multiple-empty-lines": ["error", { max: 1 }],
      "@/space-before-function-paren": ["error", "never"],
      "@/indent": ["error", 2, {
        SwitchCase: 1,
        VariableDeclarator: 1,
        FunctionDeclaration: { parameters: 1, body: 1 },
        FunctionExpression: { parameters: 1, body: 1 },
        CallExpression: { arguments: 1 },
        ArrayExpression: 1,
        ObjectExpression: 1,
        ImportDeclaration: 1,
        flatTernaryExpressions: false
      }]
    }
  }
];

export default eslintConfig;
