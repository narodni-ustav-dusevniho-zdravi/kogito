import {gql, ApolloError, useQuery} from '@apollo/client';

const Query = gql`
  {
    currentUserQuestionnaires {
      occasion
      questionnaires {
        id
        finished
        questionnaire {
          id
          name
          questionCount
        }
      }
    }
    viewer {
      haveActiveQuestionnaire
    }
    registrationStatus {
      journeysToChoose
    }
  }
`;

type Questionnaire = {
  id: string;
  name: string;
  questionCount: number;
};

type UserQuestionnaire = {
  id: string;
  finished: boolean;
  questionnaire: Questionnaire;
};

type CurrentUserQuestionnaires = {
  occasion: number;
  questionnaires: UserQuestionnaire[];
};

type UserQuestionnaires = () => {
  haveActiveQuestionnaire: boolean;
  haveToChooseJourney: boolean;
  questionnaire: CurrentUserQuestionnaires | null;

  refetch: () => void;
  loading: boolean;
  error?: ApolloError;
};

export const useAfterMonthQuestionnaireQuery: UserQuestionnaires = () => {
  const {loading, error, data, refetch} = useQuery(Query);

  console.log({data});

  return {
    haveActiveQuestionnaire: data?.viewer.haveActiveQuestionnaire || false,
    haveToChooseJourney:
      data?.registrationStatus.journeysToChoose.length > 0 || false,
    questionnaire: data?.currentUserQuestionnaires || null,

    refetch,
    loading,
    error,
  };
};
