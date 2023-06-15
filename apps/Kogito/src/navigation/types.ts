import type {AppParamList, AppScreenName} from './Navigation';

export type NavigationFunction = <RouteName extends AppScreenName>(
  ...args: undefined extends AppParamList[RouteName]
    ? [screen: RouteName] | [screen: RouteName, params: AppParamList[RouteName]]
    : [screen: RouteName, params: AppParamList[RouteName]]
) => void;
