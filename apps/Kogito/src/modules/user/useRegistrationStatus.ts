import {gql, useQuery} from '@apollo/client';

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

type RegisterStatus = {
  isCompleted: boolean;
  userLabel: `V${'a' | 'b' | 'c' | 'd' | 'e' | 'f'}`;
  journeysToChoose: string[];
  group: 'normal' | 'control';
};

export const useRegistrationStatus = () => {
  const {loading, refetch, data} = useQuery<{
    registrationStatus: RegisterStatus;
  }>(query);

  return {
    status: data?.registrationStatus,
    refetch,
    loading,
  };
};
