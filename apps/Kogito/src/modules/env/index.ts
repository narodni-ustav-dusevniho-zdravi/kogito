import {Platform} from 'react-native';
import * as Application from 'expo-application';
import * as Updates from 'expo-updates';

const USE_LOCAL_API = false as boolean;

type BuildType = 'DEVELOPMENT' | 'PRODUCTION';

const BUILD_TYPE: BuildType =
  Updates.channel === 'production' ? 'PRODUCTION' : 'DEVELOPMENT';

const ENV = {
  MIXPANEL_TOKEN:
    BUILD_TYPE === 'DEVELOPMENT'
      ? process.env.EXPO_PUBLIC_MIXPANEL_TOKEN_DEV
      : process.env.EXPO_PUBLIC_MIXPANEL_TOKEN,
  API_URL:
    USE_LOCAL_API && __DEV__
      ? 'http://127.0.0.1:3001/graphql'
      : 'https://prod-api.kogito.cz/graphql',
  IS_IOS: Platform.OS === 'ios',
  IS_DEV: BUILD_TYPE === 'DEVELOPMENT',
  VERSION: Application.nativeApplicationVersion,
};

export default ENV;
