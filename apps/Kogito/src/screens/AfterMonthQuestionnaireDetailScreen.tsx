import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import styled from 'styled-components/native';

import type {AppScreen} from '~modules/navigation';
import {ScrollView} from '~modules/ui';

import MainContainer from '../components/container/MainContainer/MainContainer';
import MainContainerWrapper from '../components/container/MainContainerWrapper/MainContainerWrapper';
import Button from '../components/primitives/Button/Button';
import ButtonBack from '../components/primitives/ButtonBack';
import ChapterHeader from '../components/primitives/ChapterHeader/ChapterHeader';
import ProgressBar from '../components/primitives/ProgressBar/ProgressBar';
import Text from '../components/primitives/Text';
import Answer from '../questionnaire/components/Answer/';
import {useQuestionnaire} from '../questionnaire/useQuestionnaire';

export const Footer = styled.View`
  flex-direction: row;
`;
export const Questions = styled.View``;
export const AnswerWrapper = styled.View`
  margin-top: 20px;
`;

const AfterMonthQuestionnaireDetailScreen: AppScreen<'AfterMonthQuestionnaireDetail'> =
  ({navigation: {navigate}, route}) => {
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
        navigate('AfterMonthQuestionnaire');
      }
    }, [finished, navigate]);

    if (!actualQuestion) {
      return <Text>Loading</Text>;
    }

    return (
      <SafeAreaView>
        <MainContainerWrapper>
          <ProgressBar max={questionCount} value={actualIndex} />
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
                <Text textVariant="textSmall">{`zbývá ${
                  questionCount - 1 - actualIndex
                } otázek`}</Text>
              }
            />
            <ScrollView>
              <Questions>
                <Text textVariant="header">{actualQuestion.question}</Text>
                <AnswerWrapper>
                  {actualQuestion.answers.map((answer, index) => (
                    <Answer
                      key={index}
                      answer={answer.answer}
                      index={index}
                      press={i => saveAnswer(i)}
                      selected={actualAnswer === index}
                    />
                  ))}
                </AnswerWrapper>
              </Questions>
            </ScrollView>
            <Footer>
              {havePrevious && (
                <ButtonBack
                  style={{marginRight: 16}}
                  onPress={previousQuestion}
                />
              )}
              {haveNext && <Button title="Pokračovat" onPress={nextQuestion} />}
            </Footer>
          </MainContainer>
        </MainContainerWrapper>
      </SafeAreaView>
    );
  };

export default AfterMonthQuestionnaireDetailScreen;
