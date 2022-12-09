import React, {FC} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import MainContainer from '../components/container/MainContainer/MainContainer';
import MainHeader from '../components/container/MainHeader/MainHeader';
import MainContainerWrapper from '../components/container/MainContainerWrapper';
import Coin from '../components/primitives/Coin';
import Hero from '../components/primitives/Hero';
import GradientBackground from '../components/primitives/GradientBackground';
import GoBack from '../components/primitives/GoBack';
import BoxMedia from '../components/primitives/BoxMedia';
import BoxMediaWrapper from '../components/primitives/BoxMediaWrapper';
import RoadNavigation from '../components/primitives/RoadNavigation';

const RoadToolsScreen: FC = () => {
  return (
    <SafeAreaView>
      <GradientBackground color1={'#ffd1a0'} color2={'#ffdfdf'} angle={138}>
        <MainContainerWrapper>
          <MainHeader />
          <MainContainer align={null} page={'dashboard'}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Hero state={'mainInfo'} />
              {/*<BoxMediaWrapper>*/}
              {/*  <RoadNavigation active={'tools'} />*/}

              {/*  <BoxMedia*/}
              {/*    title={'Plán dne'}*/}
              {/*    subTitle={'Naplánujte svůj den'}*/}
              {/*    goTo={'ScheduleDay'}*/}
              {/*  />*/}
              {/*  <BoxMedia*/}
              {/*    title={'Hodnocení nálady'}*/}
              {/*    subTitle={'Sledujte změny svých nálad'}*/}
              {/*  />*/}
              {/*  <BoxMedia*/}
              {/*    title={'Deník'}*/}
              {/*    subTitle={'Veďte si svůj osobní deník'}*/}
              {/*    goTo={'Diary'}*/}
              {/*  />*/}
              {/*</BoxMediaWrapper>*/}
            </ScrollView>
          </MainContainer>
        </MainContainerWrapper>
      </GradientBackground>
    </SafeAreaView>
  );
};

export default RoadToolsScreen;
