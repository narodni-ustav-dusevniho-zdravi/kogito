import {gql, useQuery} from '@apollo/client';

import type {RegistrationStatusQuery} from '~gql/graphql';

const query = gql`
  query RegistrationStatus {
    registrationStatus {
      isCompleted
      userLabel
      journeysToChoose
      group
    }
  }
`;

export const useRegistrationStatus = () => {
  const {loading, refetch, data} = useQuery<RegistrationStatusQuery>(query);

  return {
    status: data?.registrationStatus,
    refetch,
    loading,
  };
};
