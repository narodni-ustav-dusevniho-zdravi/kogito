import {gql, MutationFunction, useMutation} from '@apollo/client';

export const SwitchJourneyAction = gql`
  mutation switchJourney($id: ID!) {
    switchJourney(id: $id)
  }
`;

export const useSwitchJourney = () => {
  const [switchJourneyMutation] = useMutation(SwitchJourneyAction);

  return {
    switchJourneyMutation,
  };
};
