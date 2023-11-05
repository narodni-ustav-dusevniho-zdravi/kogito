import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {Platform, StatusBar as RNStatusBar} from 'react-native';

interface Props {
  content?: 'dark' | 'light';
  hidden?: boolean;
}

const transparentBackgroundSupported =
  Platform.OS === 'ios' || Number(Platform.Version) >= 23;

export const StatusBar = React.memo<Props>(
  ({content = 'dark', hidden = false}) => {
    return (
      <RNStatusBar
        backgroundColor={
          transparentBackgroundSupported ? 'transparent' : 'black'
        }
        barStyle={
          content === 'dark' && transparentBackgroundSupported
            ? 'dark-content'
            : 'light-content'
        }
        hidden={hidden}
        translucent={transparentBackgroundSupported}
      />
    );
  },
);

export default StatusBar;
