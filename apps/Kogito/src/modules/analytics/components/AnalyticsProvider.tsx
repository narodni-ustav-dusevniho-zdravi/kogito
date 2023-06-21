import type {PropsWithChildren} from 'react';
import React, {useLayoutEffect, useState} from 'react';

import {initEventLogging} from '../utils';

export const AnalyticsProvider: React.FC<PropsWithChildren> = ({children}) => {
  const [ready, setReady] = useState(false);
  useLayoutEffect(() => {
    initEventLogging()
      .catch(e => console.warn('Unable to initiate analytics', e))
      .finally(() => setReady(true));
  }, []);
  if (!ready) return null;
  return <>{children}</>;
};
