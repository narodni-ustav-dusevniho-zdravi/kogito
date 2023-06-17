import React from 'react';
import {ScrollView, View} from 'react-native';

import {type AppScreen, useOnScreenFocus} from '~modules/navigation';

import MainContainer from '../components/container/MainContainer';
import MainContainerWrapper from '../components/container/MainContainerWrapper';
import Button from '../components/primitives/Button';
import ColoredSafeAreaView from '../components/primitives/ColoredSafeAreaView';
import Text from '../components/primitives/Text';
import QuestionnaireWidget from '../questionnaire/components/QuestionnaireWidget';
import {useUserQuestionnairesQuery} from '../questionnaire/useUserQuestionnairesQuery';
import {useMeQuery} from '../user/useMeQuery';

const AvailableQuestionnairesScreen: AppScreen<'AvailableQuestionnaires'> = ({
  navigation: {navigate},
}) => {
  const {userQuestionnaires, userState, loading, refetch} =
    useUserQuestionnairesQuery();
  // eslint-disable-next-line no-empty-pattern
  const {} = useMeQuery();

  useOnScreenFocus(() => refetch());

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
                count={10}
                finished={!!userState?.userInfoCompleted}
                name="Základní údaje"
                press={() =>
                  !userState?.userInfoCompleted &&
                  navigate('FinishRegistrationScreen')
                }
              />

              {userQuestionnaires &&
                userQuestionnaires.map(item => (
                  <QuestionnaireWidget
                    key={item.id}
                    count={item.questionnaire.questionCount}
                    finished={item.finished}
                    name={item.questionnaire.name}
                    press={() =>
                      !item.finished &&
                      navigate('QuestionnaireScreen', {
                        id: item.id,
                      })
                    }
                  />
                ))}
            </View>
            <Text style={{marginTop: 14}}>
              Vyplnění celého dotazníku zabere cca 15 minut.
            </Text>
            {allFinished && (
              <Button
                style={{
                  marginTop: 14,
                }}
                title="Dokončit"
                onPress={() => navigate('QuestionnaireResultScreen')}
              />
            )}
            {/*<Button*/}
            {/*  title="Začít"*/}
            {/*  onPress={() => navigate('Dashboard')}*/}
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
