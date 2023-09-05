import {useCallback, useEffect, useState} from 'react';

import type {Question, UserAnswer} from '~gql/graphql';

import {useQuestionnaireDetail} from './useQuestionnaireDetail';
import {useUpdateQuestionnaire} from './useUpdateQuestionnaire';

// eslint-disable-next-line max-lines-per-function
export const useQuestionnaireBackup = (id: string) => {
  const {questionnaire} = useQuestionnaireDetail(id);
  const {saveUserQuestionnaire} = useUpdateQuestionnaire();

  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);

  const [actualAnswer, setActualAnswer] = useState<number | null>(null);
  const [actualQuestion, setActualQuestion] = useState<Question | null>(null);

  const [havePrevious, setHavePrevious] = useState(false);
  const [haveNext, setHaveNext] = useState(false);
  const [finished, setFinished] = useState(false);

  const saveProgress = useCallback(async () => {
    if (!userAnswers.length) return;
    await saveUserQuestionnaire(id, userAnswers);
  }, [saveUserQuestionnaire, id, userAnswers]);

  const solvePosition = useCallback(async () => {
    if (!questionnaire) return;
    const savePromise = saveProgress();

    const questions = questionnaire.questionnaire.questions;

    const index = actualQuestion ? questions.indexOf(actualQuestion) : 0;

    setHavePrevious(index >= 0);
    setHaveNext(questions.length >= index);

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (actualQuestion && userAnswers) {
      const haveAnswer = userAnswers.find(
        answer => answer.questionId === actualQuestion.id,
      );

      setActualAnswer(haveAnswer ? haveAnswer.answerIndex : null);
    } else {
      setActualAnswer(null);
    }

    await savePromise;
  }, [
    questionnaire,
    actualQuestion,
    setHavePrevious,
    setHaveNext,
    userAnswers,
    setActualAnswer,
    saveProgress,
  ]);

  const previousQuestion = useCallback(async () => {
    if (questionnaire && actualQuestion) {
      const questions = questionnaire.questionnaire.questions;
      const index = questions.indexOf(actualQuestion);
      const nextQuestion = questions[index - 1];
      if (nextQuestion) {
        setActualQuestion(nextQuestion);
      }
    }

    await solvePosition();
  }, [questionnaire, actualQuestion, solvePosition]);

  // eslint-disable-next-line max-statements
  const nextQuestion = useCallback(async () => {
    let applyFinished = false;
    if (questionnaire) {
      const questions = questionnaire.questionnaire.questions;
      let next = null;
      if (actualQuestion) {
        const index = questions.indexOf(actualQuestion);

        if (questions.length > index + 1) {
          next = questions[index + 1];
        }

        if (questions.length === index + 1) {
          applyFinished = true;
        }
      } else if (questions.length) {
        next = questions[0];
        console.log({next});

        const prepare = questionnaire.answers.map(answer => {
          return {
            answerIndex: answer.answerIndex,
            questionId: answer.questionId,
          };
        });
        setUserAnswers(prepare);
      }

      if (next) {
        setActualQuestion(next);
      }
    }

    await solvePosition();

    if (applyFinished) {
      setFinished(true);
    }
  }, [
    questionnaire,
    setUserAnswers,
    actualQuestion,
    setActualQuestion,
    setFinished,
    solvePosition,
  ]);

  const saveAnswer = useCallback(
    (index: number) => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (!actualQuestion || !userAnswers) return;
      setActualAnswer(index);

      const answers = [...userAnswers];

      const answer = answers.find(a => a.questionId === actualQuestion.id);

      if (answer) {
        const answerIndex = answers.indexOf(answer);

        console.log({answers, answerIndex});
        // @ts-expect-error keep previous implementation to not accidentaly break something
        answers[answerIndex].answerIndex = index;
      } else {
        answers.push({
          questionId: actualQuestion.id,
          answerIndex: index,
        });
      }

      setUserAnswers(answers);
    },
    [setActualAnswer, userAnswers, setUserAnswers, actualQuestion],
  );

  useEffect(() => {
    console.log('Effect', questionnaire);
    setActualQuestion(null);
    setActualAnswer(null);

    setHavePrevious(false);
    setHaveNext(false);
    setFinished(false);

    setUserAnswers([]);

    if (questionnaire) {
      nextQuestion().then();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionnaire]);

  return {
    actualQuestion,
    actualAnswer,

    havePrevious,
    haveNext,
    finished,

    saveAnswer,
    previousQuestion,
    nextQuestion,
  };
};