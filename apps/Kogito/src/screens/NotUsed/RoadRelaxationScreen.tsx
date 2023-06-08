import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import MainContainer from '../../components/container/MainContainer';
import MainHeader from '../../components/container/MainHeader/MainHeader';
import MainContainerWrapper from '../../components/container/MainContainerWrapper';
import Hero from '../../components/primitives/Hero';
import GradientBackground from '../../components/primitives/GradientBackground';

const RoadRelaxationScreen: React.FC = () => {
  return (
    <SafeAreaView>
      <GradientBackground color1={'#ffd1a0'} color2={'#ffdfdf'} angle={138}>
        <MainContainerWrapper>
          <MainHeader />
          <MainContainer page={'dashboard'}>
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
