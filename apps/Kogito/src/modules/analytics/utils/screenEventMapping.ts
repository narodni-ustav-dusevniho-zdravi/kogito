import type {AppScreenName} from '~modules/navigation';

import type {ScreenEvent} from '../types';

const map: Partial<Record<AppScreenName, ScreenEvent>> = {
  ViciousCircleEdit: 'Vicious cycle opened',
  ScheduleDay: 'Day Planner Opened',
  Todos: 'Todo Screen Opened',
  Relaxation: 'Relaxations screen opened',
  MoodList: 'Emotion Tracking opened',
  JourneySwitch: 'Switch screen opened',
  Diary: 'Journal Opened',
  DiaryEdit: 'Journal Entry Opened',
};

export const getScreenOpenedEvent = (screenName: AppScreenName) => {
  return map[screenName];
};
