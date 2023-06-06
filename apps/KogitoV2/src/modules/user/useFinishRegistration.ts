import {
  FinishRegistrationMutation,
  FinishRegistrationMutationVariables,
} from '../../../gql/__generated__/graphql';

import {gql, useMutation} from '@apollo/client';
const mutation = gql`
  mutation finishRegistration($input: FinishRegistrationInput!) {
    finishRegistration(input: $input) {
      success
      viewer {
        me {
          firstName
          lastName
          email
          finishedRegistration
          userInfoCompleted
          age
          dateOfBirth
          maritalStatus
          maritalStatusDescription
          numberOfChildren
          educationalAttainment
          population
        }
      }
    }
  }
`;
export const useFinishRegistration = () => {
  const [finishRegistrationMutation] = useMutation<
    FinishRegistrationMutation,
    FinishRegistrationMutationVariables
  >(mutation);

  return {
    finishRegistrationMutation,
  };
};
