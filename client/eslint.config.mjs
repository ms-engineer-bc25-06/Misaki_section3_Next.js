// eslint.config.mjs
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import prettierConfig from "eslint-config-prettier"; // ★ インポート名を変更

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Next.js + TypeScript 設定 (base, core-web-vitals, typescript は next/eslint-plugin を通じて提供される)
  ...compat.extends("next/core-web-vitals"), // next/typescript は通常 next/core-web-vitals に含まれます
  // Prettierとの競合ルールを無効化する設定を追加
  // これにより、Prettierに整形を任せ、ESLintはコード品質チェックに専念する
  prettierConfig, // ★ ここにprettierConfigオブジェクトを直接追加
  {
    // 必要に応じて、ここでグローバル変数や特定のルールを追加
    // 例: Jest/Vitestのグローバル変数 ('test', 'expect'など) を有効にする場合
    // env: {
    //   jest: true, // または 'vitest': true (後でVitest導入時に)
    // },
    // rules: {
    //   'no-console': 'warn', // console.logを警告にする例
    // }
  },
];

export default eslintConfig;
