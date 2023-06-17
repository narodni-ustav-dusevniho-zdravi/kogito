import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import BootSplash from 'react-native-bootsplash';

import type {AppScreen} from '~modules/navigation';

import {useAuth} from '../auth/useAuth';
import {useMeQuery} from '../user/useMeQuery';
import {useTerms} from '../user/useTerms';

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
