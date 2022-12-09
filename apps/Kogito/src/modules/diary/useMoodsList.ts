import {gql, useQuery} from '@apollo/client';
import {MoodCount} from '../content/graphql';

export type MoodList = {
  id: string;
  date: Date;
  mood: 'HAPPY' | 'SAD' | 'ANGRY' | 'OKAY';
};

export const MoodListQuery = gql`
  query moodsList($afterId: ID) {
    moodsList(afterId: $afterId) {
      records {
        id
        date
        mood
      }
      moodsCount {
        mood
        count
      }
      haveNext
    }
  }
`;

type MoodListQuery = {
  moodsList: {
    records: MoodList[];
    moodsCount: MoodCount[];
    haveNext: boolean;
  };
};

type UseMoodsList = () => {
  records: MoodList[];
  moodsCount: MoodCount[];
  haveNext: boolean;
  refetch: () => void;
};

export const useMoodsList: UseMoodsList = () => {
  const {data, error, refetch} = useQuery<MoodListQuery>(MoodListQuery, {
    variables: {
      afterId: null,
    },
  });

  console.log({data, error});

  if (data) {
    return {
      records: data.moodsList.records,
      moodsCount: data.moodsList.moodsCount,
      haveNext: data.moodsList.haveNext,
      refetch,
    };
  }

  return {
    records: [],
    moodsCount: [],
    haveNext: false,
    refetch,
  };
};
