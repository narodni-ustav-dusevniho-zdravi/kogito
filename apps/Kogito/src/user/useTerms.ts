import {createPersistedStore} from '~modules/common';

type State = {
  haveSeenTerms: boolean;
};

type Actions = {
  setTermsSeen: (seen: boolean) => void;
};

export const useTerms = createPersistedStore<State, Actions>({
  name: 'terms',
  defaultState: {haveSeenTerms: false},
  actions: set => ({setTermsSeen: seen => set({haveSeenTerms: seen})}),
});
