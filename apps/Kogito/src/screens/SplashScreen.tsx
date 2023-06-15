import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import BootSplash from 'react-native-bootsplash';

import {useAuth} from '../modules/auth/useAuth';
import {useMeQuery} from '../modules/user/useMeQuery';
import {useTerms} from '../modules/user/useTerms';
import type {AppScreen} from '../navigation/Navigation';

const SplashScreen: AppScreen<'Splash'> = ({navigation: {replace}}) => {
  const {status} = useAuth();
  const {haveSeenTerms} = useTerms();
  const {me, haveActiveQuestionnaire} = useMeQuery();

  // eslint-disable-next-line @shopify/prefer-early-return
  useEffect(() => {
    if (status === 'unauthenticated') {
      if (haveSeenTerms) {
        replace('Login');
      } else {
        replace('Terms');
      }

      BootSplash.hide();
    }
  }, [status]);

  // eslint-disable-next-line @shopify/prefer-early-return
  useEffect(() => {
    if (me) {
      console.log(me);
      if (haveActiveQuestionnaire) {
        replace('AfterMonthQuestionnaire');
        // eslint-disable-next-line no-negated-condition
      } else if (!me.finishedRegistration) {
        replace('Registration');
      } else {
        replace('Dashboard');
      }

      BootSplash.hide();
    }
  }, [me]);

  return <SafeAreaView />;
};

export default SplashScreen;
