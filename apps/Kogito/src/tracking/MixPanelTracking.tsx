import React, {createContext, useContext} from 'react';
import {Mixpanel} from 'mixpanel-react-native';

import {ENV} from '../env';

import AppState from './AppState';

const mixpanel = ENV.MIXPANEL_API_KEY
  ? new Mixpanel(ENV.MIXPANEL_API_KEY, true)
  : undefined;
mixpanel?.init();

const TrackingContext = createContext<Mixpanel | undefined>(undefined);

export const useMixPanelTrackingContext = () => useContext(TrackingContext);

const MixPanelTrackingProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <TrackingContext.Provider value={mixpanel}>
      <AppState>{children}</AppState>
    </TrackingContext.Provider>
  );
};

export default MixPanelTrackingProvider;
