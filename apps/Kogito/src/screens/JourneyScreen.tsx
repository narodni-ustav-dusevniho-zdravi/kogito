import React, {useCallback} from 'react';
import {SafeAreaView, ScrollView, Text} from 'react-native';
import MainContainer from '../components/container/MainContainer/MainContainer';
import MainHeader from '../components/container/MainHeader/MainHeader';
import MainContainerWrapper from '../components/container/MainContainerWrapper';
import BoxMedia from '../components/primitives/BoxMedia';
import {ContentItem} from '../modules/content/types';
import {StackNavigationProp} from '@react-navigation/stack/src/types';
import {RouteProp, useFocusEffect, useRoute} from '@react-navigation/native';
import {DashboardStackParamList} from '../navigation/Navigation';
import {useJourney} from '../modules/content/useJourney';
import Hero from '../components/primitives/Hero/Hero';
import TabbedBox from '../components/primitives/TabbedBox/TabbedBox';
import {redirectItem} from '../helpers/redirectItem';
import ColoredSafeAreaView from '../components/primitives/ColoredSafeAreaView';
import useMixPanelTracking from '../tracking/useMixPanelTracking';
import type {AppScreen} from '../navigation/Navigation';
import {Journey} from '../../gql/__generated__/graphql';

type Items = {
  type?: string;
  level: number;
  items: Omit<ContentItem, 'content'>[];
  navigation: StackNavigationProp<any, any>;
};

type RoadPhaseNavigationProp = RouteProp<DashboardStackParamList, 'Journey'>;

const Items: React.FC<Items> = ({type, level, items, navigation}) => {
  const {trackRelaxationOpened, trackLessonOpened} = useMixPanelTracking();

  const trackAndRedirect = (item: Items['items'][0]) => {
    redirectItem(navigation, item);
    switch (type) {
      case 'lesson':
        return trackLessonOpened(item.name, level);
      case 'relaxation':
        return trackRelaxationOpened(item.name, level);
    }
  };

  return (
    <>
      {items.map(item => (
        <BoxMedia
          title={item.name}
          subTitle={item.subTitle}
          onPress={() => trackAndRedirect(item)}
          isPlayable={
            item.__typename === 'AudioItem' || item.__typename === 'VideoItem'
          }
          isLocked={item.locked}
          isCompleted={(item.progress || 0) >= 80}
        />
      ))}
    </>
  );
};

const colorFirst = (journey: Pick<Journey, 'id'> | null) => {
  if (journey && journey.id === 'Sm91cm5leTox') {
    return '#FFCE8F';
  } else {
    return '#BF9BE8';
  }
};
const colorSecond = (journey: Pick<Journey, 'id'> | null) => {
  if (journey && journey.id === 'Sm91cm5leTox') {
    return '#FFA38F';
  } else {
    return '#80A8D9';
  }
};

const JourneyScreen: AppScreen<'Journey'> = ({navigation}) => {
  const route = useRoute<RoadPhaseNavigationProp>();
  const {journey, refetch} = useJourney(route.params.id);

  useFocusEffect(
    useCallback(() => {
      console.log('focus efetc');
      refetch();
    }, [refetch]),
  );

  if (!journey) {
    return (
      <SafeAreaView>
        <Text>Loading</Text>
      </SafeAreaView>
    );
  }

  const selectedLevel = journey.levels.find(
    level => level.level === route.params.level,
  );

  if (!selectedLevel) {
    return (
      <SafeAreaView>
        <Text>ERROR</Text>
      </SafeAreaView>
    );
  }

  return (
    <ColoredSafeAreaView
      color1={colorFirst(journey)}
      color2={colorSecond(journey)}
      angle={138}>
      <MainContainerWrapper>
        <MainHeader />
        <MainContainer page={'dashboard'}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Hero
              subTitle={`Úroveň ${selectedLevel.level}`}
              title={journey.name}
              state={'mainInfo'}
              progress={selectedLevel.progress}
              variant={journey.id === 'Sm91cm5leTox' ? 'depression' : 'anxiety'}
            />
            <TabbedBox
              items={[
                {
                  label: 'Etapa',
                  id: `${selectedLevel.level}_phase`,
                  render: () => (
                    <Items
                      type="lesson"
                      level={selectedLevel.level}
                      items={selectedLevel.phase}
                      navigation={navigation}
                    />
                  ),
                },
                {
                  label: 'Nástroje',
                  id: `${selectedLevel.level}_tools`,
                  render: () => (
                    <Items
                      level={selectedLevel.level}
                      items={selectedLevel.tools}
                      navigation={navigation}
                    />
                  ),
                },
                {
                  label: 'Relaxace',
                  id: `${selectedLevel.level}_relaxation`,
                  render: () => (
                    <Items
                      level={selectedLevel.level}
                      type="relaxation"
                      items={selectedLevel.relaxation}
                      navigation={navigation}
                    />
                  ),
                },
                {
                  label: 'Úkoly',
                  id: `${selectedLevel.level}_tasks`,
                  render: () => (
                    <Items
                      level={selectedLevel.level}
                      items={selectedLevel.tasks}
                      navigation={navigation}
                    />
                  ),
                },
              ]}
            />
          </ScrollView>
        </MainContainer>
      </MainContainerWrapper>
    </ColoredSafeAreaView>
  );
};

export default JourneyScreen;
