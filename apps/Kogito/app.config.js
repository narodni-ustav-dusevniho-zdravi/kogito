// eslint-disable-next-line @typescript-eslint/no-var-requires
const version = require('./package.json').version;

module.exports = {
  name: 'Kogito',
  slug: 'kogito',
  version,
  orientation: 'portrait',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    icon: './assets/app_icon_ios.png',
    supportsTablet: true,
    bundleIdentifier: 'com.kraina.martin.kogito',
  },
  android: {
    icon: './assets/ic_launcher.png',
    adaptiveIcon: {
      foregroundImage: './assets/app_icon_android.png',
      backgroundColor: '#ffffff',
    },
    package: 'com.kraina.martin.kogito',
  },
  web: {
    favicon: './assets/favicon.png',
  },
};
