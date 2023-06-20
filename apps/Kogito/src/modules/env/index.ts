import {Platform} from 'react-native';
// eslint-disable-next-line no-restricted-imports
import Config from 'react-native-config';
import dotenvParseVariables from 'dotenv-parse-variables';

const useLocalApi = false;
const ENV = {
  ...(dotenvParseVariables(
    Config as unknown as Record<string, string>,
  ) as typeof Config),
  API_URL:
    useLocalApi && __DEV__
      ? 'http://127.0.0.1:3001/graphql'
      : 'https://prod-api.kogito.cz/graphql',
  MODE: __DEV__ ? 'DEVELOPMENT' : 'PRODUCTION',
  IS_IOS: Platform.OS === 'ios',
};

export default ENV;
