import {
  InitLoginMutation,
  InitLoginMutationVariables,
  LoginMutation,
  LoginMutationVariables,
} from '../../../gql/__generated__/graphql';
import {gql, useMutation} from '@apollo/client';

const LoginAction = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      accessToken
      refreshToken
    }
  }
`;

const InitLoginAction = gql`
  mutation initLogin($input: InitLoginInput!) {
    initLogin(input: $input) {
      usePassword
      useSmsCode
    }
  }
`;

export const useLogin = () => {
  const [initializeLoginMutation] = useMutation<
    InitLoginMutation,
    InitLoginMutationVariables
  >(InitLoginAction);

  const [loginMutation] = useMutation<LoginMutation, LoginMutationVariables>(
    LoginAction,
  );

  return {
    initializeLoginMutation,
    loginMutation,
  };
};
