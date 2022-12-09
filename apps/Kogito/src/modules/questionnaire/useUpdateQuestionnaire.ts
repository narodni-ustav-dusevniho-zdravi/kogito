import {gql, useMutation} from '@apollo/client';
import {useCallback} from 'react';
import {UserAnswer} from './useQuestionnaireDetail';

const UpdateQuestionnaireMutation = gql`
  mutation updateQuestionnaire($input: UserQuestionnaireInput!) {
    updateQuestionnaire(input: $input) {
      id
      finished
    }
  }
`;

export const useUpdateQuestionnaire = () => {
  const [save] = useMutation(UpdateQuestionnaireMutation);

  const saveUserQuestionnaire = useCallback(
    async (id: string, answers: UserAnswer[]) => {
      await save({
        variables: {
          input: {
            id,
            answers,
          },
        },
      });
    },
    [save],
  );

  return {
    saveUserQuestionnaire,
  };
};
