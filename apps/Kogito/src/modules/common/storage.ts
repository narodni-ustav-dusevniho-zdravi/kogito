import {MMKV} from 'react-native-mmkv';
import {create} from 'zustand';
import {
  createJSONStorage,
  persist,
  subscribeWithSelector,
} from 'zustand/middleware';

const defaultStorage = new MMKV();

const createStorageFacade = (storage: MMKV) => ({
  getItem: (key: string) => storage.getString(key) || null,
  setItem: (key: string, value: string) => storage.set(key, value),
  removeItem: (key: string) => storage.delete(key),
});

const createPersistedJSONStorage = (encryptionKey?: string) => {
  const storage = encryptionKey
    ? new MMKV({id: encryptionKey, encryptionKey})
    : defaultStorage;
  return createJSONStorage(() => createStorageFacade(storage));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Actions = Record<string, (...args: any[]) => void>;

// eslint-disable-next-line @typescript-eslint/ban-types
type State = {};

type StateWithActions<S extends State, A extends Actions | undefined> = S & {
  actions: A;
};

export type PersistedStoreConfig<
  S extends State,
  A extends Actions | undefined = undefined,
> = {
  defaultState: S;
  name: string;
  encrypt?: boolean;
} & (undefined extends A
  ? {actions?: undefined}
  : {
      actions: (
        set: (
          partial:
            | StateWithActions<S, A>
            | Partial<StateWithActions<S, A>>
            | ((
                state: StateWithActions<S, A>,
              ) => StateWithActions<S, A> | Partial<StateWithActions<S, A>>),
          replace?: boolean | undefined,
        ) => void,
        get: () => S,
      ) => A;
    });

export const createPersistedStore = <
  S extends State,
  A extends Actions | undefined = undefined,
>({
  defaultState,
  actions,
  name,
  encrypt,
}: PersistedStoreConfig<S, A>) =>
  create<StateWithActions<S, A>>()(
    subscribeWithSelector(
      persist(
        (set, get) =>
          ({
            ...defaultState,
            actions: actions?.(set, get),
          } as StateWithActions<S, A>),
        {
          name,
          version: 1,
          migrate: persistedState => {
            if (persistedState && typeof persistedState === 'object') {
              return {
                ...defaultState,
                ...persistedState,
              } as StateWithActions<S, A>;
            }
            return defaultState as StateWithActions<S, A>;
          },
          storage: createPersistedJSONStorage(encrypt ? name : undefined),
          partialize: state => ({...state, actions: undefined}),
        },
      ),
    ),
  );
