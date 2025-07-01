import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import prettier from "eslint-config-prettier"; // ← 追加（Prettierのルール）

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Next.js + TypeScript 設定
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  // Prettierとの競合ルールを無効化
  {
    name: "prettier",
    rules: {
      ...prettier.rules,
    },
  },
];

export default eslintConfig;
