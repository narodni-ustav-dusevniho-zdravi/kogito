import RNConfig from 'react-native-config';

export const Config = {
  ...RNConfig,
  API_CORE: 'https://prod-api.kogito.cz/graphql',
  //('http://127.0.0.1:3001/graphql'); //'https://prod-api.kogito.cz/graphql'; //'https://prod-api.kogito.cz/graphql', // API_CORE,
  MODE: 'DEVELOPMENT' || 'PRODUCTION',
  USE_SIGNPOST: 'true' || 'false',
  MIXPANEL: 'fooo',
};
