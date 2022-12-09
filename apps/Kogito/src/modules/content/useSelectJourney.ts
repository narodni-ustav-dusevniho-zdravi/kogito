import {gql, MutationFunction, useMutation} from '@apollo/client';

type UseSelectJourney = () => {
  selectJourneyMutation: MutationFunction;
};

const SelectJourneyAction = gql`
  mutation selectJourney($id: ID) {
    selectJourney(id: $id)
  }
`;

export const useSelectJourney: UseSelectJourney = () => {
  const [selectJourneyMutation] = useMutation(SelectJourneyAction);

  return {
    selectJourneyMutation,
  };
};
