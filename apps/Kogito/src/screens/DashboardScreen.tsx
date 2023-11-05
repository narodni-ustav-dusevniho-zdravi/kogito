import React from 'react';
import {SafeAreaView, TouchableOpacity, View} from 'react-native';

import type {AppScreen} from '~modules/navigation';
import {useOnScreenFocus} from '~modules/navigation';
import {ScrollView} from '~modules/ui';

import MainContainer from '../components/container/MainContainer/MainContainer';
import MainContainerWrapper from '../components/container/MainContainerWrapper';
import MainHeader from '../components/container/MainHeader/MainHeader';
import Box from '../components/primitives/Box';
import BoxBig from '../components/primitives/BoxBig';
import BoxWrapper from '../components/primitives/BoxWrapper';
import Hero from '../components/primitives/Hero';
import Text from '../components/primitives/Text';
import {useContent} from '../content/useContent';
import images from '../helpers/images';
import {redirectItem} from '../helpers/redirectItem';

const DashboardScreen: AppScreen<'MyDay'> = ({navigation: {navigate}}) => {
  const {userJourney, currentRelaxation, newestStory, refetch} = useContent();

  useOnScreenFocus(() => refetch());

  return (
    <SafeAreaView>
      <MainContainerWrapper>
        <MainHeader />
        <MainContainer color="white" page="dashboard">
          <ScrollView>
            {userJourney && (
              <Hero
                progress={userJourney.currentLevel}
                subTitle={`Úroveň ${userJourney.currentLevel}`}
                title={userJourney.name}
                variant={
                  userJourney.id === 'Sm91cm5leTox' ? 'depression' : 'anxiety'
                }
                onPress={() => navigate('JourneyProgress')}
                onPressContinue={() =>
                  navigate('Journey', {
                    id: userJourney.id,
                    level: userJourney.currentLevel,
                  })
                }
              />
            )}

            <MainContainer page="sub">
              <TouchableOpacity onPress={() => navigate('Relaxation')}>
                <Text textVariant="headerSub">Relaxace</Text>
              </TouchableOpacity>
            </MainContainer>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <BoxWrapper>
                {currentRelaxation.map(item => (
                  <Box
                    key={item.id}
                    img={images('audioDetail', item.image ? item.image : null)}
                    maxHeight={true}
                    title={item.name}
                    onPress={() => redirectItem(item)}
                  />
                ))}
              </BoxWrapper>
            </ScrollView>

            {newestStory && (
              <MainContainer page="subWithoutFooter">
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text textVariant="headerSub">Příběhy</Text>
                  <TouchableOpacity onPress={() => navigate('StoriesList')}>
                    <Text colorVariant="gray" textVariant="headerSub">
                      další příběhy
                    </Text>
                  </TouchableOpacity>
                </View>

                <BoxBig
                  buttonText={newestStory.videoLink ? 'Přehrát' : 'Přečíst'}
                  date={newestStory.published}
                  title={newestStory.title}
                  onPress={() => navigate('StoryDetail', {id: newestStory.id})}
                />
              </MainContainer>
            )}
          </ScrollView>
        </MainContainer>
      </MainContainerWrapper>
    </SafeAreaView>
  );
};

export default DashboardScreen;
