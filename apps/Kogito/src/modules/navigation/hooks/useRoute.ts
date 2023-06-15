// eslint-disable-next-line no-restricted-imports
import {useRoute as _useRoute} from '@react-navigation/native';

import type {AppRouteProps, AppScreenName} from '../types';

export const useRoute = <T extends AppScreenName>(): AppRouteProps<T> =>
  _useRoute<AppRouteProps<T>>();
