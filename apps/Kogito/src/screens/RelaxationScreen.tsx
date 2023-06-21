import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';

import {logEvent} from '~modules/analytics';
import type {AppScreen} from '~modules/navigation';

import MainContainer from '../components/container/MainContainer/MainContainer';
import MainContainerWrapper from '../components/container/MainContainerWrapper';
import MainHeader from '../components/container/MainHeader/MainHeader';
import Box from '../components/primitives/Box';
import BoxMedia from '../components/primitives/BoxMedia';
import BoxWrapper from '../components/primitives/BoxWrapper';
import Locked from '../components/primitives/Locked';
import TabbedBox from '../components/primitives/TabbedBox';
import Text from '../components/primitives/Text';
import {useContent} from '../content/useContent';
import images from '../helpers/images';
import {redirectItem} from '../helpers/redirectItem';

const RelaxationScreen: AppScreen<'Relaxation'> = () => {
  const content = useContent();

  return (
    <SafeAreaView>
      <MainContainerWrapper>
        <MainHeader />
        <MainContainer color="white" page="dashboard">
          <ScrollView>
            {/*<InputSearch />*/}
            <MainContainer page="sub">
              <Text textVariant="headerSub">Bonusová relaxace</Text>
            </MainContainer>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <BoxWrapper>
                {content.bonusRelaxation.map(item => (
                  <Box
                    key={item.id}
                    img={images(
                      'bonusRelaxationOverview',
                      item.image ? item.image : null,
                    )}
                    isBonus={true}
                    isMedia={item.__typename === 'AudioItem'}
                    title={item.name}
                    onPress={() => {
                      logEvent('Relaxation opened', {
                        relaxationTitle: item.name,
                        relaxationLevel: 'Bonus',
                      });
                      redirectItem(item);
                    }}
                  />
                ))}
              </BoxWrapper>
            </ScrollView>

            <TabbedBox
              headerVariant="headers"
              items={content.journeyRelaxation.map(journeyRelaxation => ({
                id: journeyRelaxation.id,
                label: journeyRelaxation.name,
                render: () => {
                  return journeyRelaxation.unlocked ? (
                    journeyRelaxation.relaxation.map(item => (
                      <BoxMedia
                        key={item.id}
                        isLocked={item.locked}
                        isPlayable={item.__typename === 'AudioItem'}
                        subTitle={item.subTitle}
                        title={item.name}
                        onPress={() => redirectItem(item)}
                      />
                    ))
                  ) : (
                    <Locked title="Nejprve dokončete předchozí cestu" />
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
