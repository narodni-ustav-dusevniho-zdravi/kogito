export type NoParamsEvent =
  | 'Registration Phone Number Entered'
  | 'Login Phone Number Entered'
  | 'Application opened'
  | 'Journal Entry Added'
  | 'Todo Created'
  | 'Todo Completed'
  | 'Todo Deleted'
  | 'Vicious cycle edited'
  | 'click_login'
  | 'click_register'
  | 'click_reminder_finish'
  | 'click_profile_open'
  | ScreenEvent;

export type ScreenEvent =
  | 'Journal Opened'
  | 'Tools screen opened'
  | 'Tasks screen opened'
  | 'Switch screen opened'
  | 'Relaxations screen opened'
  | 'Vicious cycle opened'
  | 'Day Planner Opened'
  | 'Emotion Tracking opened'
  | 'Journal Entry Opened'
  | 'Todo Screen Opened'
  | 'page_intro_open'
  | 'page_default_open'
  | 'page_registration_open'
  | 'page_login_open'
  | 'page_home_open'
  | 'page_questionnaire_reminder_open'
  | `page_questionnaire${number}_open`;

export type Events = Record<NoParamsEvent, undefined> & {
  'Emotion Evaluated': {lastMood: string; mood: string};
  'Lesson Opened': {lessonLevel: number; lessonTitle: string};
  'Lesson completed': {lessonTitle: string};
  'Level Progressed': {
    currentMaxLevel: number;
    maxLevel: number;
    newLevel: number;
  };
  'Relaxation completed': {
    relaxationLevel: string;
    relaxationTitle: string;
  };
  'Relaxation opened': {
    relaxationLevel: string | number | undefined;
    relaxationTitle: string;
  };
  'Story completed': {storyLevel: number; storyTitle: string};
  'Story opened': {storyLevel: number; storyTitle: string};
  'Switch journey': {newJourney: string};
};
