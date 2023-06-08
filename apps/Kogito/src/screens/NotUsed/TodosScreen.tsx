import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import MainContainer from '../../components/container/MainContainer/MainContainer';
import MainHeader from '../../components/container/MainHeader/MainHeader';
import MainContainerWrapper from '../../components/container/MainContainerWrapper';
import GradientBackground from '../../components/primitives/GradientBackground';
import Hero from '../../components/primitives/Hero/Hero';
import BoxMediaWrapper from '../../components/primitives/BoxMediaWrapper/BoxMediaWrapper';
import RoadNavigation from '../../components/primitives/RoadNavigation/RoadNavigation';
import BoxCheckbox from '../../components/primitives/BoxCheckbox/BoxCheckbox';

const TodosScreen: React.FC = () => {
  return (
    <SafeAreaView>
      <GradientBackground color1={'#ffd1a0'} color2={'#ffdfdf'} angle={138}>
        <MainContainerWrapper>
          <MainHeader />
          <MainContainer page={'dashboard'}>
            <Text>Todos</Text>
            <Hero state={'mainInfo'} />
            <BoxMediaWrapper>
              <RoadNavigation active={'todos'} />

              <BoxCheckbox title={'Plánuj své aktivity'} checked={true} />
              <BoxCheckbox title={'Zaznamenávej si svůj stav'} />
              <BoxCheckbox title={'Zapisuj si myšlenky a pocity'} />
              <BoxCheckbox title={'Relaxuj'} />
            </BoxMediaWrapper>
          </MainContainer>
        </MainContainerWrapper>
      </GradientBackground>
    </SafeAreaView>
  );
};

export default TodosScreen;
