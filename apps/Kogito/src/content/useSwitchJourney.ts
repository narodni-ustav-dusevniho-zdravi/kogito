import {gql, useMutation} from '@apollo/client';

import type {
  SwitchJourneyMutation,
  SwitchJourneyMutationVariables,
} from '~gql/graphql';

const mutation = gql`
  mutation switchJourney($id: ID!) {
    switchJourney(id: $id)
  }
`;

export const useSwitchJourney = () => {
  const [switchJourneyMutation] = useMutation<
    SwitchJourneyMutation,
    SwitchJourneyMutationVariables
  >(mutation);

  return {
    switchJourneyMutation,
  };
};
