import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import prettier from "eslint-config-prettier";

const ignores = [
	"**/node_modules/**",
	"**/dist/**",
	"**/build/**",
];

export default [
	{ ignores },
	js.configs.recommended,
	...tseslint.configs.recommendedTypeChecked,
	{
		files: ["**/*.{ts,tsx,js,jsx}"],
		languageOptions: {
			ecmaVersion: "latest",
			sourceType: "module",
			parserOptions: {
				project: ["./tsconfig.json"],
				tsconfigRootDir: process.cwd()
			}
		},
		plugins: {
			"react-hooks": reactHooks,
			"react-refresh": reactRefresh
		},
		rules: {
			"react-hooks/rules-of-hooks": "error",
			"react-hooks/exhaustive-deps": "warn",
			"react-refresh/only-export-components": ["warn", { allowConstantExport: true }]
		}
	},
	prettier
];
