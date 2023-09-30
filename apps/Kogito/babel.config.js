module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    [
      'module-resolver',
      {
        cwd: 'babelrc',
        extensions: ['.js', '.ios.js', '.android.js', '.json'],
        alias: {
          '~modules': './src/modules',
          '~assets': './src/assets',
          '~gql': './gql/__generated__',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
