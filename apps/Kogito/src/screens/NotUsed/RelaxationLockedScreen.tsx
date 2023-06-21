import React from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import MainContainer from '../../components/container/MainContainer/MainContainer';
import MainHeader from '../../components/container/MainHeader/MainHeader';
import MainContainerWrapper from '../../components/container/MainContainerWrapper';
import Box from '../../components/primitives/Box';
import BoxWrapper from '../../components/primitives/BoxWrapper';
import Text from '../../components/primitives/Text';
import BoxImg3 from '../assets/box-img-3.png';
import BoxImg4 from '../assets/box-img-4.png';
import Tabs from '../../components/primitives/Tabs';
import InputSearch from '../../components/primitives/InputSearch';
import Locked from '../../components/primitives/Locked';

const RelaxationLockedScreen: React.FC = () => {
  return (
    <SafeAreaView>
      <MainContainerWrapper>
        <MainHeader />
        <MainContainer page={'dashboard'} color={'white'}>
          <ScrollView>
            <InputSearch />
            <MainContainer page={'sub'}>
              <Text textVariant={'headerSub'}>Bonusová relaxace</Text>
            </MainContainer>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <BoxWrapper>
                <Box
                  title={'Buď v pohodě v karanténě?'}
                  img={BoxImg3}
                  isBonus={true}
                  isMedia={true}
                />
                <Box
                  title={'Tipy na cvičení pro mentální hygienu'}
                  img={BoxImg4}
                  isBonus={true}
                />
              </BoxWrapper>
            </ScrollView>
            <Tabs style={{marginTop: 18}} />
            <View style={{paddingBottom: 19, paddingHorizontal: 24}}>
              <Locked
                title={
                  'Dokončete předchozí cestu: Bojujte s depresí k odemčení obsahu'
                }
              />
            </View>
          </ScrollView>
        </MainContainer>
      </MainContainerWrapper>
    </SafeAreaView>
  );
};

export default RelaxationLockedScreen;
