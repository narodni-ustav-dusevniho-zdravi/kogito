import {useAuthContext} from './auth-context';
import {useCallback} from 'react';
import {finishAuthenticating, reset} from './auth-reducer';
import RNSecureStorage, {ACCESSIBLE} from 'rn-secure-storage';
import {AuthStatus} from './auth-types';

let loaded = false;
let currentAccessToken: string | null = null;
let currentRefreshToken: string | null = null;

type UseAuth = () => {
  status: AuthStatus;

  accessToken: string | null;
  refreshToken: string | null;

  setTokens: (accessToken: string, refreshToken: string) => Promise<void>;
  clearTokens: () => Promise<void>;
};

export const saveTokens = async (accessToken: string, refreshToken: string) => {
  console.log('save tokens!', accessToken, refreshToken);

  currentAccessToken = accessToken;
  currentRefreshToken = refreshToken;

  await Promise.all([
    RNSecureStorage.set('auth.accessToken', accessToken, {
      accessible: ACCESSIBLE.ALWAYS,
    }),
    RNSecureStorage.set('auth.refreshToken', refreshToken, {
      accessible: ACCESSIBLE.ALWAYS,
    }),
  ]);
};

export const removeTokens = async () => {
  currentAccessToken = null;
  currentRefreshToken = null;

  await Promise.all([
    RNSecureStorage.remove('auth.accessToken'),
    RNSecureStorage.remove('auth.refreshToken'),
  ]);
};

const loadTokens = async () => {
  if (!loaded) {
    if (await RNSecureStorage.exists('auth.accessToken')) {
      const [accessToken, refreshToken] = await Promise.all([
        RNSecureStorage.get('auth.accessToken'),
        RNSecureStorage.get('auth.refreshToken'),
      ]);

      currentAccessToken = accessToken;
      currentRefreshToken = refreshToken;
    }

    loaded = true;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  await loadTokens();

  return currentAccessToken;
};

export const getRefreshToken = async (): Promise<string | null> => {
  await loadTokens();

  return currentRefreshToken;
};

export const useAuth: UseAuth = () => {
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
