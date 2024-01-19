module.exports = {
    root: true,
    env: {
        browser: true,
        node: false,
        jest: true,
        mongo: false,
        es6: true
    },
    plugins: ['prefer-arrow', 'ternary', 'promise', 'import', 'jsx-a11y', "@typescript-eslint"],
    extends: ['plugin:react-hooks/recommended', 'plugin:ternary/recommended', 'plugin:promise/recommended', 'plugin:import/errors', 'plugin:import/warnings', 'eslint:recommended', 'plugin:react/recommended', 'airbnb', 'airbnb-typescript', 'airbnb/hooks', 'plugin:jsx-a11y/strict', 'eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:@typescript-eslint/recommended-requiring-type-checking', 'plugin:storybook/recommended'],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true,
            impliedStrict: 'true'
        },
        "ecmaVersion": 12, // Версия стандарта JavaScript. Последний 12 (2021).
        "sourceType": "module", // Позволяет использовать import/export
        project: './tsconfig.json'
    },
    ignorePatterns: ['*.cjs', 'src/reportWebVitals.js', 'src/reportWebVitals.ts'],
    rules: {
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-misused-promises': 'off',
        'max-len': 'off', 'ternary/no-unreachable': 'off',
        '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
        '@typescript-eslint/no-unused-expressions': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        'no-useless-return': 'off',
        '@typescript-eslint/brace-style': 'off',
        'default-case': 'off',
        'react-hooks/exhaustive-deps': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        "linebreak-style": 'off',
        'no-underscore-dangle': ['error', {
            allow: ['_id', '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'],
            enforceInMethodNames: true,
            allowAfterThis: true
        }],
        'jsx-quotes': ['error', 'prefer-single'],
        'react/jsx-closing-bracket-location': ['error', 'after-props'],
        'class-methods-use-this': ['error'],
        'react/jsx-filename-extension': [1, {
            extensions: ['.js', '.jsx', '.ts', '.tsx']
        }],
        'react/forbid-prop-types': [0],
        "react/function-component-definition": ['error', {
            'namedComponents': 'arrow-function',
            'unnamedComponents': 'arrow-function'
        }],
        'prefer-arrow/prefer-arrow-functions': [
            'warn',
            {
                disallowPrototype: true,
                singleReturnOnly: true,
                classPropertiesAllowed: false,
            },
        ],
        'default-param-last': 'off',
    },
};