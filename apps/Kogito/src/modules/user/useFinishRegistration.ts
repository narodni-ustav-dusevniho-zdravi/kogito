import {
  FinishRegistrationAction,
  FinishRegistrationActionInput,
  FinishRegistrationActionResult,
} from './graphql';
import {MutationFunction, useMutation} from '@apollo/client';

type UseFinishRegistration = () => {
  finishRegistrationMutation: MutationFunction<
    FinishRegistrationActionResult,
    {input: FinishRegistrationActionInput}
  >;
};

export const useFinishRegistration: UseFinishRegistration = () => {
  const [finishRegistrationMutation] = useMutation<
    FinishRegistrationActionResult,
    {input: FinishRegistrationActionInput}
  >(FinishRegistrationAction);

  return {
    finishRegistrationMutation,
  };
};
