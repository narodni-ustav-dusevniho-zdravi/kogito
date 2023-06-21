import dotenvParseVariables from 'dotenv-parse-variables';
// eslint-disable-next-line no-restricted-imports
import Config from 'react-native-config';

const useLocalApi = false;
export const ENV = {
  ...(dotenvParseVariables(
    Config as unknown as Record<string, string>,
  ) as typeof Config),
  API_URL:
    useLocalApi && __DEV__
      ? 'http://127.0.0.1:3001/graphql'
      : 'https://prod-api.kogito.cz/graphql',
  MODE: __DEV__ ? 'DEVELOPMENT' : 'PRODUCTION',
};
