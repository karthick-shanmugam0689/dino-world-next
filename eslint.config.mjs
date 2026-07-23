import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    files: ["components/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "../data/dinos",
              message: "Client components must not import the full catalog. Pass props from a Server Component, or use data/search-index.",
            },
            {
              name: "../../data/dinos",
              message: "Client components must not import the full catalog. Pass props from a Server Component, or use data/search-index.",
            },
            {
              name: "../data/helpers",
              message: "Client components must not import data/helpers (pulls the full catalog). Pass props from a Server Component, or use data/search-index.",
            },
            {
              name: "../../data/helpers",
              message: "Client components must not import data/helpers (pulls the full catalog). Pass props from a Server Component, or use data/search-index.",
            },
          ],
        },
      ],
    },
  },
]);

export default eslintConfig;
