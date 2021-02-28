module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
        jest: true,
    },
    ignorePatterns: ["./.storybook/main.js"],
    extends: [
        "plugin:react/recommended",
        "airbnb",
        "prettier",
        "prettier/@typescript-eslint",
        "prettier/react",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2020,
        sourceType: "module",
    },
    plugins: ["react", "@typescript-eslint"],
    settings: {
        "import/resolver": {
            node: {
                extensions: [".js", ".jsx", ".ts", ".tsx"],
                moduleDirectory: ["node_modules", "src/"],
            },
        },
    },
    rules: {
        "no-use-before-define": "off",
        "@typescript-eslint/no-use-before-define": ["error"],
        "no-param-reassign": [
            "error",
            {
                props: true,
                ignorePropertyModificationsFor: ["state"],
            },
        ],
        "react/jsx-filename-extension": [
            1,
            { extensions: [".js", ".jsx", ".tsx"] },
        ],
        "import/extensions": 0,
        "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
        "no-unused-vars": ["off", { argsIgnorePattern: "props" }],
        "react/jsx-props-no-spreading": "off",
        "react/prop-types": "off",
        "import/prefer-default-export": "off",
        "import/order": [
            "warn",
            {
                groups: [
                    "builtin",
                    "external",
                    "internal",
                    "parent",
                    "sibling",
                    "index",
                ],
            },
        ],
    },
};
