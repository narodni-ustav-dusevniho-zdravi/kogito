import React from 'react';
import {Text} from 'react-native';

import ENV from '~modules/env';
import {ScreenContainer} from '~modules/ui';

export const DevScreen = () => {
  return (
    <ScreenContainer title="Dev" type="static">
      <Text>{JSON.stringify(ENV, null, 2)}</Text>
    </ScreenContainer>
  );
};
