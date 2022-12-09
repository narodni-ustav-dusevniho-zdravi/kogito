import {gql, ApolloError, useQuery} from '@apollo/client';

const UserQuestionnairesQuery = gql`
  {
    userQuestionnaires {
      id
      finished
      questionnaire {
        id
        name
        questionCount
      }
    }
    viewer {
      me {
        userInfoCompleted
      }
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

type UserState = {
  userInfoCompleted: boolean;
};

type UserQuestionnaires = () => {
  userQuestionnaires: UserQuestionnaire[] | null;
  userState: UserState | null;
  refetch: () => void;
  loading: boolean;
  error?: ApolloError;
};

export const useUserQuestionnairesQuery: UserQuestionnaires = () => {
  const {loading, error, data, refetch} = useQuery(UserQuestionnairesQuery, {});

  return {
    userQuestionnaires: data?.userQuestionnaires,
    userState: data?.viewer.me,
    refetch,
    loading,
    error,
  };
};
