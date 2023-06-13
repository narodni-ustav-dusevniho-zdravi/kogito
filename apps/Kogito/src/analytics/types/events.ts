export type NoParamsEvent =
  | 'Registration Phone Number Entered'
  | 'Application opened'
  | 'Emotion Tracking opened'
  | 'Journal Opened'
  | 'Journal Entry Added'
  | 'Journal Entry Opened'
  | 'Day Planner Opened'
  | 'Todo Screen Opened'
  | 'Todo Created'
  | 'Todo Completed'
  | 'Todo Deleted'
  | 'Vicious cycle opened'
  | 'Vicious cycle edited'
  | 'Tools screen opened'
  | 'Relaxations screen opened'
  | 'Tasks screen opened'
  | 'Switch screen opened';

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
