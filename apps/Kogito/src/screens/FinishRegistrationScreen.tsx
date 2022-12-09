import React, {FC, useCallback} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import MainContainerWrapper from '../components/container/MainContainerWrapper/MainContainerWrapper';
import MainContainer from '../components/container/MainContainer/MainContainer';
import Text from '../components/primitives/Text';
import FinishRegistrationForm from '../modules/auth/form/FinishRegistrationForm';
import {StackScreenProps} from '@react-navigation/stack';

const FinishRegistrationScreen: FC<StackScreenProps<any>> = ({navigation}) => {
  const handleSuccess = useCallback(() => {
    navigation.replace('AvailableQuestionnaires');
  }, [navigation]);

  return (
    <SafeAreaView>
      <MainContainerWrapper>
        <MainContainer
          align={null}
          alignVertical="between"
          style={{paddingTop: 24, paddingBottom: 56}}>
          <ScrollView>
            <Text textVariant={'header'}>
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
