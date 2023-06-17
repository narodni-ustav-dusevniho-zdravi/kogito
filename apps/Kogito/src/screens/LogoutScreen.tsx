import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import {useApolloClient} from '@apollo/client';

import type {AppScreen} from '~modules/navigation';

import {useAuth} from '../auth/useAuth';

const LogoutScreen: AppScreen<'Logout'> = ({navigation: {replace}}) => {
  const {clearTokens} = useAuth();
  const apolloClient = useApolloClient();

  useEffect(() => {
    (async () => {
      await apolloClient.clearStore();
      await apolloClient.resetStore();

      await clearTokens();

      replace('Login');
    })();
  }, []);

  return <SafeAreaView />;
};

export default LogoutScreen;
