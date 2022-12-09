import React, {FC} from 'react';
import {Alert, SafeAreaView, ToastAndroid, View} from 'react-native';
import MainContainerWrapper from '../components/container/MainContainerWrapper/MainContainerWrapper';
import MainContainer from '../components/container/MainContainer/MainContainer';
import Text from '../components/primitives/Text';
import Button from '../components/primitives/Button/Button';
import {StackScreenProps} from '@react-navigation/stack';
import {getReadableVersion} from 'react-native-device-info';
import Divider from '../components/primitives/Divider';
import ProfileSettingsForm from '../modules/user/form/ProfileSettingsForm';
import {MODE} from '@env';

const ProfileSettingsScreen: FC<StackScreenProps<any>> = ({navigation}) => {
  const confirmLogoutModal = () => {
    Alert.alert('Doopravdy odhlásit?', undefined, [
      {
        text: 'Ne',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Ano',
        onPress: () => navigation.navigate('Logout'),
      },
    ]);
  };

  return (
    <SafeAreaView>
      <MainContainerWrapper>
        <MainContainer
          align={null}
          alignVertical="between"
          style={{paddingTop: 24, paddingBottom: 56}}>
          <View>
            <Text textVariant={'header'}>Profil</Text>

            <ProfileSettingsForm
              onSuccess={() =>
                ToastAndroid.show('Profil uložen', ToastAndroid.LONG)
              }
            />
            <Button
              type="small"
              title="Chci změnit cestu"
              onPress={() => navigation.navigate('JourneySwitch')}
              style={{marginBottom: 10}}
            />
            <Divider />
            <Button
              type="small"
              colorVariant="transparent"
              title="Odhlásit se"
              onPress={confirmLogoutModal}
            />
            <Text align="center" textVariant="textMini">
              Verze: {MODE[0]}
              {getReadableVersion()}
            </Text>
          </View>
        </MainContainer>
      </MainContainerWrapper>
    </SafeAreaView>
  );
};

export default ProfileSettingsScreen;
