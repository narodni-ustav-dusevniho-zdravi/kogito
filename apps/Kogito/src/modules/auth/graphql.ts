import {gql} from '@apollo/client';

export type LoginActionInput = {
  phoneNumber: string;
  password: string;
};

export type LoginActionResult = {
  login: {
    accessToken: string;
    refreshToken: string;
  };
};

export type RefreshTokensInput = {};

export const LoginAction = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      accessToken
      refreshToken
    }
  }
`;

export type InitLoginActionInput = {
  phoneNumber: string;
};

export type InitLoginActionResult = {
  initLogin: {
    usePassword: boolean;
    useSmsCode: boolean;
  };
};

export const InitLoginAction = gql`
  mutation login($input: InitLoginInput!) {
    initLogin(input: $input) {
      usePassword
      useSmsCode
    }
  }
`;

export const RefreshTokensAction = gql`
  mutation refreshAccessToken($input: RefreshTokensInput!) {
    refreshAccessToken(input: $input) {
      accessToken
      refreshToken
    }
  }
`;
