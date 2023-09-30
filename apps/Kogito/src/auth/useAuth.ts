import {useCallback} from 'react';

import {useAuthStore} from '~modules/auth';

import {useAuthContext} from './auth-context';
import {finishAuthenticating, reset} from './auth-reducer';

export const useAuth = () => {
  const {state, dispatch} = useAuthContext();
  const saveTokens = useAuthStore(s => s.actions.setTokens);
  const removeTokens = useAuthStore(s => s.actions.clearTokens);
  const setTokens = useCallback(
    (accessToken: string, refreshToken: string) => {
      dispatch(finishAuthenticating(accessToken));

      saveTokens({accessToken, refreshToken});

      return;
    },
    [dispatch, saveTokens],
  );

  const clearTokens = useCallback(() => {
    removeTokens();

    dispatch(reset());
  }, [dispatch, removeTokens]);

  return {
    setTokens,
    clearTokens,
    status: state.status,
    accessToken: state.accessToken,
    refreshToken: state.refreshToken,
  };
};
