import {useFocusEffect} from '@react-navigation/native';
import useEventCallback from 'use-event-callback';

export const useOnScreenFocus = (cb: () => void) =>
  useFocusEffect(
    useEventCallback(() => {
      cb();
    }),
  );
