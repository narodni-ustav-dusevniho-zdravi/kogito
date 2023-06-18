import {gql, ApolloError, useQuery} from '@apollo/client';

const QuestionnaireDetailQuery = gql`
  query questionnaireDetail($id: ID!) {
    questionnaireDetail(id: $id) {
      id
      answers {
        questionId
        answerIndex
      }
      questionnaire {
        name
        questionCount
        questions {
          id
          question
          answers {
            answer
          }
        }
      }
    }
  }
`;

export type Answer = {
  answer: string;
};

export type Question = {
  id: string;
  question: string;
  answers: Answer[];
};

export type UserAnswer = {
  questionId: string;
  answerIndex: number | null;
};

type Questionnaire = {
  name: string;
  questionCount: number;
  questions: Question[];
};

type UserQuestionnaire = {
  id: string;
  answers: UserAnswer[];
  questionnaire: Questionnaire;
} | null;

type QuestionnaireDetail = (id: string) => {
  questionnaire: UserQuestionnaire;
  loading: boolean;
  error?: ApolloError;
};

export const useQuestionnaireDetail: QuestionnaireDetail = (id: string) => {
  const {loading, error, data} = useQuery(QuestionnaireDetailQuery, {
    variables: {
      id,
    },
  });

  return {
    questionnaire: data?.questionnaireDetail,
    loading,
    error,
  };
};
