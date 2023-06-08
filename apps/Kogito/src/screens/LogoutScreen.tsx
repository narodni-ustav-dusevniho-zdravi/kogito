import React, {FC, useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {useApolloClient} from '@apollo/client';
import {useAuth} from '../modules/auth/useAuth';

const LogoutScreen: FC<StackScreenProps<any>> = ({navigation}) => {
  const {clearTokens} = useAuth();
  const apolloClient = useApolloClient();

  useEffect(() => {
    (async () => {
      await apolloClient.clearStore();
      await apolloClient.resetStore();

      await clearTokens();

      navigation.replace('Login');
    })();
  }, []);

  return <SafeAreaView />;
};

export default LogoutScreen;
