import {gql, MutationFunction, useMutation} from '@apollo/client';

const EditProfileAction = gql`
  mutation editProfile($input: EditProfileInput!) {
    editProfile(input: $input) {
      viewer {
        me {
          firstName
          lastName
        }
      }
    }
  }
`;

export type EditProfileInput = {
  firstName: string;
  lastName: string;
};

type EditProfileResult = {};

type UseEditProfile = () => {
  editProfileMutation: MutationFunction<
    EditProfileResult,
    {input: EditProfileInput}
  >;
};

export const useEditProfile: UseEditProfile = () => {
  const [editProfileMutation] = useMutation<
    EditProfileResult,
    {input: EditProfileInput}
  >(EditProfileAction);

  return {
    editProfileMutation,
  };
};
