import React from 'react';
import {SafeAreaView, ScrollView, Text} from 'react-native';

import type {Journey} from '~gql/graphql';
import {logEvent} from '~modules/analytics';
import {type AppScreen, useOnScreenFocus} from '~modules/navigation';

import MainContainer from '../components/container/MainContainer/MainContainer';
import MainContainerWrapper from '../components/container/MainContainerWrapper';
import MainHeader from '../components/container/MainHeader/MainHeader';
import BoxMedia from '../components/primitives/BoxMedia';
import ColoredSafeAreaView from '../components/primitives/ColoredSafeAreaView';
import Hero from '../components/primitives/Hero/Hero';
import TabbedBox from '../components/primitives/TabbedBox';
import type {ContentItem} from '../content/types';
import {useJourney} from '../content/useJourney';
import {redirectItem} from '../helpers/redirectItem';

type Items = {
  items: Omit<ContentItem, 'content'>[];
  level: number;
  type?: string;
};

const Items: React.FC<Items> = ({type, level, items}) => {
  const trackAndRedirect = (item: Items['items'][0]) => {
    redirectItem(item);
    switch (type) {
      case 'lesson':
        return logEvent('Lesson Opened', {
          lessonTitle: item.name,
          lessonLevel: level,
        });
      case 'relaxation':
        return logEvent('Relaxation opened', {
          relaxationTitle: item.name,
          relaxationLevel: level,
        });
    }
  };

  return (
    <>
      {items.map(item => (
        <BoxMedia
          key={item.id}
          isCompleted={(item.progress || 0) >= 80}
          isLocked={item.locked}
          isPlayable={
            item.__typename === 'AudioItem' || item.__typename === 'VideoItem'
          }
          subTitle={item.subTitle}
          title={item.name}
          onPress={() => trackAndRedirect(item)}
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

const JourneyScreen: AppScreen<'Journey'> = ({route}) => {
  const {journey, refetch} = useJourney(route.params.id);

  useOnScreenFocus(() => refetch());

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
      angle={138}
      color1={colorFirst(journey)}
      color2={colorSecond(journey)}>
      <MainContainerWrapper>
        <MainHeader />
        <MainContainer page="dashboard">
          <ScrollView showsVerticalScrollIndicator={false}>
            <Hero
              progress={selectedLevel.progress}
              state="mainInfo"
              subTitle={`Úroveň ${selectedLevel.level}`}
              title={journey.name}
              variant={journey.id === 'Sm91cm5leTox' ? 'depression' : 'anxiety'}
            />
            <TabbedBox
              items={[
                {
                  label: 'Etapa',
                  id: `${selectedLevel.level}_phase`,
                  render: () => (
                    <Items
                      items={selectedLevel.phase}
                      level={selectedLevel.level}
                      type="lesson"
                    />
                  ),
                },
                {
                  label: 'Nástroje',
                  id: `${selectedLevel.level}_tools`,
                  render: () => (
                    <Items
                      items={selectedLevel.tools}
                      level={selectedLevel.level}
                    />
                  ),
                },
                {
                  label: 'Relaxace',
                  id: `${selectedLevel.level}_relaxation`,
                  render: () => (
                    <Items
                      items={selectedLevel.relaxation}
                      level={selectedLevel.level}
                      type="relaxation"
                    />
                  ),
                },
                {
                  label: 'Úkoly',
                  id: `${selectedLevel.level}_tasks`,
                  render: () => (
                    <Items
                      items={selectedLevel.tasks}
                      level={selectedLevel.level}
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
