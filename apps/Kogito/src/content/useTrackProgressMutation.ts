import {gql, useMutation} from '@apollo/client';

import type {
  TrackProgressMutation,
  TrackProgressMutationVariables,
} from '~gql/graphql';

const mutation = gql`
  mutation trackProgress($input: TrackProgressInput!) {
    trackProgress(input: $input) {
      success
    }
  }
`;

export const useTrackProgressMutation = () => {
  const [trackProgressMutation] = useMutation<
    TrackProgressMutation,
    TrackProgressMutationVariables
  >(mutation);

  return trackProgressMutation;
};
