// eslint-disable-next-line no-restricted-imports
import {useNavigation as _useNavigation} from '@react-navigation/native';

import type {AppNavigationProps, AppScreenName} from '../types';

export const useNavigation = <
  T extends AppScreenName,
>(): AppNavigationProps<T> => _useNavigation<AppNavigationProps<T>>();
