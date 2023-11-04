import {useEffect} from 'react';
import {Alert} from 'react-native';
import type {NavigationProp} from '@react-navigation/native';
// eslint-disable-next-line no-restricted-imports
import {useNavigation} from '@react-navigation/native';
import useEventCallback from 'use-event-callback';

import {navigationRef} from '../utils';

/*
  The return type is a hacky way to get the full param type for `beforeRemove` event,
  while keeping `void` return on the hook itself
*/
export const useNavigationListener: NavigationProp<ReactNavigation.RootParamList>['removeListener'] =
  (...[type, callback]) => {
    const {addListener} = useNavigation();
    const onEvent = useEventCallback(callback);
    useEffect(() => addListener(type, onEvent), [addListener, onEvent, type]);
  };

export const useSaveOnClose = (save: () => Promise<void>) => {
  useNavigationListener('beforeRemove', e => {
    e.preventDefault();
    const performAction = async () => {
      try {
        await save();
        navigationRef.current?.dispatch(e.data.action);
      } catch (error) {
        Alert.alert('Změny se nepodařilo uložit', '', [
          {text: 'Zkusit znovu', style: 'cancel', onPress: performAction},
          {
            text: 'Zrušit',
            style: 'destructive',
            // If the user confirmed, then we dispatch the action we blocked earlier
            // This will continue the action that had triggered the removal of the screen
            onPress: () => navigationRef.current?.dispatch(e.data.action),
          },
        ]);
      }
    };
    void performAction();
  });
};
