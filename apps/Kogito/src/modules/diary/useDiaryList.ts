import {gql, useQuery} from '@apollo/client';

export type DiaryEntry = {
  id: string;
  date: string;
  previewText: string;
};

const DiaryQuery = gql`
  query diaryList($afterId: ID) {
    diaryList(afterId: $afterId) {
      records {
        id
        date
        previewText
      }
      haveNext
    }
  }
`;

type DiaryQuery = {
  diaryList: {
    records: DiaryEntry[];
    haveNext: boolean;
  };
};

type UseDiaryList = () => {
  records: DiaryEntry[];
  haveNext: boolean;
  refetch: () => void;
};

export const useDiaryList: UseDiaryList = () => {
  const {data, error, refetch} = useQuery<DiaryQuery>(DiaryQuery);

  console.log({data, error});

  if (data) {
    return {
      records: data.diaryList.records,
      haveNext: data.diaryList.haveNext,
      refetch,
    };
  }

  return {
    records: [],
    haveNext: false,
    refetch,
  };
};
