import {gql, useMutation} from '@apollo/client';

import type {
  InitLoginMutation,
  InitLoginMutationVariables,
  LoginMutation,
  LoginMutationVariables,
} from '~gql/graphql';

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
