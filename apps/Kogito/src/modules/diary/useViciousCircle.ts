import {gql, MutationFunction, useMutation, useQuery} from '@apollo/client';

export type ViciousCircle = {
  id: string;
  date: string;
  name: string;
  trigger: string[];
  negativeThoughts: string[];
  emotions: string[];
  physicalSymptoms: string[];
  behaviour: string[];
};

export type ViciousCircleInput = {
  id: string | null;
  name: string;
  trigger: string[];
  negativeThoughts: string[];
  emotions: string[];
  physicalSymptoms: string[];
  behaviour: string[];
};

const ViciousCircle = gql`
  query viciousCircle($id: ID!) {
    viciousCircle(id: $id) {
      id
      date
      name
      trigger
      negativeThoughts
      emotions
      physicalSymptoms
      behaviour
    }
  }
`;

const CurrentViciousCircle = gql`
  query currentViciousCircle {
    currentViciousCircle {
      id
      date
      name
      trigger
      negativeThoughts
      emotions
      physicalSymptoms
      behaviour
    }
  }
`;

const ViciousCircleMutation = gql`
  mutation editViciousCircle($input: EditViciousCircleInput!) {
    editViciousCircle(input: $input) {
      id
      name
      date
      trigger
      negativeThoughts
      emotions
      physicalSymptoms
      behaviour
    }
  }
`;

type UseViciousCircle = () => {
  viciousCircle: ViciousCircle | null;
  refetch: () => void;
  save: MutationFunction<ViciousCircle, {input: ViciousCircleInput}>;
};

export const useViciousCircle: UseViciousCircle = () => {
  // const {data, error, refetch} = useQuery(ViciousCircle, {
  //   authorizedOnly: true,
  //   variables: {
  //     id,
  //   },
  //   skip: id === null,
  // });

  const {data, refetch} = useQuery(CurrentViciousCircle);

  const [save] = useMutation(ViciousCircleMutation);

  if (data) {
    return {
      viciousCircle: data.currentViciousCircle,
      refetch,
      save,
    };
  }

  return {
    viciousCircle: null,
    refetch,
    save,
  };
};
