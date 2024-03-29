import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {SafeAreaView, ScrollView, TouchableOpacity, View} from 'react-native';
import MainContainer from '../components/container/MainContainer/MainContainer';
import MainHeader from '../components/container/MainHeader/MainHeader';
import MainContainerWrapper from '../components/container/MainContainerWrapper';
import Hero from '../components/primitives/Hero';
import GradientBackground from '../components/primitives/GradientBackground';
import LevelWidget, {
  LevelWidgetVariant,
} from '../components/primitives/LevelWidget';
import {useContent} from '../modules/content/useContent';
import {StackScreenProps} from '@react-navigation/stack';
import {useFocusEffect} from '@react-navigation/native';
import {UserJourney} from '../modules/content/graphql';
import ColoredSafeAreaView from '../components/primitives/ColoredSafeAreaView';
import {TextSmall} from '../components/primitives/Hero/styles';
import Text from '../components/primitives/Text';

const solveState = (
  unlocked: boolean,
  progress: number,
): LevelWidgetVariant => {
  if (unlocked) {
    return progress !== 100 ? 'inProgress' : 'done';
  }

  return 'locked';
};

const colorFirst = (journey: UserJourney | null) => {
  if (journey && journey.id === 'Sm91cm5leTox') {
    return '#FFCE8F';
  } else {
    return '#BF9BE8';
  }
};
const colorSecond = (journey: UserJourney | null) => {
  if (journey && journey.id === 'Sm91cm5leTox') {
    return '#FFA38F';
  } else {
    return '#80A8D9';
  }
};

const JourneyProgressScreen: FC<StackScreenProps<any>> = ({navigation}) => {
  const scrollRef = useRef<ScrollView>();
  const {userJourney, refetch} = useContent();

  useFocusEffect(
    useCallback(() => {
      console.log('focus efetc');
      refetch();
    }, [refetch]),
  );

  return (
    <ColoredSafeAreaView
      color1={colorFirst(userJourney)}
      color2={colorSecond(userJourney)}
      angle={138}>
      <MainContainerWrapper>
        <MainHeader useTransparent={true} />
        <MainContainer align={null} page={'dashboard'}>
          {userJourney && (
            <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}>
              <Hero
                title={userJourney.name}
                state={'onlyHeadline'}
                variant={
                  userJourney.id === 'Sm91cm5leTox' ? 'depression' : 'anxiety'
                }
              />
              <MainContainer align={null} page={'sub'}>
                <View>
                  {userJourney.levels.map(level => {
                    return (
                      <LevelWidget
                        name={`Úroveň ${level.level}`}
                        state={solveState(level.unlocked, level.progress)}
                        progress={level.progress}
                        onPress={() =>
                          navigation.navigate('Journey', {
                            id: userJourney.id,
                            level: level.level,
                          })
                        }
                      />
                    );
                  })}
                </View>
                <TouchableOpacity
                  style={{marginBottom: 40, marginTop: 20}}
                  onPress={() => {
                    scrollRef.current?.scrollTo({
                      y: 0,
                      animated: false,
                    });
                    navigation.navigate('JourneySwitch');
                  }}>
                  <Text align="center">Chci změnit cestu</Text>
                </TouchableOpacity>
              </MainContainer>
            </ScrollView>
          )}
        </MainContainer>
      </MainContainerWrapper>
    </ColoredSafeAreaView>
  );
};

export default JourneyProgressScreen;
