import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import AuthReducer, {
  AuthAction,
  AuthState,
  finishAuthenticating,
} from './auth-reducer';
import ApolloClient from '../../apollo/client';
import {getAccessToken} from './api';
import useMixPanelTracking from '../../tracking/useMixPanelTracking';
import {MeQuery} from '../user/useMeQuery';

const initState = {
  accessToken: null,
  refreshToken: null,
  status: 'unknown',
} as AuthState;

type AuthContextState = {
  state: AuthState;
  dispatch: Dispatch<AuthAction>;
};

const AuthContext = createContext<AuthContextState>({
  state: initState,
  dispatch: () => {},
});

const useAuthContext = (): AuthContextState => useContext(AuthContext);

const AuthProvider: React.FC<PropsWithChildren> = ({children}) => {
  const {identifyUser} = useMixPanelTracking();
  const [state, dispatch] = useReducer<React.Reducer<AuthState, AuthAction>>(
    AuthReducer,
    initState,
  );

  // Update context value and trigger re-render
  // This patterns avoids unnecessary deep renders
  // https://reactjs.org/docs/context.html#caveats
  useEffect(() => {
    setContextValue((contextValue: AuthContextState) => ({
      ...contextValue,
      state,
    }));
  }, [state]);

  useEffect(() => {
    (async function load(): Promise<void> {
      try {
        let accessToken = await getAccessToken();

        if (accessToken) {
          const result = await ApolloClient.query({
            query: MeQuery,
          });

          await identifyUser(
            result.data.viewer.me.id,
            // result.data.viewer.me.email,
          );

          dispatch(finishAuthenticating(accessToken));
          return;
        } else {
          dispatch(finishAuthenticating(null));
          console.log('Missing tokens');
        }
      } catch (e) {
        dispatch(finishAuthenticating(null));
        console.log('User token not found', e);
      }
    })();
  }, []);

  const [contextValue, setContextValue] = useState<AuthContextState>({
    state,
    dispatch,
  });

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export {AuthProvider, useAuthContext};
