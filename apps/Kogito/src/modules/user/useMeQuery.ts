import {ApolloError, useQuery} from '@apollo/client';
import {MeQuery, MeQueryResult} from './graphql';

type UseMeQuery = () => {
  me: MeQueryResult | null;
  haveActiveQuestionnaire: boolean;
  refetch: () => void;
  loading: boolean;
  error?: ApolloError;
  updateCacheValue: (newData: MeQueryResult) => void;
};

export const useMeQuery: UseMeQuery = () => {
  const {loading, error, data, refetch} = useQuery<{
    viewer: {me: MeQueryResult; haveActiveQuestionnaire: boolean};
  }>(MeQuery);

  console.log({error, data});

  const updateCacheValue = (newData: MeQueryResult) => {
    // client.writeQuery({
    //   query: MeQuery,
    //   data: {
    //     viewer: {
    //       __typename: 'Viewer',
    //       me: newData,
    //     },
    //   },
    // });
  };

  return {
    me: data?.viewer.me || null,
    haveActiveQuestionnaire: data?.viewer.haveActiveQuestionnaire || false,
    refetch,
    loading,
    error,
    updateCacheValue,
  };
};
