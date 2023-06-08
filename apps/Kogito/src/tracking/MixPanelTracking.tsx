import React, {PropsWithChildren, createContext, useContext} from 'react';
import {Mixpanel} from 'mixpanel-react-native';
import AppState from './AppState';
import {ENV} from '../env';

const mixpanel = new Mixpanel(ENV.MIXPANEL_API_KEY, true);
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
