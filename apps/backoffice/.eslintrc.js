const path = require('path');
const tsConfigFile = path.resolve(__dirname, 'tsconfig.json');

module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    plugins: ['@typescript-eslint'],
    parserOptions: {
        project: tsConfigFile,
        tsconfigRootDir: __dirname,
        ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
        ecmaFeatures: {
            jsx: true, // Allows for the parsing of JSX
        },
    },
    settings: {
        react: {
            version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
        }
    },
    extends: [
        'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    ],
    rules: {
        // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
        // e.g. "@typescript-eslint/explicit-function-return-type": "off",
        'object-curly-spacing': ['warn', 'always'],
        'prettier/prettier': ['warn'],
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
            'warn',
            {
                'vars': 'all',
                'args': 'none'
            }
        ],
        '@typescript-eslint/naming-convention': 'off',
        // '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-explicit-any': [
            'error',
            {
                ignoreRestArgs: true,
            },
        ],
        '@typescript-eslint/no-empty-function': 'off',
        'max-len': [
            'warn',
            {
                code: 120,
                ignoreStrings: true,
                ignoreTemplateLiterals: true,
                ignoreComments: true,
            },
        ],
        'no-plusplus': [
            'error',
            {
                allowForLoopAfterthoughts: true,
            },
        ],
        'react/jsx-key': 'error',
        'import/no-extraneous-dependencies': 'off',
        'react/jsx-props-no-spreading': 'off',
        'import/prefer-default-export': 'off',
        'react/jsx-boolean-value': ['error', 'always'],
        'react/prop-types': 'off',
        'react/no-unescaped-entities': 'error',
        'react/jsx-one-expression-per-line': 'off',
        'react/jsx-wrap-multilines': 'off',
        'react/destructuring-assignment': 'off',
    },
};
