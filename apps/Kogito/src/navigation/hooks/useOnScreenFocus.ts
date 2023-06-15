import {useFocusEffect} from '@react-navigation/native';
import useEventCallback from 'use-event-callback';

export const useOnScreenFocus = (cb: () => any) =>
  useFocusEffect(
    useEventCallback(() => {
      cb();
    }),
  );
