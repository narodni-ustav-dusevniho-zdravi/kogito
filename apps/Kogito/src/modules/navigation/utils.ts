import * as React from 'react';
import type {NavigationContainerRef} from '@react-navigation/native';

import type {AppParamList, AppScreenName, NavigationFunction} from './types';

export const navigationRef =
  React.createRef<NavigationContainerRef<AppParamList>>();

export const getCurrentRoute = () =>
  navigationRef.current?.getCurrentRoute() as
    | {name: AppScreenName; params: AppParamList[AppScreenName]}
    | undefined;

export const navigate: NavigationFunction = (...args) =>
  navigationRef.current?.navigate(
    ...(args as unknown as Parameters<
      NavigationContainerRef<AppParamList>['navigate']
    >),
  );
