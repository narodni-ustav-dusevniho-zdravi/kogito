import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import * as Splash from 'expo-splash-screen';

import type {AppScreen, AppScreenName} from '~modules/navigation';

import type {AuthStatus} from '../auth/auth-types';
import {useAuth} from '../auth/useAuth';
import {useMeQuery} from '../user/useMeQuery';
import {useTerms} from '../user/useTerms';

const getNextScreen = (props: {
  haveActiveQuestionnaire: boolean;
  haveSeenTerms: boolean;
  status: AuthStatus;
  me?: {finishedRegistration?: boolean | null};
}): AppScreenName | undefined => {
  if (props.status === 'unauthenticated')
    return props.haveSeenTerms ? 'LoginOrRegister' : 'Intro';
  if (!props.me) return;
  if (props.haveActiveQuestionnaire) {
    return 'AfterMonthQuestionnaire';
  }
  return props.me.finishedRegistration ? 'Dashboard' : 'Register';
};

const SplashScreen: AppScreen<'Splash'> = ({navigation: {replace}}) => {
  const {status} = useAuth();
  const {haveSeenTerms} = useTerms();
  const {me, haveActiveQuestionnaire} = useMeQuery();

  const nextScreen = getNextScreen({
    status,
    haveActiveQuestionnaire,
    haveSeenTerms,
    me,
  });

  useEffect(() => {
    if (!nextScreen) return;
    replace(nextScreen);
    Splash.hideAsync();
  }, [nextScreen, replace]);

  return <SafeAreaView />;
};

export default SplashScreen;
