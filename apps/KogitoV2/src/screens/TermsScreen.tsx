import React, {useEffect} from 'react';
import {BackHandler, Image} from 'react-native';
import MainContainer from '../components/container/MainContainer';
import MainContainerWrapper from '../components/container/MainContainerWrapper';
import HTML from 'react-native-render-html';
import terms from '../modules/user/data/terms';
import {ScrollView} from 'react-native';
import Button from '../components/primitives/Button';
import {useTerms} from '../modules/user/useTerms';
import ColoredSafeAreaView from '../components/primitives/ColoredSafeAreaView';
import Logo from '../assets/logo.png';
import type {AppScreen} from '../navigation/Navigation';

const TermsScreen: AppScreen<'Terms'> = ({navigation}) => {
  const {setSeenTerms, haveSeenTerms} = useTerms();

  useEffect(() => {
    if (haveSeenTerms) {
      navigation.replace('Login');
    }
  }, [haveSeenTerms]);

  const handleAgreePress = async () => {
    await setSeenTerms();
    navigation.replace('Login');
  };

  const handleDeclinePress = () => {
    BackHandler.exitApp();
  };

  return (
    <ColoredSafeAreaView>
      <MainContainerWrapper>
        <ScrollView>
          <MainContainer align="center">
            <Image source={Logo} />
            <HTML source={{html: terms}} />
            <Button
              onPress={handleAgreePress}
              title="Souhlasím"
              style={{marginTop: -50}}
            />
            <Button
              onPress={handleDeclinePress}
              type="small"
              colorVariant="transparent"
              title="Ne"
            />
          </MainContainer>
        </ScrollView>
      </MainContainerWrapper>
    </ColoredSafeAreaView>
  );
};

export default TermsScreen;
