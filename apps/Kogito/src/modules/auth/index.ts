import {createPersistedStore} from '~modules/common';

type State = {
  accessToken?: string;
  refreshToken?: string;
};

type Actions = {
  clearTokens: () => void;
  getAccessToken: () => string | undefined;
  getRefreshToken: () => string | undefined;
  setTokens: (s: State) => void;
};

export const useAuthStore = createPersistedStore<State, Actions>({
  name: 'auth',
  encrypt: true,
  defaultState: {},
  actions: (set, get) => ({
    setTokens: ({accessToken, refreshToken}) =>
      set({accessToken, refreshToken}),
    getAccessToken: () => get().accessToken,
    getRefreshToken: () => get().accessToken,
    clearTokens: () => set({accessToken: undefined, refreshToken: undefined}),
  }),
});
