import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  // Custom strict rules
  {
    rules: {
      // TypeScript strict rules
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        { prefer: "type-imports" },
      ],

      // React rules
      "react/jsx-no-leaked-render": [
        "warn",
        { validStrategies: ["ternary", "coerce"] },
      ],
      "react-hooks/exhaustive-deps": "error",
      "react/no-unstable-nested-components": [
        "warn",
        { allowAsProps: true },
      ],
      "react/jsx-no-useless-fragment": [
        "warn",
        { allowExpressions: true },
      ],

      // General code quality
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "prefer-const": "error",
      "no-var": "error",
      eqeqeq: ["error", "always"],

      // Import organization
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling"],
            "index",
            "type",
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      "import/no-duplicates": "error",

      // Prefer named exports for tree-shaking and clarity
      "no-restricted-syntax": [
        "warn",
        {
          selector: "ExportDefaultDeclaration",
          message: "Prefer named exports for better tree-shaking and readability.",
        },
      ],
    },
  },
]);

// eslint-disable-next-line no-restricted-syntax
export default eslintConfig;
