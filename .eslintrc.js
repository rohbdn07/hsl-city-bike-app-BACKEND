module.exports = {
    parser: "@typescript-eslint/parser",
    extends: ["prettier"],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
    },
    env: {
        es6: true,
        node: true,
    },
    rules: {
        "no-var": "error",
        semi: 0,
        bracketSameLine: 0,

        // indent: ["error", 2, { SwitchCase: 1 }],
        // "no-multi-spaces": "error",
        // "space-in-parens": "error",
        // "prefer-const": "error",
    },
};
