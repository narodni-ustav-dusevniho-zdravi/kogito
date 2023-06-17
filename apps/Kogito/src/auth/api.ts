import RNSecureStorage, {ACCESSIBLE} from 'rn-secure-storage';

let loaded = false;
let currentAccessToken: string | null = null;
let currentRefreshToken: string | null = null;

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
