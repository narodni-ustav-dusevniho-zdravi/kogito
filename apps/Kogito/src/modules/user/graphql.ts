import {gql} from '@apollo/client';

export type MeQueryResult = {
  firstName: string;
  lastName: string;
  email: string;
  finishedRegistration: string;
  userInfoCompleted: boolean;
  afterMonthQuestionnaire: boolean;
  age: number | null;
  dateOfBirth: string | null;
  maritalStatus: number | null;
  maritalStatusDescription: string | null;
  numberOfChildren: number | null;
  educationalAttainment: number | null;
  population: number | null;
};

export const MeQuery = gql`
  {
    viewer {
      id
      me {
        id
        firstName
        lastName
        email
        finishedRegistration
        userInfoCompleted
        age
        dateOfBirth
        maritalStatus
        maritalStatusDescription
        numberOfChildren
        educationalAttainment
        population
      }
      haveActiveQuestionnaire
    }
  }
`;

export type FinishRegistrationActionInput = {
  firstName: string;
  lastName: string;
  email: string;
  userInfoCompleted: boolean;
  age: number | null;
  dateOfBirth: string | null;
  maritalStatus: number | null;
  maritalStatusDescription: string | null;
  numberOfChildren: number | null;
  educationalAttainment: number | null;
  population: number | null;
  actualState: number | null;
};

export type FinishRegistrationActionResult = {
  finishRegistration: {
    success: boolean;
    viewer: {
      me: MeQueryResult;
    };
  };
};

export const FinishRegistrationAction = gql`
  mutation finishRegistration($input: FinishRegistrationInput!) {
    finishRegistration(input: $input) {
      success
      viewer {
        me {
          firstName
          lastName
          email
          finishedRegistration
          userInfoCompleted
          age
          dateOfBirth
          maritalStatus
          maritalStatusDescription
          numberOfChildren
          educationalAttainment
          population
        }
      }
    }
  }
`;
