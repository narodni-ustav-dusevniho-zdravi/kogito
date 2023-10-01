import type {NormalizedCacheObject} from '@apollo/client';
import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  fromPromise,
  gql,
  InMemoryCache,
} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {onError} from 'apollo-link-error';

import type {
  RefreshAccessTokenMutation,
  RefreshAccessTokenMutationVariables,
} from '~gql/graphql';
import {useAuthStore} from '~modules/auth';
import ENV from '~modules/env';

console.log('APOLLO USING:', ENV.API_URL);

let isRefreshing = false;
let pendingRequests: (() => void)[] = [];
// eslint-disable-next-line prefer-const
let apolloClient: ApolloClient<NormalizedCacheObject>;

const resolvePendingRequests = () => {
  pendingRequests.map(callback => callback());
  pendingRequests = [];
};

const refreshTokensAction = gql`
  mutation refreshAccessToken($input: RefreshTokensInput!) {
    refreshAccessToken(input: $input) {
      accessToken
      refreshToken
    }
  }
`;

const refreshAuthToken = async () => {
  console.log('refreshing token');
  const accessToken = useAuthStore.getState().actions.getAccessToken();
  const refreshToken = useAuthStore.getState().actions.getRefreshToken();
  if (!accessToken) {
    throw new Error('Cant refresh token, accessToken missing');
  }
  if (!refreshToken) {
    throw new Error('Cant refresh token, refreshToken missing');
  }

  const response = await apolloClient.mutate<
    RefreshAccessTokenMutation,
    RefreshAccessTokenMutationVariables
  >({
    mutation: refreshTokensAction,
    variables: {
      input: {
        accessToken,
        refreshToken,
      },
    },
  });

  console.log('response from refreshing', refreshToken);

  if (response.data?.refreshAccessToken) {
    useAuthStore.getState().actions.setTokens(response.data.refreshAccessToken);
    return;
  }

  throw new Error('Cant refresh token');
};

const targetEndPointLink = createHttpLink({
  uri: ENV.API_URL,
});

const authLink = setContext(() => {
  const accessToken = useAuthStore.getState().accessToken;
  console.log('USING ACCESS TOKEN', accessToken);
  return {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  };
});

// @ts-expect-error keep previous implementation to not accidentaly break something
const errorLink: ApolloLink = onError(({graphQLErrors, operation, forward}) => {
  console.log({graphQLErrors});
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      switch (err.message) {
        case 'Bad token': {
          useAuthStore.getState().actions.clearTokens();
          return forward(operation);
        }
        case 'Unauthorized':
          // eslint-disable-next-line no-case-declarations
          let forward$;

          // eslint-disable-next-line max-depth, no-negated-condition
          if (!isRefreshing) {
            isRefreshing = true;
            forward$ = fromPromise(
              refreshAuthToken()
                .then(() => {
                  // Store the new tokens for your auth link
                  resolvePendingRequests();
                  return true;
                })
                // eslint-disable-next-line no-loop-func
                .catch(() => {
                  pendingRequests = [];
                  // Handle token refresh errors e.g clear stored tokens, redirect to login, ...
                  throw new Error();
                })
                // eslint-disable-next-line no-loop-func
                .finally(() => {
                  isRefreshing = false;
                }),
            ).filter(value => Boolean(value));
          } else {
            // Will only emit once the Promise is resolved
            forward$ = fromPromise(
              // eslint-disable-next-line no-loop-func
              new Promise<void>(resolve => {
                pendingRequests.push(() => resolve());
              }),
            );
          }

          // @ts-expect-error keep previous implementation to not accidentaly break something
          return forward$.flatMap(() => forward(operation));
      }
    }
  }
});

apolloClient = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, targetEndPointLink]),
  cache: new InMemoryCache(),
});

export default apolloClient;
