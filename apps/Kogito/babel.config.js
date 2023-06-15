module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        cwd: 'babelrc',
        extensions: ['.js', '.ios.js', '.android.js', '.json'],
        alias: {
          '~modules': './src/modules',
        },
      },
    ],
    //Reanimated plugin has to be listed last.
    'react-native-reanimated/plugin',
  ],
};
