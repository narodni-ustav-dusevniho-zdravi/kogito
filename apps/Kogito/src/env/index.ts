// eslint-disable-next-line no-restricted-imports
import RNConfig from 'react-native-config';

const useLocalApi = false;

export const ENV = {
  ...RNConfig,
  API_URL:
    useLocalApi && __DEV__
      ? 'http://127.0.0.1:3001/graphql'
      : 'https://prod-api.kogito.cz/graphql',
  MODE: __DEV__ ? 'DEVELOPMENT' : 'PRODUCTION',
  MIXPANEL_API_KEY: 'fooo', //TODO:
};
