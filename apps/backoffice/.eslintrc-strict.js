module.exports = {
    extends: './.eslintrc.js',
    rules: {
        'prettier/prettier': ['error'],
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                'vars': 'all',
                'args': 'none'
            }
        ],
    },
};
