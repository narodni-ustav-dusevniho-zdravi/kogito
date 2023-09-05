import React, {useCallback, useEffect, useState} from 'react';
import {Image} from 'react-native';
import {getReadableVersion} from 'react-native-device-info';
import {useApolloClient} from '@apollo/client';
import styled from 'styled-components/native';

import GirlImage from '~assets/girl-isolated.svg';
import LogoFooter from '~assets/login-logo-footer.svg';
import Logo from '~assets/logo.png';
import {logEvent, logScreen} from '~modules/analytics';
import ENV from '~modules/env';
import type {AppScreen} from '~modules/navigation';

import LoginForm from '../auth/form/LoginForm';
import HalfOverlay from '../components/container/HalfOverlay';
import MainContainer from '../components/container/MainContainer';
import MainContainerWrapper from '../components/container/MainContainerWrapper';
import Button from '../components/primitives/Button';
import ColoredSafeAreaView from '../components/primitives/ColoredSafeAreaView';
import Text from '../components/primitives/Text';

export const LogoFooterWrapper = styled.View`
  margin-top: auto;
  padding: 28px 0;
`;

type State = 'normal' | 'login' | 'registration';

// eslint-disable-next-line max-lines-per-function
const LoginScreen: AppScreen<'LoginOrRegister'> = ({
  navigation: {navigate},
}) => {
  const apolloClient = useApolloClient();
  const [state, setState] = useState<State>('normal');

  useEffect(() => {
    switch (state) {
      case 'login':
        return logScreen('LoginPopup');
      case 'registration':
        return logScreen('RegisterPopup');
      case 'normal':
        return logScreen('LoginOrRegister');
    }
  }, [state]);

  const loginSuccess = useCallback(async () => {
    await apolloClient.clearStore();
    await apolloClient.resetStore();

    setState('normal');

    navigate('Splash');
  }, [navigate, apolloClient]);

  return (
    <ColoredSafeAreaView>
      <MainContainerWrapper>
        <MainContainer align="center">
          <Image source={Logo} />
          {/*<ScrollView>*/}
          <GirlImage
            style={{
              marginTop: 55,
              marginBottom: 40,
              flexBasis: 1,
              flexGrow: 1,
            }}
          />
          <Text textVariant="bigHeader">Bojujte. Nejste sama</Text>
          <Button
            style={{
              marginTop: 40,
            }}
            title="Přihlásit"
            onPress={() => {
              logEvent('click_login');
              setState('login');
            }}
          />
          <Button
            colorVariant="white"
            style={{
              marginTop: 14,
            }}
            title="Registrovat"
            onPress={() => {
              logEvent('click_login');
              setState('registration');
            }}
          />
          <LogoFooterWrapper>
            <LogoFooter />
            <Text align="center" textVariant="textCopy">
              {ENV.MODE[0]}
              {getReadableVersion()}
            </Text>
          </LogoFooterWrapper>
          {/*</ScrollView>*/}
          <HalfOverlay
            close={() => setState('normal')}
            visible={state !== 'normal'}>
            {(state === 'login' || state === 'registration') && (
              <LoginForm type={state} onSuccess={loginSuccess} />
            )}
          </HalfOverlay>
        </MainContainer>
      </MainContainerWrapper>
    </ColoredSafeAreaView>
  );
};

export default LoginScreen;
