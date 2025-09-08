// eslint.config.js
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
    {
        files: ["**/*.{ts,tsx,js,jsx}"],
        ignores: ["**/node_modules/**", "**/dist/**", "**/build/**", "eslint.config.js"],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: "./tsconfig.app.json",
                sourceType: "module",
                ecmaVersion: "latest",
                ecmaFeatures: { jsx: true },
            },
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        settings: {
            react: {
                version: "detect",
            },
        },
        plugins: {
            "@typescript-eslint": tseslint.plugin,
            react: pluginReact,
        },
        rules: {
            ...js.configs.recommended.rules,
            ...tseslint.configs.recommended.rules,
            ...pluginReact.configs.recommended.rules,
            "react/react-in-jsx-scope": "off",
            "react/jsx-no-target-blank": "warn",
            "@typescript-eslint/no-unused-vars": ["warn"],
        },
    },
]);
