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
import BoxMedia1 from '../assets/box-media-1.png';
import BoxMedia2 from '../assets/box-media-2.png';
import BoxMedia3 from '../assets/box-media-3.png';
import BoxMedia4 from '../assets/box-media-4.png';

const RoadRelaxationScreen: FC = () => {
  return (
    <SafeAreaView>
      <GradientBackground color1={'#ffd1a0'} color2={'#ffdfdf'} angle={138}>
        <MainContainerWrapper>
          <MainHeader />
          <MainContainer align={null} page={'dashboard'}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Hero state={'mainInfo'} />
              {/*<BoxMediaWrapper>*/}
              {/*  <RoadNavigation active={'relaxation'} />*/}

              {/*  <BoxMedia*/}
              {/*    title={'Jak začít'}*/}
              {/*    subTitle={'Úroveň 1 • 39min'}*/}
              {/*    img={BoxMedia1}*/}
              {/*    state={'active'}*/}
              {/*    goTo={'Audio'}*/}
              {/*  />*/}
              {/*  <BoxMedia*/}
              {/*    title={'Techniky'}*/}
              {/*    subTitle={'Úroveň 1 • 39min'}*/}
              {/*    img={BoxMedia2}*/}
              {/*    state={'active'}*/}
              {/*    goTo={'Audio'}*/}
              {/*  />*/}
              {/*  <BoxMedia*/}
              {/*    title={'Relaxace'}*/}
              {/*    subTitle={'Úroveň 1 • 39min'}*/}
              {/*    img={BoxMedia3}*/}
              {/*    state={'locked'}*/}
              {/*  />*/}
              {/*  <BoxMedia*/}
              {/*    title={'Focus'}*/}
              {/*    subTitle={'Úroveň 1 • 39min'}*/}
              {/*    img={BoxMedia4}*/}
              {/*    state={'locked'}*/}
              {/*  />*/}
              {/*</BoxMediaWrapper>*/}
            </ScrollView>
          </MainContainer>
        </MainContainerWrapper>
      </GradientBackground>
    </SafeAreaView>
  );
};

export default RoadRelaxationScreen;
