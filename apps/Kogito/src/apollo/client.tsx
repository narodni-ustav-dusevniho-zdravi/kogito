import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  fromPromise,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import {onError} from 'apollo-link-error';
import Config from 'react-native-config';
import {
  getAccessToken,
  getRefreshToken,
  saveTokens,
} from '../modules/auth/useAuth';
import {setContext} from '@apollo/client/link/context';
import {RefreshTokensAction} from '../modules/auth/graphql';

const uri = Config.API_CORE; //'https://prod-api.kogito.cz/graphql';
//('http://127.0.0.1:3001/graphql'); //'https://prod-api.kogito.cz/graphql'; //'https://prod-api.kogito.cz/graphql', // API_CORE,

console.log('APOLLO USING:', uri);

let isRefreshing = false;
// @ts-ignore
let pendingRequests = [];
let apolloClient: ApolloClient<NormalizedCacheObject>;

const resolvePendingRequests = () => {
  // @ts-ignore
  pendingRequests.map(callback => callback());
  pendingRequests = [];
};

const refreshAuthToken = async () => {
  console.log('refreshing token');
  const accessToken = await getAccessToken();
  const refreshToken = await getRefreshToken();

  const response = await apolloClient.mutate({
    mutation: RefreshTokensAction,
    variables: {
      input: {
        accessToken,
        refreshToken,
      },
    },
  });

  console.log('response from refreshing', refreshToken);

  if (response.data?.refreshAccessToken) {
    await saveTokens(
      response.data.refreshAccessToken.accessToken,
      response.data.refreshAccessToken.refreshToken,
    );
    return;
  }

  throw new Error('Cant refresh token');
};

const targetEndPointLink = createHttpLink({
  uri,
});

const authLink = setContext(async () => {
  const accessToken = await getAccessToken();
  console.log('USING ACCESS TOKEN', accessToken);
  return {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  };
});

// @ts-ignore
const errorLink = onError(({graphQLErrors, operation, forward}) => {
  console.log({graphQLErrors});
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      switch (err.message) {
        case 'Unauthorized':
          let forward$;

          if (!isRefreshing) {
            isRefreshing = true;
            forward$ = fromPromise(
              refreshAuthToken()
                .then(() => {
                  // Store the new tokens for your auth link
                  resolvePendingRequests();
                  return true;
                })
                .catch(() => {
                  pendingRequests = [];
                  // Handle token refresh errors e.g clear stored tokens, redirect to login, ...
                  throw new Error();
                })
                .finally(() => {
                  isRefreshing = false;
                }),
            ).filter(value => Boolean(value));
          } else {
            // Will only emit once the Promise is resolved
            forward$ = fromPromise(
              new Promise(resolve => {
                // @ts-ignore
                pendingRequests.push(() => resolve());
              }),
            );
          }

          // @ts-ignore
          return forward$.flatMap(() => forward(operation));
      }
    }
  }
});

apolloClient = new ApolloClient({
  // @ts-ignore
  link: ApolloLink.from([errorLink, authLink, targetEndPointLink]),
  cache: new InMemoryCache(),
});

export default apolloClient;
