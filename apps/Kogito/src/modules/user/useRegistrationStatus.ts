import {gql, useQuery} from '@apollo/client';

const query = gql`
  {
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
  userLabel: string;
  journeysToChoose: string[];
  group: 'normal' | 'control';
};

type UseRegistrationStatus = () => {
  status: RegisterStatus | null;
  refetch: () => void;
  loading: boolean;
};

export const useRegistrationStatus: UseRegistrationStatus = () => {
  const {loading, refetch, data} = useQuery(query);

  return {
    status: data?.registrationStatus || null,
    refetch,
    loading,
  };
};
