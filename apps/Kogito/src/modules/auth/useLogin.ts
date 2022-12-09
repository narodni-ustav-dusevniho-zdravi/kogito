import {
  InitLoginAction,
  InitLoginActionInput,
  InitLoginActionResult,
  LoginAction,
  LoginActionInput,
  LoginActionResult,
} from './graphql';
import {MutationFunction, useMutation} from '@apollo/client';

type UseLogin = () => {
  initializeLoginMutation: MutationFunction<
    InitLoginActionResult,
    {input: InitLoginActionInput}
  >;
  loginMutation: MutationFunction<LoginActionResult, {input: LoginActionInput}>;
};

export const useLogin: UseLogin = () => {
  const [initializeLoginMutation] = useMutation<
    InitLoginActionResult,
    {input: InitLoginActionInput}
  >(InitLoginAction);

  const [loginMutation] = useMutation<
    LoginActionResult,
    {input: LoginActionInput}
  >(LoginAction);

  return {
    initializeLoginMutation,
    loginMutation,
  };
};
