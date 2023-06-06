import React, {useCallback} from 'react';
import {ScrollView, View} from 'react-native';
import MainContainer from '../components/container/MainContainer';
import Text from '../components/primitives/Text';
import {useUserQuestionnairesQuery} from '../modules/questionnaire/useUserQuestionnairesQuery';
import QuestionnaireWidget from '../modules/questionnaire/components/QuestionnaireWidget';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Button from '../components/primitives/Button';
import MainContainerWrapper from '../components/container/MainContainerWrapper';
import {useMeQuery} from '../modules/user/useMeQuery';
import ColoredSafeAreaView from '../components/primitives/ColoredSafeAreaView';

const AvailableQuestionnairesScreen: React.FC = () => {
  const navigation = useNavigation();
  const {userQuestionnaires, userState, loading, refetch} =
    useUserQuestionnairesQuery();
  const {} = useMeQuery();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  if (!userQuestionnaires && loading) {
    return <Text textVariant="header">Loading</Text>;
  }

  const allFinished =
    userQuestionnaires?.filter(item => !item.finished).length === 0 &&
    !!userState?.userInfoCompleted;

  return (
    <ColoredSafeAreaView>
      <MainContainerWrapper>
        <ScrollView>
          <MainContainer align="left" style={{marginBottom: 48}}>
            <Text textVariant="header">Dotazník</Text>

            <View style={{marginTop: 15, width: '100%'}}>
              <QuestionnaireWidget
                press={() =>
                  !userState?.userInfoCompleted &&
                  navigation.navigate('FinishRegistrationScreen')
                }
                name="Základní údaje"
                finished={!!userState?.userInfoCompleted}
                count={10}
              />

              {userQuestionnaires &&
                userQuestionnaires.map(item => (
                  <QuestionnaireWidget
                    key={item.id}
                    press={() =>
                      !item.finished &&
                      navigation.navigate('QuestionnaireScreen', {
                        id: item.id,
                      })
                    }
                    name={item.questionnaire.name}
                    finished={item.finished}
                    count={item.questionnaire.questionCount}
                  />
                ))}
            </View>
            <Text style={{marginTop: 14}}>
              Vyplnění celého dotazníku zabere cca 15 minut.
            </Text>
            {allFinished && (
              <Button
                title="Dokončit"
                onPress={() => navigation.navigate('QuestionnaireResultScreen')}
                style={{
                  marginTop: 14,
                }}
              />
            )}
            {/*<Button*/}
            {/*  title="Začít"*/}
            {/*  onPress={() => navigation.navigate('Dashboard')}*/}
            {/*  style={{*/}
            {/*    marginTop: 14,*/}
            {/*  }}*/}
            {/*/>*/}
          </MainContainer>
        </ScrollView>
      </MainContainerWrapper>
    </ColoredSafeAreaView>
  );
};

export default AvailableQuestionnairesScreen;
