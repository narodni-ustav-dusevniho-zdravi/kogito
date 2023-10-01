module.exports = {
  root: true,
  extends: ['@react-native-community', '@mkraina/eslint-config-base'],
  rules: {
    'react-native/no-inline-styles': 'warn', //TODO: remove + remove from src/modules/.eslintrc.js
    'react/jsx-no-literals': 'warn', //TODO:  remove + remove from src/modules/.eslintrc.js
    '@typescript-eslint/no-floating-promises': 'off', //TODO:  remove + remove from src/modules/.eslintrc.js
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'react-native',
            importNames: ['Modal'],
            message: 'Please use Modal from ui lib instead.',
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
