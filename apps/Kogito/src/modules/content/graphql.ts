import {gql} from '@apollo/client';
import {Mood} from '../diary/useLogMood';

export type Item = {
  id: string;
  __typename: 'AudioItem' | 'ArticleItem' | 'VideoItem';
  name: string;
  subTitle: string | null;
  image: string | null;
  locked: boolean;
  progress: number;
  options: string | null;
};

export type UserJourneyLevel = {
  id: string;
  level: number;
  progress: number;
  unlocked: boolean;
  phase: [Item];
  relaxation: [Item];
  tools: [Item];
  tasks: [Item];
};

export type UserJourney = {
  id: string;
  name: string;
  unlocked: boolean;
  currentLevel: number;
  levelProgress: number;
  currentLevelProgress: number;
  levels: [UserJourneyLevel];
};

export type Story = {
  id: string;
  published: Date;
  title: string;
  content: string;
  videoLink: string | null;
};

export type Task = {
  id: string;
  name: string;
  completed: boolean;
};

export type DailySchedule = {
  morning: Task[];
  afternoon: Task[];
  evening: Task[];
};

export type MoodCount = {
  mood: Mood;
  count: number;
};

export type JourneyRelaxation = {
  id: string;
  name: string;
  unlocked: boolean;
  relaxation: [Item];
};

export type ContentQueryResult = {
  content: {
    userJourney: UserJourney;
    stories: [Partial<Story>];
    currentRelaxation: [Partial<Item>];
    bonusRelaxation: [Partial<Item>];
    todaySchedule: DailySchedule;
    moodsCount: MoodCount[];
    journeyRelaxation: JourneyRelaxation[];
  };
};

export const ContentQuery = gql`
  {
    content {
      userJourney {
        id
        name
        unlocked
        currentLevel
        levels {
          id
          level
          progress
          unlocked
        }
      }
      stories {
        id
        published
        videoLink
        title
      }
      currentRelaxation {
        id
        name
        image
      }
      bonusRelaxation {
        id
        name
        image
      }
      todaySchedule {
        morning {
          id
          name
          completed
        }
        afternoon {
          id
          name
          completed
        }
        evening {
          id
          name
          completed
        }
      }
      journeyRelaxation {
        id
        name
        unlocked
        relaxation {
          id
          name
          subTitle
          locked
          options
          progress
          ... on AudioItem {
            duration
            link
          }
        }
      }
    }
  }
`;

export type JourneyQueryResult = {
  journey: UserJourney;
};

export const JourneyQuery = gql`
  query journey($id: ID!) {
    journey(id: $id) {
      id
      name
      levels {
        id
        level
        progress
        phase {
          id
          name
          subTitle
          image
          locked
          options
          progress
          ... on AudioItem {
            duration
            link
          }
        }
        relaxation {
          id
          name
          subTitle
          image
          locked
          options
          progress
          ... on AudioItem {
            duration
            link
          }
        }
        tools {
          id
          name
          subTitle
          image
          locked
          options
          progress
          ... on AudioItem {
            duration
            link
          }
        }
        tasks {
          id
          name
          subTitle
          image
          locked
          options
          progress
          ... on AudioItem {
            duration
            link
          }
        }
      }
    }
  }
`;
