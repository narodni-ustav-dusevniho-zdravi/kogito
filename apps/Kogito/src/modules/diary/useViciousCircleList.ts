import {gql, useQuery} from '@apollo/client';

export type ViciousCircle = {
  id: string;
  date: string;
  name: string;
};

const ViciousCircleList = gql`
  query viciousCircleList($afterId: ID) {
    viciousCircleList(afterId: $afterId) {
      records {
        id
        name
        date
      }
      haveNext
    }
  }
`;

type UseViciousCircleList = () => {
  records: ViciousCircle[];
  haveNext: boolean;
  refetch: () => void;
};

export const useViciousCircleList: UseViciousCircleList = () => {
  const {data, error, refetch} = useQuery(ViciousCircleList);

  console.log({data, error});

  if (data) {
    return {
      records: data.viciousCircleList.records,
      haveNext: data.viciousCircleList.haveNext,
      refetch,
    };
  }

  return {
    records: [],
    haveNext: false,
    refetch,
  };
};
