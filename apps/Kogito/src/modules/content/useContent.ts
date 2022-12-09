import {useQuery} from '@apollo/client';
import {
  ContentQuery,
  ContentQueryResult,
  DailySchedule,
  Item,
  JourneyRelaxation,
  Story,
  UserJourney,
  UserJourneyLevel,
} from './graphql';

type UseContent = () => {
  userJourney: UserJourney | null;
  stories: [Story];
  newestStory: Story | null;
  currentRelaxation: [Partial<Item>];
  bonusRelaxation: [Partial<Item>];
  currentUserJourneyLevel: UserJourneyLevel | null;
  todaySchedule: DailySchedule | null;

  journeyRelaxation: JourneyRelaxation[];
  refetch: () => void;
};

export const useContent: UseContent = () => {
  const {data, error, refetch} = useQuery<ContentQueryResult>(ContentQuery);

  console.log({error});

  if (data) {
    const currentUserJourneyLevel = data.content.userJourney.levels.find(
      level => level.level === data.content.userJourney.currentLevel,
    );

    return {
      userJourney: data.content.userJourney,
      stories: data.content.stories,
      newestStory: data.content.stories[0],
      currentRelaxation: data.content.currentRelaxation,
      bonusRelaxation: data.content.bonusRelaxation,
      currentUserJourneyLevel: currentUserJourneyLevel || null,
      todaySchedule: data.content.todaySchedule,
      moodsCount: data.content.moodsCount,
      journeyRelaxation: data.content.journeyRelaxation,
      refetch,
    };
  }

  return {
    userJourney: null,
    stories: [],
    newestStory: null,
    currentRelaxation: [],
    bonusRelaxation: [],
    moodsCount: [],
    currentUserJourneyLevel: null,
    todaySchedule: null,
    journeyRelaxation: [],
    refetch,
  };
};
