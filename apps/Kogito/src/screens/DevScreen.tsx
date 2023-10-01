import React from 'react';
import {ScrollView, Text} from 'react-native';

import ENV from '~modules/env';

export const DevScreen = () => {
  return (
    <ScrollView>
      <Text>{JSON.stringify(ENV, null, 2)}</Text>
    </ScrollView>
  );
};
