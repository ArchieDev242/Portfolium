import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// flat config only matches .js/.mjs/.cjs by default, so .jsx needs opting in
const eslintConfig = [
  { ignores: [".next/**", "out/**"] },
  { files: ["**/*.{js,jsx,mjs,cjs}"] },
  ...compat.extends("next/core-web-vitals"),
];

export default eslintConfig;
