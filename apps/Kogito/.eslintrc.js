module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    'react-native/no-inline-styles': 'off', //TODO: turn on
    'react-hooks/exhaustive-deps': 'warn',
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
      },
    ],
  },
};
