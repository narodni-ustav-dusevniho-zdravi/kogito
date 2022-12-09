import { ContentItem } from '../data';
import { toGlobalId } from '@app/app/node';
import denik from './common/denik';
import denixAnxiety from './common/denixAnxiety';
import hodnoceniEmoci from './common/hodnoceniEmoci';
import hodnoceniEmociAnxiety from './common/hodnoceniEmociAnxiety';
import planDne from './common/planDne';
import bludnyKruh from './common/bludnyKruh';
import bludnyKruhAnxiety from './common/bludnyKruhAnxiety';

export const ToolDiary: ContentItem = {
  __typename: 'ArticleItem',
  journeyId: toGlobalId(1, 'Journey'),
  id: toGlobalId('tool:diary', 'Item'),
  name: 'Deník',
  content: denik,
  requiredPoints: 0,
  options: JSON.stringify({
    navigate: { name: 'Diary' },
  }),
};

export const ToolMoodList: ContentItem = {
  __typename: 'ArticleItem',
  journeyId: toGlobalId(1, 'Journey'),
  id: toGlobalId('tool:moodlist', 'Item'),
  name: 'Hodnocení emocí',
  content: hodnoceniEmoci,
  requiredPoints: 0,
  options: JSON.stringify({
    navigate: { name: 'MoodList' },
  }),
};

export const ToolsTodos: ContentItem = {
  __typename: 'ArticleItem',
  journeyId: toGlobalId(1, 'Journey'),
  id: toGlobalId('tool:todos', 'Item'),
  name: 'Plán dne',
  content: planDne,
  requiredPoints: 0,
  options: JSON.stringify({
    navigate: { name: 'ScheduleDay' },
  }),
};

export const ToolsViciousCircle: ContentItem = {
  __typename: 'ArticleItem',
  journeyId: toGlobalId(1, 'Journey'),
  id: toGlobalId('tool:circle', 'Item'),
  name: 'Bludný kruh',
  content: bludnyKruh,
  requiredPoints: 0,
  options: JSON.stringify({
    navigate: { name: 'ViciousCircleEdit' },
  }),
};
export const ToolsViciousCircleAnxiety: ContentItem = {
  __typename: 'ArticleItem',
  journeyId: toGlobalId(1, 'Journey'),
  id: toGlobalId('tool:circle:a', 'Item'),
  name: 'Bludný kruh',
  content: bludnyKruhAnxiety,
  requiredPoints: 0,
  options: JSON.stringify({
    navigate: { name: 'ViciousCircleEdit' },
  }),
};

export const ToolDiaryAnxiety: ContentItem = {
  __typename: 'ArticleItem',
  journeyId: toGlobalId(1, 'Journey'),
  id: toGlobalId('tool:diary:a', 'Item'),
  name: 'Deník',
  content: denixAnxiety,
  requiredPoints: 0,
  options: JSON.stringify({
    navigate: { name: 'Diary' },
  }),
};

export const ToolMoodListAnxiety: ContentItem = {
  __typename: 'ArticleItem',
  journeyId: toGlobalId(1, 'Journey'),
  id: toGlobalId('tool:moodlist:a', 'Item'),
  name: 'Hodnocení emocí',
  content: hodnoceniEmociAnxiety,
  requiredPoints: 0,
  options: JSON.stringify({
    navigate: { name: 'MoodList' },
  }),
};

export const ToolsTodosAnxiety: ContentItem = {
  __typename: 'ArticleItem',
  journeyId: toGlobalId(1, 'Journey'),
  id: toGlobalId('tool:todos:a', 'Item'),
  name: 'Plán dne',
  content: planDne,
  requiredPoints: 0,
  options: JSON.stringify({
    navigate: { name: 'ScheduleDay' },
  }),
};
