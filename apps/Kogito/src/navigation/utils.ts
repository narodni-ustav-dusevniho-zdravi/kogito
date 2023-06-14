import * as React from 'react';
import type {NavigationContainerRef} from '@react-navigation/native';

import type {AppParamList, AppScreenName} from './Navigation';

export const navigationRef =
  React.createRef<NavigationContainerRef<AppParamList>>();

export const getCurrentRoute = () =>
  navigationRef.current?.getCurrentRoute() as
    | {name: AppScreenName; params: AppParamList[AppScreenName]}
    | undefined;
