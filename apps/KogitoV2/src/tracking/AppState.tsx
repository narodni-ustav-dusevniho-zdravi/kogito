import React, {PropsWithChildren, useEffect, useState} from 'react';
import {useRef} from 'react';
import {AppState} from 'react-native';
import useMixPanelTracking from './useMixPanelTracking';

const AppStateListener: React.FC<PropsWithChildren> = ({children}) => {
  const appState = useRef(AppState.currentState);
  const [, setAppStateVisible] = useState(appState.current);
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

    const listener = AppState.addEventListener('change', subscription);

    return () => {
      listener.remove();
    };
  }, []);

  return <>{children}</>;
};

export default AppStateListener;
