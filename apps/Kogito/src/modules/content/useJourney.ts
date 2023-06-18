import {useQuery} from '@apollo/client';
import {JourneyQuery, JourneyQueryResult, UserJourney} from './graphql';

type UseJourney = (journeyId: string) => {
  journey: UserJourney | null;
  refetch: () => void;
};

export const useJourney: UseJourney = (journeyId: string) => {
  const {data, loading, error, refetch} = useQuery<JourneyQueryResult>(
    JourneyQuery,
    {
      variables: {
        id: journeyId,
      },
    },
  );

  console.log({data, loading, error});

  if (data) {
    return {
      journey: data.journey,
      refetch,
    };
  }

  return {
    journey: null,
    refetch,
  };
};
