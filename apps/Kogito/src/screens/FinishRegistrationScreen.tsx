import React, {useCallback} from 'react';
import {SafeAreaView} from 'react-native';

import type {AppScreen} from '~modules/navigation';
import {ScrollView} from '~modules/ui';

import FinishRegistrationForm from '../auth/form/FinishRegistrationForm';
import MainContainer from '../components/container/MainContainer/MainContainer';
import MainContainerWrapper from '../components/container/MainContainerWrapper/MainContainerWrapper';
import Text from '../components/primitives/Text';

const FinishRegistrationScreen: AppScreen<'FinishRegistrationScreen'> = ({
  navigation: {replace},
}) => {
  const handleSuccess = useCallback(() => {
    replace('AvailableQuestionnaires');
  }, [replace]);

  return (
    <SafeAreaView>
      <MainContainerWrapper>
        <MainContainer
          alignVertical="between"
          style={{paddingTop: 24, paddingBottom: 56}}>
          <ScrollView>
            <Text textVariant="header">
              Abychom mohli vyhodnocovat jak Kogito funguje tak o Vás
              potřebujeme znát Vaše základní demografické údaje.
            </Text>
            <FinishRegistrationForm onSuccess={handleSuccess} />
          </ScrollView>
        </MainContainer>
      </MainContainerWrapper>
    </SafeAreaView>
  );
};

export default FinishRegistrationScreen;
