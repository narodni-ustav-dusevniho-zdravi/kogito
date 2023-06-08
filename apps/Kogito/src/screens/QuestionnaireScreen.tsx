import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import ProgressBar from '../components/primitives/ProgressBar/ProgressBar';
import Text from '../components/primitives/Text';
import {useQuestionnaire} from '../modules/questionnaire/useQuestionnaire';
import Answer from '../modules/questionnaire/components/Answer/';
import Button from '../components/primitives/Button/Button';
import ChapterHeader from '../components/primitives/ChapterHeader/ChapterHeader';
import MainContainer from '../components/container/MainContainer/MainContainer';
import MainContainerWrapper from '../components/container/MainContainerWrapper/MainContainerWrapper';
import styled from 'styled-components/native';
import ButtonBack from '../components/primitives/ButtonBack';
import {RegistrationStackParamList} from '../navigation/Navigation';

export const Footer = styled.View`
  flex-direction: row;
`;
export const Questions = styled.View``;
export const AnswerWrapper = styled.View`
  margin-top: 20px;
`;

const QuestionnaireScreen: React.FC = () => {
  const navigation = useNavigation();
  const route =
    useRoute<
      RouteProp<{params: RegistrationStackParamList['QuestionnaireScreen']}>
    >();

  const {
    actualQuestion,
    actualAnswer,
    previousQuestion,
    nextQuestion,
    havePrevious,
    haveNext,
    saveAnswer,
    finished,
    questionCount,
    actualIndex,
  } = useQuestionnaire(route.params.id);

  useEffect(() => {
    if (finished) {
      navigation.navigate('AvailableQuestionnaires');
    }
  }, [finished]);

  if (!actualQuestion) {
    return <Text>Loading</Text>;
  }

  return (
    <SafeAreaView>
      <MainContainerWrapper>
        <ProgressBar value={actualIndex} max={questionCount} />
        <MainContainer
          alignVertical="between"
          style={{paddingTop: 24, paddingBottom: 56}}>
          <ChapterHeader
            left={
              <Text textVariant="questionNumber">
                {(actualIndex + 1).toString()}
              </Text>
            }
            right={
              <Text textVariant={'textSmall'}>{`zbývá ${
                questionCount - 1 - actualIndex
              } otázek`}</Text>
            }
          />
          <ScrollView>
            <Questions>
              <Text textVariant={'header'}>{actualQuestion.question}</Text>
              <AnswerWrapper>
                {actualQuestion.answers.map((answer, index) => (
                  <Answer
                    key={index}
                    index={index}
                    selected={actualAnswer === index}
                    answer={answer.answer}
                    press={i => saveAnswer(i)}
                  />
                ))}
              </AnswerWrapper>
            </Questions>
          </ScrollView>
          <Footer>
            {havePrevious && (
              <ButtonBack
                onPress={previousQuestion}
                style={{marginRight: 16}}
              />
            )}
            {haveNext && <Button title="Pokračovat" onPress={nextQuestion} />}
          </Footer>
        </MainContainer>
      </MainContainerWrapper>
    </SafeAreaView>
  );
};

export default QuestionnaireScreen;
