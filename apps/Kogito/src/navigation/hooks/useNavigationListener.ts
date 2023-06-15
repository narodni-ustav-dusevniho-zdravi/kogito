import {useEffect} from 'react';
import type {NavigationProp} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import useEventCallback from 'use-event-callback';

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
