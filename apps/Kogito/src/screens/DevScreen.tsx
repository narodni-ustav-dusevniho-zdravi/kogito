import React from 'react';
import {Text} from 'react-native';

import ENV from '~modules/env';
import {useNavigation} from '~modules/navigation';
import {ScreenContainer} from '~modules/ui';

import Button from '../components/primitives/Button';

export const DevScreen = () => {
  const {navigate} = useNavigation();
  return (
    <ScreenContainer title="Dev" type="static">
      <Text>{JSON.stringify(ENV, null, 2)}</Text>
      <Button title="Registration" onPress={() => navigate('Registration')} />
    </ScreenContainer>
  );
};
