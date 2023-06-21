module.exports = {
  root: true,
  extends: ['@react-native-community', '@mkraina/eslint-config-base'],
  rules: {
    'max-lines-per-function': [
      'error',
      {max: 75, skipBlankLines: true, skipComments: true},
    ],
    'react-native/no-inline-styles': 'warn', //TODO: remove
    'react/jsx-no-literals': 'warn', //TODO: remove
    'max-statements': ['error', 15],
    '@typescript-eslint/no-floating-promises': 'off', //TODO: remove
    '@typescript-eslint/no-explicit-any': 'warn', //TODO: remove
    'require-await': 'warn', //TODO: remove
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'react-native-config',
            message:
              'Please use ENV from src/env which uses react-native-config internally instead',
          },
        ],
        patterns: [
          {
            group: ['@react-navigation/*'],
            importNames: ['useRoute', 'useNavigation'],
            message:
              'Import from project `navigation` module as there is better type coverage :)',
          },
        ],
      },
    ],
  },
};
