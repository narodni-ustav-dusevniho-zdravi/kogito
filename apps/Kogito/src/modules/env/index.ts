import {Platform} from 'react-native';
import dotenvParseVariables from 'dotenv-parse-variables';

type Env = {
  MIXPANEL_API_KEY?: string;
};

//Explicitly defined so its loaded by Expo
const processEnv = Object.entries({
  MIXPANEL_API_KEY: process.env.EXPO_PUBLIC_MIXPANEL_API_KEY,
}).reduce<Record<keyof Env, string>>((acc, [key, value]) => {
  if (value == null) return acc;
  return {...acc, [key]: value};
}, {} as Record<keyof Env, string>);

const USE_LOCAL_API = false as boolean;
const ENV = {
  ...(dotenvParseVariables(processEnv) as Env),
  API_URL:
    USE_LOCAL_API && __DEV__
      ? 'http://127.0.0.1:3001/graphql'
      : 'https://prod-api.kogito.cz/graphql',
  MODE: __DEV__ ? 'DEVELOPMENT' : 'PRODUCTION',
  IS_IOS: Platform.OS === 'ios',
};

export default ENV;
