import React, {useCallback, useState} from 'react';
import {Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Button from '../components/primitives/Button';
import Text from '../components/primitives/Text';
import HalfOverlay from '../components/container/HalfOverlay';
import MainContainer from '../components/container/MainContainer';
import GirlImage from '../assets/girl-isolated.svg';
import Logo from '../assets/logo.png';
import LogoFooter from '../assets/login-logo-footer.svg';
import styled from 'styled-components/native';
import LoginForm from '../modules/auth/form/LoginForm';
import {useApolloClient} from '@apollo/client';
import MainContainerWrapper from '../components/container/MainContainerWrapper';
import ColoredSafeAreaView from '../components/primitives/ColoredSafeAreaView';
import {getReadableVersion} from 'react-native-device-info';
import {ENV} from '../env';

export const LogoFooterWrapper = styled.View`
  margin-top: auto;
  padding: 28px 0;
`;

type State = 'normal' | 'login' | 'registration';

const LoginScreen: React.FC = () => {
  const navigation = useNavigation();
  const apolloClient = useApolloClient();
  const [state, setState] = useState<State>('normal');

  const loginSuccess = useCallback(async () => {
    await apolloClient.clearStore();
    await apolloClient.resetStore();

    setState('normal');

    navigation.navigate('Splash');
  }, [navigation, apolloClient]);

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
            onPress={() => setState('login')}
          />
          <Button
            title="Registrovat"
            colorVariant="white"
            onPress={() => setState('registration')}
            style={{
              marginTop: 14,
            }}
          />
          <LogoFooterWrapper>
            <LogoFooter />
            <Text textVariant="textCopy" align={'center'}>
              {ENV.MODE[0]}
              {getReadableVersion()}
            </Text>
          </LogoFooterWrapper>
          {/*</ScrollView>*/}
          <HalfOverlay
            visible={state !== 'normal'}
            close={() => setState('normal')}>
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
