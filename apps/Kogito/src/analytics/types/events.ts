export type NoParamsEvent =
  | 'Registration Phone Number Entered'
  | 'Application opened'
  | 'Journal Entry Added'
  | 'Todo Created'
  | 'Todo Completed'
  | 'Todo Deleted'
  | 'Vicious cycle edited';

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
  | 'Todo Screen Opened';

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
