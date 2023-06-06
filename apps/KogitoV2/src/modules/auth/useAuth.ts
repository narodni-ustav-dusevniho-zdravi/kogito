import {useAuthContext} from './auth-context';
import {useCallback} from 'react';
import {finishAuthenticating, reset} from './auth-reducer';
import {removeTokens, saveTokens} from './api';

export const useAuth = () => {
  const {state, dispatch} = useAuthContext();

  const setTokens = useCallback(
    async (accessToken: string, refreshToken: string) => {
      dispatch(finishAuthenticating(accessToken));

      await saveTokens(accessToken, refreshToken);

      return;
    },
    [dispatch],
  );

  const clearTokens = useCallback(async () => {
    await removeTokens();

    dispatch(reset());
  }, [dispatch]);

  return {
    setTokens,
    clearTokens,
    status: state.status,
    accessToken: state.accessToken,
    refreshToken: state.refreshToken,
  };
};
