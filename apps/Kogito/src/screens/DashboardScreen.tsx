import React, {FC, useCallback, useEffect} from 'react';
import {SafeAreaView, ScrollView, TouchableOpacity, View} from 'react-native';
import MainContainer from '../components/container/MainContainer/MainContainer';
import MainHeader from '../components/container/MainHeader/MainHeader';
import MainContainerWrapper from '../components/container/MainContainerWrapper';
import Hero from '../components/primitives/Hero';
import Box from '../components/primitives/Box';
import BoxWrapper from '../components/primitives/BoxWrapper';
import Text from '../components/primitives/Text';
import BoxImg1 from '../assets/box-img-1.png';
import BoxBig from '../components/primitives/BoxBig';
import {StackScreenProps} from '@react-navigation/stack';
import {useContent} from '../modules/content/useContent';
import {redirectItem} from '../helpers/redirectItem';
import {useFocusEffect} from '@react-navigation/native';
import images from '../helpers/images';

const DashboardScreen: FC<StackScreenProps<any>> = ({navigation}) => {
  const {userJourney, currentRelaxation, newestStory, refetch} = useContent();

  useFocusEffect(
    useCallback(() => {
      console.log('focus efetc');
      refetch();
    }, [refetch]),
  );

  return (
    <SafeAreaView>
      <MainContainerWrapper>
        <MainHeader />
        <MainContainer align={null} page={'dashboard'} color={'white'}>
          <ScrollView>
            {userJourney && (
              <Hero
                subTitle={`Úroveň ${userJourney.currentLevel}`}
                title={userJourney.name}
                progress={userJourney.currentLevelProgress}
                onPressContinue={() =>
                  navigation.navigate('Journey', {
                    id: userJourney.id,
                    level: userJourney.currentLevel,
                  })
                }
                onPress={() => navigation.navigate('JourneyProgress')}
                variant={
                  userJourney.id === 'Sm91cm5leTox' ? 'depression' : 'anxiety'
                }
              />
            )}

            <MainContainer align={null} page={'sub'}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Relaxation')}>
                <Text textVariant={'headerSub'}>Relaxace</Text>
              </TouchableOpacity>
            </MainContainer>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <BoxWrapper>
                {currentRelaxation &&
                  currentRelaxation.map(item => (
                    <Box
                      key={item.id}
                      title={item.name}
                      img={images(
                        'audioDetail',
                        item.image ? item.image : null,
                      )}
                      onPress={() => redirectItem(navigation, item)}
                      maxHeight={true}
                    />
                  ))}
              </BoxWrapper>
            </ScrollView>

            {newestStory && (
              <MainContainer align={null} page={'subWithoutFooter'}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text textVariant={'headerSub'}>Příběhy</Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('StoriesList')}>
                    <Text textVariant={'headerSub'} colorVariant="gray">
                      další příběhy
                    </Text>
                  </TouchableOpacity>
                </View>

                <BoxBig
                  onPress={() =>
                    navigation.navigate('StoryDetail', {id: newestStory.id})
                  }
                  title={newestStory.title}
                  buttonText={newestStory.videoLink ? 'Přehrát' : 'Přečíst'}
                  date={newestStory.published}
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
