module.exports = {
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'react-native/no-inline-styles': 'error',
        'react/jsx-no-literals': 'error',
        '@typescript-eslint/no-floating-promises': 'error',
      },
    },
  ],
};
