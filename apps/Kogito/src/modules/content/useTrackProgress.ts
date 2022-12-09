import {gql, MutationFunction, useMutation} from '@apollo/client';

type TrackProgressInput = {
  id: string;
  progress: number;
};

type TrackProgressResult = {
  success: boolean;
};

type UseTrackProgress = () => {
  trackProgressMutation: MutationFunction<
    TrackProgressResult,
    {input: TrackProgressInput}
  >;
};

export const TrackProgressAction = gql`
  mutation trackProgress($input: TrackProgressInput!) {
    trackProgress(input: $input) {
      success
    }
  }
`;

export const useTrackProgress: UseTrackProgress = () => {
  const [trackProgressMutation] = useMutation<
    TrackProgressResult,
    {input: TrackProgressInput}
  >(TrackProgressAction);

  return {
    trackProgressMutation,
  };
};
