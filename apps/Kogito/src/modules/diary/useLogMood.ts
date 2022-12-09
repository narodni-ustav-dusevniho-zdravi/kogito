import {gql, MutationFunction, useMutation} from '@apollo/client';

export type Mood = 'SATISFIED' | 'HAPPY' | 'OKAY' | 'SAD' | 'VERYSAD';

type LogMoodInput = {
  mood: Mood;
};

type LogMoodResult = {
  logMood: {
    last: null | Mood;
  };
};

const LogMoodAction = gql`
  mutation logMood($input: LogMoodInput!) {
    logMood(input: $input) {
      last
    }
  }
`;

type UseLogMood = MutationFunction<LogMoodResult, {input: LogMoodInput}>;

export const useLogMood = (): UseLogMood => {
  const [logMoodMutation] = useMutation<UseLogMood>(LogMoodAction);

  return logMoodMutation;
};
