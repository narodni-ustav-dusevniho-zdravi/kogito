import JourneyDepression from './data/1_journey_fight_with_depression';
import JourneyAnxiety from './data/2_journey_fight_with_anxiety';
import BonusRelaxation from './data/bonusRelaxation';

export type Data = {
  journeys: Journey[];
  bonusRelaxation: ContentItem[];
};

export type TodoItem = {
  id: string;
  name: string;
  // time: 'morning' | 'afternoon' | 'evening';
  level: number;
};

export type Journey = {
  id: string;
  name: string;
  unlocked: boolean;
  currentLevel: 1;
  levels: LevelItem[];
  todos: TodoItem[];
  applyForLabel: ('Va' | 'Vb' | 'Vc' | 'Vd' | 'Ve' | 'Vf')[];
};

export type DataItem = {
  id: string;
  journeyId: string | null;
  name: string;
  subTitle?: string;
  image?: string | null;
  transcript?: string | null;
  previous?: string | null;
  next?: string | null;

  progress?: number;
  options?: string;

  requiredPoints: number;
};

export type AudioItem = DataItem & {
  __typename: 'AudioItem';
  duration: number;
  link: string;
};

export type ArticlePart = {
  content: string;
  continue: string;
};

export type VideoItem = DataItem & {
  __typename: 'VideoItem';
  duration: number;
  link: string;
};

export type ArticleItem = DataItem & {
  __typename: 'ArticleItem';
  content: ArticlePart[];
};

export type ContentItem = ArticleItem | AudioItem | VideoItem;

export type LevelItem = {
  id: string;
  level: number;
  unlocked: boolean;
  current: boolean;

  progress: number;

  minimumPoints: number;
  requiredPoints: number;

  phase: ContentItem[];
  relaxation: ContentItem[];
  tools: ContentItem[];
  tasks: ContentItem[];
};

export const Data: Data = {
  journeys: [JourneyDepression, JourneyAnxiety],
  bonusRelaxation: BonusRelaxation,
};
