import React, {useCallback} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import MainContainer from '../components/container/MainContainer/MainContainer';
import MainHeader from '../components/container/MainHeader/MainHeader';
import MainContainerWrapper from '../components/container/MainContainerWrapper';
import Box from '../components/primitives/Box';
import BoxWrapper from '../components/primitives/BoxWrapper';
import Text from '../components/primitives/Text';
import BoxMedia from '../components/primitives/BoxMedia';
import {useContent} from '../modules/content/useContent';
import {redirectItem} from '../helpers/redirectItem';
import TabbedBox from '../components/primitives/TabbedBox';
import Locked from '../components/primitives/Locked';
import images from '../helpers/images';
import useMixPanelTracking from '../tracking/useMixPanelTracking';
import {useFocusEffect} from '@react-navigation/native';
import type {AppScreen} from '../navigation/Navigation';

const RelaxationScreen: AppScreen<'Relaxation'> = ({navigation}) => {
  const {bonusRelaxation, journeyRelaxation} = useContent();
  const {trackRelaxationScreenOpened, trackRelaxationOpened} =
    useMixPanelTracking();

  useFocusEffect(
    useCallback(() => {
      trackRelaxationScreenOpened();
    }, []),
  );

  return (
    <SafeAreaView>
      <MainContainerWrapper>
        <MainHeader />
        <MainContainer page={'dashboard'} color={'white'}>
          <ScrollView>
            {/*<InputSearch />*/}
            <MainContainer page={'sub'}>
              <Text textVariant={'headerSub'}>Bonusová relaxace</Text>
            </MainContainer>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <BoxWrapper>
                {bonusRelaxation?.map(item => (
                  <Box
                    title={item.name}
                    img={images(
                      'bonusRelaxationOverview',
                      item.image ? item.image : null,
                    )}
                    isBonus={true}
                    isMedia={item.__typename === 'AudioItem'}
                    onPress={() => {
                      trackRelaxationOpened(item.name, 'Bonus');
                      redirectItem(navigation, item);
                    }}
                  />
                ))}
              </BoxWrapper>
            </ScrollView>

            <TabbedBox
              headerVariant="headers"
              items={journeyRelaxation.map(journeyRelaxation => ({
                id: journeyRelaxation.id,
                label: journeyRelaxation.name,
                render: () => {
                  return journeyRelaxation.unlocked ? (
                    journeyRelaxation.relaxation.map(item => (
                      <BoxMedia
                        title={item.name}
                        subTitle={item.subTitle}
                        onPress={() => redirectItem(navigation, item)}
                        isPlayable={item.__typename === 'AudioItem'}
                        isLocked={item.locked}
                      />
                    ))
                  ) : (
                    <Locked title={'Nejprve dokončete předchozí cestu'} />
                  );
                },
              }))}
            />
          </ScrollView>
        </MainContainer>
      </MainContainerWrapper>
    </SafeAreaView>
  );
};

export default RelaxationScreen;
