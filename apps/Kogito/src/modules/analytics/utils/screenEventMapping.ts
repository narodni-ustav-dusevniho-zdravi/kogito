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
  Intro: 'page_intro_open',
  LoginOrRegister: 'page_default_open',
  LoginPopup: 'page_login_open',
  RegisterPopup: 'page_registration_open',
  AfterMonthQuestionnaire: 'page_questionnaire_reminder_open',
  MyDay: 'page_home_open',
};

export const getScreenOpenedEvent = (
  screenName: AppScreenName,
): ScreenEvent | undefined => {
  return map[screenName];
};
