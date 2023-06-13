import type React from 'react';
import {useEffect, useRef, useState} from 'react';
import {AppState} from 'react-native';

import {logEvent} from './eventLogging';

export const AppStateTracking: React.FC = () => {
  const appState = useRef(AppState.currentState);
  const [, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    const listener = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        logEvent('Application opened');
        console.log('App has come to the foreground!');
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    });

    return () => {
      listener.remove();
    };
  }, []);

  return null;
};
