import React, {PropsWithChildren, createContext, useContext} from 'react';
import {Mixpanel} from 'mixpanel-react-native';
import AppState from './AppState';
import {Config} from '../configuration';

const mixpanel = new Mixpanel(Config.MIXPANEL, true);
mixpanel.init();

const TrackingContext = createContext<Mixpanel>({} as Mixpanel);

export const useMixPanelTrackingContext = () => useContext(TrackingContext);

const MixPanelTrackingProvider: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <TrackingContext.Provider value={mixpanel}>
      <AppState>{children}</AppState>
    </TrackingContext.Provider>
  );
};

export default MixPanelTrackingProvider;
