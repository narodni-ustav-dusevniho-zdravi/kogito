import React, {FC, useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import * as NativeSplashScreen from 'react-native-splash-screen';
import {useAuth} from '../modules/auth/useAuth';
import {useMeQuery} from '../modules/user/useMeQuery';
import {StackScreenProps} from '@react-navigation/stack';
import {useTerms} from '../modules/user/useTerms';

const SplashScreen: FC<StackScreenProps<any>> = ({navigation}) => {
  const {status} = useAuth();
  const {haveSeenTerms} = useTerms();
  const {me, haveActiveQuestionnaire} = useMeQuery();

  useEffect(() => {
    if (status === 'unauthenticated') {
      if (haveSeenTerms) {
        navigation.replace('Login');
      } else {
        navigation.replace('Terms');
      }

      NativeSplashScreen.default.hide();
    }
  }, [status]);

  useEffect(() => {
    if (me) {
      console.log(me);
      if (haveActiveQuestionnaire) {
        navigation.replace('AfterMonthQuestionnaire');
      } else if (!me.finishedRegistration) {
        navigation.replace('Registration');
      } else {
        navigation.replace('Dashboard');
      }

      NativeSplashScreen.default.hide();
    }
  }, [me]);

  return <SafeAreaView />;
};

export default SplashScreen;
