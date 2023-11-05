import React, {useEffect} from 'react';
import {Alert, BackHandler, Image} from 'react-native';

import Logo from '~assets/logo.png';
import ENV from '~modules/env';
import type {AppScreen} from '~modules/navigation';
import {Html, ScrollView} from '~modules/ui';

import MainContainer from '../components/container/MainContainer';
import MainContainerWrapper from '../components/container/MainContainerWrapper';
import Button from '../components/primitives/Button';
import ColoredSafeAreaView from '../components/primitives/ColoredSafeAreaView';
import terms from '../user/data/terms';
import {useTerms} from '../user/useTerms';

const IntroScreen: AppScreen<'Intro'> = ({navigation: {replace}}) => {
  const haveSeenTerms = useTerms(s => s.haveSeenTerms);
  const setSeenTerms = useTerms(s => s.actions.setTermsSeen);

  useEffect(() => {
    if (haveSeenTerms) {
      replace('LoginOrRegister');
    }
  }, [haveSeenTerms, replace]);

  const handleAgreePress = () => {
    setSeenTerms(true);
    replace('LoginOrRegister');
  };

  const handleDeclinePress = () => {
    if (ENV.IS_IOS) return Alert.alert('Bez souhlasu to bohužel nepujde :(');
    BackHandler.exitApp();
  };

  return (
    <ColoredSafeAreaView>
      <MainContainerWrapper>
        <ScrollView>
          <MainContainer align="center">
            <Image source={Logo} />
            <Html source={terms} />
            <Button
              style={{marginTop: -50}}
              title="Souhlasím"
              onPress={handleAgreePress}
            />
            <Button
              colorVariant="transparent"
              title="Ne"
              type="small"
              onPress={handleDeclinePress}
            />
          </MainContainer>
        </ScrollView>
      </MainContainerWrapper>
    </ColoredSafeAreaView>
  );
};

export default IntroScreen;
