import {BackofficeApolloLink} from './useDataProvider';
import {gql} from '@apollo/client';

const LoginAction = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      accessToken
    }
  }
`;

const MeQuery = gql`
  {
    me {
      firstName
      lastName
    }
  }
`;

type LoginInput = {
  username: string;
  password: string;
};

const useAuthProvider = () => {
  const login = async ({username, password}: LoginInput) => {
    const result = await BackofficeApolloLink.mutate({
      mutation: LoginAction,
      variables: {
        input: {username, password},
      },
    });

    localStorage.setItem('auth', result.data.login.accessToken);

    return Promise.resolve();
  };

  const logout = () => {
    localStorage.removeItem('auth');
    return Promise.resolve();
  };

  const checkAuth = async () => {
    if (!localStorage.getItem('auth')) {
      throw new Error('Missing auth');
    }

    const result = await BackofficeApolloLink.query({
      query: MeQuery,
    });

    if (result.data.me.firstName) {
      return {
        name: 'name',
        username: 'lol',
      };
    } else {
      throw new Error('Missing auth');
    }
  };

  const getPermissions = () => {
    return Promise.reject();
  };

  const checkError = () => {};

  return {
    login,
    logout,
    checkAuth,
    getPermissions,
    checkError,
  };
};
export default useAuthProvider;
