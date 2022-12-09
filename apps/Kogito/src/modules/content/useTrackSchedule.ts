import {gql, MutationFunction, useMutation} from '@apollo/client';

type TrackScheduleInput = {
  id: string;
  checked: boolean;
};

type TrackScheduleResult = {
  success: boolean;
};

type UseTrackSchedule = () => {
  trackScheduleMutation: MutationFunction<
    TrackScheduleResult,
    {input: TrackScheduleInput}
  >;
};

export const TrackScheduleAction = gql`
  mutation trackSchedule($input: TrackScheduleInput!) {
    trackSchedule(input: $input) {
      success
    }
  }
`;

export const useTrackSchedule: UseTrackSchedule = () => {
  const [trackScheduleMutation] = useMutation<
    TrackScheduleResult,
    {input: TrackScheduleInput}
  >(TrackScheduleAction);

  return {
    trackScheduleMutation,
  };
};
