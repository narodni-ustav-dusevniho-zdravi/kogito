import React from 'react';
import {Alert, SafeAreaView, ToastAndroid, View} from 'react-native';

import ENV from '~modules/env';
import type {AppScreen} from '~modules/navigation';

import MainContainer from '../components/container/MainContainer/MainContainer';
import MainContainerWrapper from '../components/container/MainContainerWrapper/MainContainerWrapper';
import Button from '../components/primitives/Button/Button';
import Divider from '../components/primitives/Divider';
import Text from '../components/primitives/Text';
import ProfileSettingsForm from '../user/form/ProfileSettingsForm';

const ProfileSettingsScreen: AppScreen<'ProfileSettings'> = ({
  navigation: {navigate},
}) => {
  const confirmLogoutModal = () => {
    Alert.alert('Doopravdy odhlásit?', undefined, [
      {
        text: 'Ne',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Ano',
        onPress: () => navigate('Logout'),
      },
    ]);
  };

  return (
    <SafeAreaView>
      <MainContainerWrapper>
        <MainContainer
          alignVertical="between"
          style={{paddingTop: 24, paddingBottom: 56}}>
          <View>
            <Text textVariant="header">Profil</Text>

            <ProfileSettingsForm
              onSuccess={() =>
                ToastAndroid.show('Profil uložen', ToastAndroid.LONG)
              }
            />
            <Button
              style={{marginBottom: 10}}
              title="Chci změnit cestu"
              type="small"
              onPress={() => navigate('JourneySwitch')}
            />
            <Divider />
            <Button
              colorVariant="transparent"
              title="Odhlásit se"
              type="small"
              onPress={confirmLogoutModal}
            />
            <Text align="center" textVariant="textMini">
              Verze: {ENV.VERSION}
            </Text>
          </View>
        </MainContainer>
      </MainContainerWrapper>
    </SafeAreaView>
  );
};

export default ProfileSettingsScreen;
