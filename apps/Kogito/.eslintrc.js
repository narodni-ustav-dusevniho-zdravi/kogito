module.exports = {
  root: true,
  extends: ['@react-native-community', '@mkraina/eslint-config-base'],
  rules: {
    'react-native/no-inline-styles': 'warn', //TODO: remove
    'react/jsx-no-literals': 'warn', //TODO: remove
    '@typescript-eslint/no-floating-promises': 'off', //TODO: remove
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
