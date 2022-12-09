import React, {FC, useEffect, useState} from 'react';
import {useRef} from 'react';
import {AppState} from 'react-native';
import useMixPanelTracking from './useMixPanelTracking';

const AppStateListener: FC = ({children}) => {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const {trackApplicationOpened} = useMixPanelTracking();

  useEffect(() => {
    // @ts-ignore
    const subscription = nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        trackApplicationOpened();
        console.log('App has come to the foreground!');
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    };

    AppState.addEventListener('change', subscription);

    return () => {
      AppState.removeEventListener('change', subscription);
    };
  }, []);

  return <>{children}</>;
};

export default AppStateListener;
