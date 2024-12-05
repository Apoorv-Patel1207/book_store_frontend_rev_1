import pluginJs from "@eslint/js"
import importOrder from "eslint-plugin-import"
import jsxA11y from "eslint-plugin-jsx-a11y"
import pluginPromise from "eslint-plugin-promise"
import pluginReact from "eslint-plugin-react"
import reactHook from "eslint-plugin-react-hooks"
import globals from "globals"
import tseslint from "typescript-eslint"

/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginPromise.configs["flat/recommended"],
  { files: ["*/.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: globals.browser } },
  {
    plugins: {
      "react-hooks": reactHook,
      import: importOrder,
      "jsx-a11y": jsxA11y,
    },
  },
  {
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    rules: {
      "no-console": "off",
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react/no-array-index-key": "error",
      "react/jsx-sort-props": "error",
      "react/sort-default-props": "error",
      "react/sort-comp": "error",
      "no-use-before-define": "error",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "off",
      eqeqeq: ["error", "always"],
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["sibling", "parent"],
            "index",
            "unknown",
          ],
          pathGroups: [
            {
              pattern: "react",
              group: "external",
              position: "before",
            },
          ],
          pathGroupsExcludedImportTypes: ["react"],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
      // Accessibility
      "jsx-a11y/anchor-is-valid": [
        "error",
        {
          aspects: ["invalidHref", "preferButton"],
        },
      ],
      "jsx-a11y/no-noninteractive-element-interactions": [
        "error",
        {
          handlers: [
            "onClick",
            "onMouseDown",
            "onMouseUp",
            "onKeyPress",
            "onKeyDown",
            "onKeyUp",
          ],
        },
      ],
      "promise/always-return": "error",
      "promise/no-return-wrap": "error",
      "promise/param-names": "error",
      "promise/catch-or-return": "error",
      "promise/no-native": "off",
      "promise/no-nesting": "warn",
      "promise/no-promise-in-callback": "warn",
      "promise/no-callback-in-promise": "warn",
      "promise/avoid-new": "warn",
      "promise/no-new-statics": "error",
      "promise/no-return-in-finally": "warn",
      "promise/valid-params": "warn",
      "promise/no-multiple-resolved": "error",
    },
  },
  {
    ignores: ["node_modules", "build"],
  },
]
