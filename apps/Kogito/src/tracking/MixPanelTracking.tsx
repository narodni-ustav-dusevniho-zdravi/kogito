import React, {FC, createContext, useContext} from 'react';
import {Mixpanel} from 'mixpanel-react-native';
import AppState from './AppState';
import {MIXPANEL} from '@env';

const mixpanel = new Mixpanel(MIXPANEL as string);
mixpanel.init();

const TrackingContext = createContext<Mixpanel>({} as Mixpanel);

export const useMixPanelTrackingContext = () => useContext(TrackingContext);

const MixPanelTrackingProvider: FC = ({children}) => {
  return (
    <TrackingContext.Provider value={mixpanel}>
      <AppState>{children}</AppState>
    </TrackingContext.Provider>
  );
};

export default MixPanelTrackingProvider;
