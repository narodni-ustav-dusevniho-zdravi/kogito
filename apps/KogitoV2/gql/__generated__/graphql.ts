/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type Answer = {
  __typename?: 'Answer';
  answer: Scalars['String']['output'];
};

export type ArticleContentItem = {
  __typename?: 'ArticleContentItem';
  content: Scalars['String']['output'];
  continue: Scalars['String']['output'];
};

export type ArticleItem = Item & {
  __typename?: 'ArticleItem';
  content: Array<ArticleContentItem>;
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  locked: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  options?: Maybe<Scalars['String']['output']>;
  progress?: Maybe<Scalars['Int']['output']>;
  subTitle?: Maybe<Scalars['String']['output']>;
};

export type AudioItem = Item & {
  __typename?: 'AudioItem';
  duration: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  link: Scalars['String']['output'];
  locked: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  next?: Maybe<Scalars['ID']['output']>;
  options?: Maybe<Scalars['String']['output']>;
  previous?: Maybe<Scalars['ID']['output']>;
  progress?: Maybe<Scalars['Int']['output']>;
  subTitle?: Maybe<Scalars['String']['output']>;
  transcript?: Maybe<Scalars['String']['output']>;
};

export type Content = {
  __typename?: 'Content';
  bonusRelaxation: Array<Item>;
  currentRelaxation: Array<Item>;
  journeyRelaxation: Array<JourneyRelaxation>;
  stories: Array<Story>;
  todaySchedule: DailySchedule;
  userJourney: Journey;
};

export type CurrentUserQuestionnaires = {
  __typename?: 'CurrentUserQuestionnaires';
  occasion: Scalars['Int']['output'];
  questionnaires: Array<UserQuestionnaire>;
};

export type DailySchedule = {
  __typename?: 'DailySchedule';
  afternoon: Array<Task>;
  evening: Array<Task>;
  morning: Array<Task>;
};

export type DayPart =
  | 'AFTERNOON'
  | 'EVENING'
  | 'MORNING';

export type DiaryList = {
  __typename?: 'DiaryList';
  haveNext: Scalars['Boolean']['output'];
  havePrev: Scalars['Boolean']['output'];
  records: Array<DiaryRecord>;
};

export type DiaryRecord = {
  __typename?: 'DiaryRecord';
  content: Scalars['String']['output'];
  date: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  previewText: Scalars['String']['output'];
};

export type EditDiaryEntryInput = {
  content: Scalars['String']['input'];
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type EditProfileInput = {
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
};

export type EditProfileResut = {
  __typename?: 'EditProfileResut';
  success: Scalars['Boolean']['output'];
  viewer: Viewer;
};

export type EditViciousCircleInput = {
  behaviour: Array<Scalars['String']['input']>;
  emotions: Array<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
  negativeThoughts: Array<Scalars['String']['input']>;
  physicalSymptoms: Array<Scalars['String']['input']>;
  trigger: Array<Scalars['String']['input']>;
};

export type FinishRegistrationInput = {
  actualState?: InputMaybe<Scalars['Int']['input']>;
  age?: InputMaybe<Scalars['Int']['input']>;
  dateOfBirth?: InputMaybe<Scalars['DateTime']['input']>;
  educationalAttainment?: InputMaybe<Scalars['Int']['input']>;
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  maritalStatus?: InputMaybe<Scalars['Int']['input']>;
  maritalStatusDescription?: InputMaybe<Scalars['String']['input']>;
  numberOfChildren?: InputMaybe<Scalars['Int']['input']>;
  population?: InputMaybe<Scalars['Int']['input']>;
};

export type FinishRegistrationResult = {
  __typename?: 'FinishRegistrationResult';
  success: Scalars['Boolean']['output'];
  viewer: Viewer;
};

export type InitLoginInput = {
  phoneNumber: Scalars['String']['input'];
  platform?: InputMaybe<Scalars['String']['input']>;
};

export type InitLoginResult = {
  __typename?: 'InitLoginResult';
  usePassword: Scalars['Boolean']['output'];
  useSmsCode: Scalars['Boolean']['output'];
};

export type Item = {
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  locked: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  options?: Maybe<Scalars['String']['output']>;
  progress?: Maybe<Scalars['Int']['output']>;
  subTitle?: Maybe<Scalars['String']['output']>;
};

export type Journey = {
  __typename?: 'Journey';
  currentLevel: Scalars['Int']['output'];
  currentLevelProgress: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  levels: Array<JourneyLevel>;
  name: Scalars['String']['output'];
  unlocked: Scalars['Boolean']['output'];
};

export type JourneyLevel = {
  __typename?: 'JourneyLevel';
  id: Scalars['ID']['output'];
  level: Scalars['Int']['output'];
  phase: Array<Item>;
  progress: Scalars['Int']['output'];
  relaxation: Array<Item>;
  tasks: Array<Item>;
  tools: Array<Item>;
  unlocked: Scalars['Boolean']['output'];
};

export type JourneyRelaxation = {
  __typename?: 'JourneyRelaxation';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  relaxation: Array<Item>;
  unlocked: Scalars['Boolean']['output'];
};

export type LogMoodInput = {
  mood: Mood;
};

export type LogMoodResult = {
  __typename?: 'LogMoodResult';
  last?: Maybe<Mood>;
};

export type LoginInput = {
  password: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
};

export type Mood =
  | 'HAPPY'
  | 'OKAY'
  | 'SAD'
  | 'SATISFIED'
  | 'VERYSAD';

export type MoodCount = {
  __typename?: 'MoodCount';
  count: Scalars['Int']['output'];
  mood: Mood;
};

export type MoodList = {
  __typename?: 'MoodList';
  haveNext: Scalars['Boolean']['output'];
  havePrev: Scalars['Boolean']['output'];
  moodsCount: Array<MoodCount>;
  records: Array<MoodRecord>;
};

export type MoodRecord = {
  __typename?: 'MoodRecord';
  date: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  mood: Mood;
};

export type Mutation = {
  __typename?: 'Mutation';
  editDiaryEntry?: Maybe<DiaryRecord>;
  editProfile: EditProfileResut;
  editTodo: Viewer;
  editViciousCircle?: Maybe<ViciousCircle>;
  finishRegistration: FinishRegistrationResult;
  initLogin: InitLoginResult;
  logMood: LogMoodResult;
  login: TokensResult;
  refreshAccessToken: TokensResult;
  removeDiaryEntry: Scalars['Boolean']['output'];
  removeMoodRecord: Scalars['Boolean']['output'];
  removeTodo: Viewer;
  selectJourney: Scalars['Boolean']['output'];
  switchJourney: Scalars['Boolean']['output'];
  trackProgress: TrackProgressResult;
  trackSchedule: TrackScheduleResult;
  trackTodo: Viewer;
  updateQuestionnaire: UserQuestionnaire;
};


export type MutationEditDiaryEntryArgs = {
  input: EditDiaryEntryInput;
};


export type MutationEditProfileArgs = {
  input: EditProfileInput;
};


export type MutationEditTodoArgs = {
  input: TodoInput;
};


export type MutationEditViciousCircleArgs = {
  input: EditViciousCircleInput;
};


export type MutationFinishRegistrationArgs = {
  input: FinishRegistrationInput;
};


export type MutationInitLoginArgs = {
  input: InitLoginInput;
};


export type MutationLogMoodArgs = {
  input: LogMoodInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRefreshAccessTokenArgs = {
  input: RefreshTokensInput;
};


export type MutationRemoveDiaryEntryArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveMoodRecordArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveTodoArgs = {
  id: Scalars['ID']['input'];
};


export type MutationSelectJourneyArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationSwitchJourneyArgs = {
  id: Scalars['ID']['input'];
};


export type MutationTrackProgressArgs = {
  input?: InputMaybe<TrackProgressInput>;
};


export type MutationTrackScheduleArgs = {
  input: TrackScheduleInput;
};


export type MutationTrackTodoArgs = {
  input: TrackTodoInput;
};


export type MutationUpdateQuestionnaireArgs = {
  input: UserQuestionnaireInput;
};

export type NodeType = {
  id: Scalars['ID']['output'];
};

export type Query = {
  __typename?: 'Query';
  audioDetail: AudioItem;
  content: Content;
  currentUserQuestionnaires: CurrentUserQuestionnaires;
  currentViciousCircle: ViciousCircle;
  diaryEntry: DiaryRecord;
  diaryList: DiaryList;
  itemDetail: Item;
  journey: Journey;
  moodsList: MoodList;
  questionnaireDetail: UserQuestionnaire;
  registrationStatus: RegistrationStatus;
  serverTime: Scalars['DateTime']['output'];
  storyDetail: Story;
  test: Scalars['String']['output'];
  testContent?: Maybe<Scalars['String']['output']>;
  userQuestionnaires: Array<UserQuestionnaire>;
  viciousCircle: ViciousCircle;
  viciousCircleList: ViciousCircleList;
  viewer: Viewer;
};


export type QueryAudioDetailArgs = {
  id: Scalars['ID']['input'];
};


export type QueryDiaryEntryArgs = {
  id: Scalars['ID']['input'];
};


export type QueryDiaryListArgs = {
  afterId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryItemDetailArgs = {
  id: Scalars['ID']['input'];
};


export type QueryJourneyArgs = {
  id: Scalars['ID']['input'];
};


export type QueryMoodsListArgs = {
  afterId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryQuestionnaireDetailArgs = {
  id: Scalars['ID']['input'];
};


export type QueryStoryDetailArgs = {
  id: Scalars['ID']['input'];
};


export type QueryViciousCircleArgs = {
  id: Scalars['ID']['input'];
};


export type QueryViciousCircleListArgs = {
  afterId?: InputMaybe<Scalars['ID']['input']>;
};

export type Question = NodeType & {
  __typename?: 'Question';
  answers: Array<Answer>;
  id: Scalars['ID']['output'];
  question: Scalars['String']['output'];
};

export type Questionnaire = NodeType & {
  __typename?: 'Questionnaire';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  questionCount: Scalars['Float']['output'];
  questions: Array<Question>;
};

export type RefreshTokensInput = {
  accessToken: Scalars['String']['input'];
  refreshToken: Scalars['String']['input'];
};

export type RegistrationStatus = {
  __typename?: 'RegistrationStatus';
  group: Scalars['String']['output'];
  isCompleted: Scalars['Boolean']['output'];
  journeysToChoose: Array<Scalars['ID']['output']>;
  userLabel: Scalars['String']['output'];
};

export type Story = {
  __typename?: 'Story';
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  published: Scalars['DateTime']['output'];
  title: Scalars['String']['output'];
  videoLink?: Maybe<Scalars['String']['output']>;
};

export type Task = {
  __typename?: 'Task';
  completed: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Todo = {
  __typename?: 'Todo';
  checked: Scalars['Boolean']['output'];
  dayPart: DayPart;
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
};

export type TodoEditResult = {
  __typename?: 'TodoEditResult';
  todo: Todo;
  viewer: Viewer;
};

export type TodoInput = {
  dayPart: DayPart;
  id?: InputMaybe<Scalars['ID']['input']>;
  title: Scalars['String']['input'];
};

export type TokensResult = {
  __typename?: 'TokensResult';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
};

export type TrackProgressInput = {
  id: Scalars['ID']['input'];
  progress: Scalars['Int']['input'];
};

export type TrackProgressResult = {
  __typename?: 'TrackProgressResult';
  success: Scalars['Boolean']['output'];
};

export type TrackScheduleInput = {
  checked: Scalars['Boolean']['input'];
  id: Scalars['ID']['input'];
};

export type TrackScheduleResult = {
  __typename?: 'TrackScheduleResult';
  success: Scalars['Boolean']['output'];
};

export type TrackTodoInput = {
  checked: Scalars['Boolean']['input'];
  id: Scalars['ID']['input'];
};

export type User = {
  __typename?: 'User';
  actualState?: Maybe<Scalars['Int']['output']>;
  age?: Maybe<Scalars['Int']['output']>;
  birthDate?: Maybe<Scalars['DateTime']['output']>;
  dateOfBirth?: Maybe<Scalars['DateTime']['output']>;
  educationalAttainment?: Maybe<Scalars['Int']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  finishedRegistration: Scalars['Boolean']['output'];
  firstName: Scalars['String']['output'];
  group: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  maritalStatus?: Maybe<Scalars['Int']['output']>;
  maritalStatusDescription?: Maybe<Scalars['String']['output']>;
  numberOfChildren?: Maybe<Scalars['Int']['output']>;
  phoneNumber: Scalars['String']['output'];
  population?: Maybe<Scalars['Int']['output']>;
  userInfoCompleted: Scalars['Boolean']['output'];
};

export type UserAnswer = {
  __typename?: 'UserAnswer';
  answerIndex: Scalars['Float']['output'];
  questionId: Scalars['ID']['output'];
};

export type UserAnswerInput = {
  answerIndex: Scalars['Float']['input'];
  questionId: Scalars['ID']['input'];
};

export type UserQuestionnaire = NodeType & {
  __typename?: 'UserQuestionnaire';
  answers: Array<UserAnswer>;
  finished: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  questionnaire: Questionnaire;
};

export type UserQuestionnaireInput = {
  answers: Array<UserAnswerInput>;
  id: Scalars['ID']['input'];
};

export type ViciousCircle = {
  __typename?: 'ViciousCircle';
  behaviour: Array<Scalars['String']['output']>;
  date: Scalars['DateTime']['output'];
  emotions: Array<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  negativeThoughts: Array<Scalars['String']['output']>;
  physicalSymptoms: Array<Scalars['String']['output']>;
  trigger: Array<Scalars['String']['output']>;
};

export type ViciousCircleList = {
  __typename?: 'ViciousCircleList';
  haveNext: Scalars['Boolean']['output'];
  havePrev: Scalars['Boolean']['output'];
  records: Array<ViciousCircle>;
};

export type VideoItem = Item & {
  __typename?: 'VideoItem';
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  link: Scalars['String']['output'];
  locked: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  options?: Maybe<Scalars['String']['output']>;
  progress?: Maybe<Scalars['Int']['output']>;
  subTitle?: Maybe<Scalars['String']['output']>;
};

export type Viewer = {
  __typename?: 'Viewer';
  haveActiveQuestionnaire: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  me: User;
  todayTodos: Array<Todo>;
};

export type RefreshAccessTokenMutationVariables = Exact<{
  input: RefreshTokensInput;
}>;


export type RefreshAccessTokenMutation = { __typename?: 'Mutation', refreshAccessToken: { __typename?: 'TokensResult', accessToken: string, refreshToken: string } };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'TokensResult', accessToken: string, refreshToken: string } };

export type InitLoginMutationVariables = Exact<{
  input: InitLoginInput;
}>;


export type InitLoginMutation = { __typename?: 'Mutation', initLogin: { __typename?: 'InitLoginResult', usePassword: boolean, useSmsCode: boolean } };

export type ContentQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type ContentQueryQuery = { __typename?: 'Query', content: { __typename?: 'Content', userJourney: { __typename?: 'Journey', id: string, name: string, unlocked: boolean, currentLevel: number, levels: Array<{ __typename?: 'JourneyLevel', id: string, level: number, progress: number, unlocked: boolean }> }, stories: Array<{ __typename?: 'Story', id: string, published: any, videoLink?: string | null, title: string }>, currentRelaxation: Array<{ __typename?: 'ArticleItem', id: string, name: string, image?: string | null } | { __typename?: 'AudioItem', id: string, name: string, image?: string | null } | { __typename?: 'VideoItem', id: string, name: string, image?: string | null }>, bonusRelaxation: Array<{ __typename?: 'ArticleItem', id: string, name: string, image?: string | null } | { __typename?: 'AudioItem', id: string, name: string, image?: string | null } | { __typename?: 'VideoItem', id: string, name: string, image?: string | null }>, todaySchedule: { __typename?: 'DailySchedule', morning: Array<{ __typename?: 'Task', id: string, name: string, completed: boolean }>, afternoon: Array<{ __typename?: 'Task', id: string, name: string, completed: boolean }>, evening: Array<{ __typename?: 'Task', id: string, name: string, completed: boolean }> }, journeyRelaxation: Array<{ __typename?: 'JourneyRelaxation', id: string, name: string, unlocked: boolean, relaxation: Array<{ __typename?: 'ArticleItem', id: string, name: string, subTitle?: string | null, locked: boolean, options?: string | null, progress?: number | null } | { __typename?: 'AudioItem', duration: number, link: string, id: string, name: string, subTitle?: string | null, locked: boolean, options?: string | null, progress?: number | null } | { __typename?: 'VideoItem', id: string, name: string, subTitle?: string | null, locked: boolean, options?: string | null, progress?: number | null }> }> } };

export type ItemDetailQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ItemDetailQuery = { __typename?: 'Query', itemDetail: { __typename?: 'ArticleItem', id: string, name: string, subTitle?: string | null, image?: string | null, options?: string | null, content: Array<{ __typename?: 'ArticleContentItem', content: string, continue: string }> } | { __typename?: 'AudioItem', duration: number, transcript?: string | null, link: string, next?: string | null, previous?: string | null, id: string, name: string, subTitle?: string | null, image?: string | null, options?: string | null } | { __typename?: 'VideoItem', link: string, id: string, name: string, subTitle?: string | null, image?: string | null, options?: string | null } };

export type JourneyQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type JourneyQuery = { __typename?: 'Query', journey: { __typename?: 'Journey', id: string, name: string, levels: Array<{ __typename?: 'JourneyLevel', id: string, level: number, progress: number, phase: Array<{ __typename?: 'ArticleItem', id: string, name: string, subTitle?: string | null, image?: string | null, locked: boolean, options?: string | null, progress?: number | null } | { __typename?: 'AudioItem', duration: number, link: string, id: string, name: string, subTitle?: string | null, image?: string | null, locked: boolean, options?: string | null, progress?: number | null } | { __typename?: 'VideoItem', id: string, name: string, subTitle?: string | null, image?: string | null, locked: boolean, options?: string | null, progress?: number | null }>, relaxation: Array<{ __typename?: 'ArticleItem', id: string, name: string, subTitle?: string | null, image?: string | null, locked: boolean, options?: string | null, progress?: number | null } | { __typename?: 'AudioItem', duration: number, link: string, id: string, name: string, subTitle?: string | null, image?: string | null, locked: boolean, options?: string | null, progress?: number | null } | { __typename?: 'VideoItem', id: string, name: string, subTitle?: string | null, image?: string | null, locked: boolean, options?: string | null, progress?: number | null }>, tools: Array<{ __typename?: 'ArticleItem', id: string, name: string, subTitle?: string | null, image?: string | null, locked: boolean, options?: string | null, progress?: number | null } | { __typename?: 'AudioItem', duration: number, link: string, id: string, name: string, subTitle?: string | null, image?: string | null, locked: boolean, options?: string | null, progress?: number | null } | { __typename?: 'VideoItem', id: string, name: string, subTitle?: string | null, image?: string | null, locked: boolean, options?: string | null, progress?: number | null }>, tasks: Array<{ __typename?: 'ArticleItem', id: string, name: string, subTitle?: string | null, image?: string | null, locked: boolean, options?: string | null, progress?: number | null } | { __typename?: 'AudioItem', duration: number, link: string, id: string, name: string, subTitle?: string | null, image?: string | null, locked: boolean, options?: string | null, progress?: number | null } | { __typename?: 'VideoItem', id: string, name: string, subTitle?: string | null, image?: string | null, locked: boolean, options?: string | null, progress?: number | null }> }> } };

export type SelectJourneyMutationVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
}>;


export type SelectJourneyMutation = { __typename?: 'Mutation', selectJourney: boolean };

export type StoryDetailQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type StoryDetailQuery = { __typename?: 'Query', storyDetail: { __typename?: 'Story', id: string, title: string, published: any, content: string, videoLink?: string | null } };

export type SwitchJourneyMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type SwitchJourneyMutation = { __typename?: 'Mutation', switchJourney: boolean };

export type TrackProgressMutationVariables = Exact<{
  input: TrackProgressInput;
}>;


export type TrackProgressMutation = { __typename?: 'Mutation', trackProgress: { __typename?: 'TrackProgressResult', success: boolean } };

export type TrackScheduleMutationVariables = Exact<{
  input: TrackScheduleInput;
}>;


export type TrackScheduleMutation = { __typename?: 'Mutation', trackSchedule: { __typename?: 'TrackScheduleResult', success: boolean } };

export type DiaryEntryQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DiaryEntryQuery = { __typename?: 'Query', diaryEntry: { __typename?: 'DiaryRecord', id: string, date: any, content: string } };

export type EditDiaryEntryMutationVariables = Exact<{
  input: EditDiaryEntryInput;
}>;


export type EditDiaryEntryMutation = { __typename?: 'Mutation', editDiaryEntry?: { __typename?: 'DiaryRecord', id: string, date: any, previewText: string, content: string } | null };

export type RemoveDiaryEntryMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveDiaryEntryMutation = { __typename?: 'Mutation', removeDiaryEntry: boolean };

export type DiaryListQueryVariables = Exact<{
  afterId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type DiaryListQuery = { __typename?: 'Query', diaryList: { __typename?: 'DiaryList', haveNext: boolean, records: Array<{ __typename?: 'DiaryRecord', id: string, date: any, previewText: string }> } };

export type LogMoodMutationVariables = Exact<{
  input: LogMoodInput;
}>;


export type LogMoodMutation = { __typename?: 'Mutation', logMood: { __typename?: 'LogMoodResult', last?: Mood | null } };

export type MoodsListQueryVariables = Exact<{
  afterId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type MoodsListQuery = { __typename?: 'Query', moodsList: { __typename?: 'MoodList', haveNext: boolean, records: Array<{ __typename?: 'MoodRecord', id: string, date: any, mood: Mood }>, moodsCount: Array<{ __typename?: 'MoodCount', mood: Mood, count: number }> } };

export type TodosQueryVariables = Exact<{ [key: string]: never; }>;


export type TodosQuery = { __typename?: 'Query', viewer: { __typename?: 'Viewer', id: string, todayTodos: Array<{ __typename?: 'Todo', id: string, title: string, checked: boolean, dayPart: DayPart }> } };

export type EditTodoMutationVariables = Exact<{
  input: TodoInput;
}>;


export type EditTodoMutation = { __typename?: 'Mutation', editTodo: { __typename?: 'Viewer', id: string, todayTodos: Array<{ __typename?: 'Todo', id: string, title: string, checked: boolean, dayPart: DayPart }> } };

export type TrackTodoMutationVariables = Exact<{
  input: TrackTodoInput;
}>;


export type TrackTodoMutation = { __typename?: 'Mutation', trackTodo: { __typename?: 'Viewer', id: string, todayTodos: Array<{ __typename?: 'Todo', id: string, title: string, checked: boolean, dayPart: DayPart }> } };

export type RemoveTodoMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveTodoMutation = { __typename?: 'Mutation', removeTodo: { __typename?: 'Viewer', todayTodos: Array<{ __typename?: 'Todo', id: string, title: string, checked: boolean, dayPart: DayPart }> } };

export type ViciousCircleQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ViciousCircleQuery = { __typename?: 'Query', viciousCircle: { __typename?: 'ViciousCircle', id: string, date: any, name: string, trigger: Array<string>, negativeThoughts: Array<string>, emotions: Array<string>, physicalSymptoms: Array<string>, behaviour: Array<string> } };

export type CurrentViciousCircleQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentViciousCircleQuery = { __typename?: 'Query', currentViciousCircle: { __typename?: 'ViciousCircle', id: string, date: any, name: string, trigger: Array<string>, negativeThoughts: Array<string>, emotions: Array<string>, physicalSymptoms: Array<string>, behaviour: Array<string> } };

export type EditViciousCircleMutationVariables = Exact<{
  input: EditViciousCircleInput;
}>;


export type EditViciousCircleMutation = { __typename?: 'Mutation', editViciousCircle?: { __typename?: 'ViciousCircle', id: string, name: string, date: any, trigger: Array<string>, negativeThoughts: Array<string>, emotions: Array<string>, physicalSymptoms: Array<string>, behaviour: Array<string> } | null };

export type ViciousCircleListQueryVariables = Exact<{
  afterId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type ViciousCircleListQuery = { __typename?: 'Query', viciousCircleList: { __typename?: 'ViciousCircleList', haveNext: boolean, records: Array<{ __typename?: 'ViciousCircle', id: string, name: string, date: any }> } };

export type CurrentUserQuestionnairesQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuestionnairesQuery = { __typename?: 'Query', currentUserQuestionnaires: { __typename?: 'CurrentUserQuestionnaires', occasion: number, questionnaires: Array<{ __typename?: 'UserQuestionnaire', id: string, finished: boolean, questionnaire: { __typename?: 'Questionnaire', id: string, name: string, questionCount: number } }> }, viewer: { __typename?: 'Viewer', haveActiveQuestionnaire: boolean }, registrationStatus: { __typename?: 'RegistrationStatus', journeysToChoose: Array<string> } };

export type QuestionnaireDetailQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type QuestionnaireDetailQuery = { __typename?: 'Query', questionnaireDetail: { __typename?: 'UserQuestionnaire', id: string, answers: Array<{ __typename?: 'UserAnswer', questionId: string, answerIndex: number }>, questionnaire: { __typename?: 'Questionnaire', name: string, questionCount: number, questions: Array<{ __typename?: 'Question', id: string, question: string, answers: Array<{ __typename?: 'Answer', answer: string }> }> } } };

export type UpdateQuestionnaireMutationVariables = Exact<{
  input: UserQuestionnaireInput;
}>;


export type UpdateQuestionnaireMutation = { __typename?: 'Mutation', updateQuestionnaire: { __typename?: 'UserQuestionnaire', id: string, finished: boolean } };

export type UserQuestionnairesQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuestionnairesQuery = { __typename?: 'Query', userQuestionnaires: Array<{ __typename?: 'UserQuestionnaire', id: string, finished: boolean, questionnaire: { __typename?: 'Questionnaire', id: string, name: string, questionCount: number } }>, viewer: { __typename?: 'Viewer', me: { __typename?: 'User', userInfoCompleted: boolean } } };

export type EditProfileMutationVariables = Exact<{
  input: EditProfileInput;
}>;


export type EditProfileMutation = { __typename?: 'Mutation', editProfile: { __typename?: 'EditProfileResut', viewer: { __typename?: 'Viewer', me: { __typename?: 'User', firstName: string, lastName: string } } } };

export type FinishRegistrationMutationVariables = Exact<{
  input: FinishRegistrationInput;
}>;


export type FinishRegistrationMutation = { __typename?: 'Mutation', finishRegistration: { __typename?: 'FinishRegistrationResult', success: boolean, viewer: { __typename?: 'Viewer', me: { __typename?: 'User', firstName: string, lastName: string, email?: string | null, finishedRegistration: boolean, userInfoCompleted: boolean, age?: number | null, dateOfBirth?: any | null, maritalStatus?: number | null, maritalStatusDescription?: string | null, numberOfChildren?: number | null, educationalAttainment?: number | null, population?: number | null } } } };

export type MeQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQueryQuery = { __typename?: 'Query', viewer: { __typename?: 'Viewer', id: string, haveActiveQuestionnaire: boolean, me: { __typename?: 'User', id: string, firstName: string, lastName: string, email?: string | null, finishedRegistration: boolean, userInfoCompleted: boolean, age?: number | null, dateOfBirth?: any | null, maritalStatus?: number | null, maritalStatusDescription?: string | null, numberOfChildren?: number | null, educationalAttainment?: number | null, population?: number | null, actualState?: number | null } } };

export type RegistrationStatusQueryVariables = Exact<{ [key: string]: never; }>;


export type RegistrationStatusQuery = { __typename?: 'Query', registrationStatus: { __typename?: 'RegistrationStatus', isCompleted: boolean, userLabel: string, journeysToChoose: Array<string>, group: string } };

export type RemoveMoodRecordMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveMoodRecordMutation = { __typename?: 'Mutation', removeMoodRecord: boolean };


export const RefreshAccessTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"refreshAccessToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RefreshTokensInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshAccessToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]} as unknown as DocumentNode<RefreshAccessTokenMutation, RefreshAccessTokenMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const InitLoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"initLogin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InitLoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"initLogin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"usePassword"}},{"kind":"Field","name":{"kind":"Name","value":"useSmsCode"}}]}}]}}]} as unknown as DocumentNode<InitLoginMutation, InitLoginMutationVariables>;
export const ContentQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ContentQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userJourney"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"unlocked"}},{"kind":"Field","name":{"kind":"Name","value":"currentLevel"}},{"kind":"Field","name":{"kind":"Name","value":"levels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"unlocked"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"stories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"videoLink"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"currentRelaxation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bonusRelaxation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"todaySchedule"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"morning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}}]}},{"kind":"Field","name":{"kind":"Name","value":"afternoon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}}]}},{"kind":"Field","name":{"kind":"Name","value":"evening"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"journeyRelaxation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"unlocked"}},{"kind":"Field","name":{"kind":"Name","value":"relaxation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"subTitle"}},{"kind":"Field","name":{"kind":"Name","value":"locked"}},{"kind":"Field","name":{"kind":"Name","value":"options"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AudioItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"link"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<ContentQueryQuery, ContentQueryQueryVariables>;
export const ItemDetailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"itemDetail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemDetail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"subTitle"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"options"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AudioItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"transcript"}},{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"next"}},{"kind":"Field","name":{"kind":"Name","value":"previous"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ArticleItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"continue"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VideoItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}}]}}]}}]}}]} as unknown as DocumentNode<ItemDetailQuery, ItemDetailQueryVariables>;
export const JourneyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"journey"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"journey"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"levels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"phase"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"subTitle"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"locked"}},{"kind":"Field","name":{"kind":"Name","value":"options"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AudioItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"link"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"relaxation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"subTitle"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"locked"}},{"kind":"Field","name":{"kind":"Name","value":"options"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AudioItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"link"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"tools"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"subTitle"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"locked"}},{"kind":"Field","name":{"kind":"Name","value":"options"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AudioItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"link"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"subTitle"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"locked"}},{"kind":"Field","name":{"kind":"Name","value":"options"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AudioItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"link"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<JourneyQuery, JourneyQueryVariables>;
export const SelectJourneyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"selectJourney"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"selectJourney"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<SelectJourneyMutation, SelectJourneyMutationVariables>;
export const StoryDetailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"storyDetail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"storyDetail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"videoLink"}}]}}]}}]} as unknown as DocumentNode<StoryDetailQuery, StoryDetailQueryVariables>;
export const SwitchJourneyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"switchJourney"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"switchJourney"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<SwitchJourneyMutation, SwitchJourneyMutationVariables>;
export const TrackProgressDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"trackProgress"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackProgressInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"trackProgress"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<TrackProgressMutation, TrackProgressMutationVariables>;
export const TrackScheduleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"trackSchedule"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackScheduleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"trackSchedule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<TrackScheduleMutation, TrackScheduleMutationVariables>;
export const DiaryEntryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"diaryEntry"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"diaryEntry"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}}]} as unknown as DocumentNode<DiaryEntryQuery, DiaryEntryQueryVariables>;
export const EditDiaryEntryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"editDiaryEntry"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EditDiaryEntryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editDiaryEntry"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"previewText"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}}]} as unknown as DocumentNode<EditDiaryEntryMutation, EditDiaryEntryMutationVariables>;
export const RemoveDiaryEntryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeDiaryEntry"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeDiaryEntry"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<RemoveDiaryEntryMutation, RemoveDiaryEntryMutationVariables>;
export const DiaryListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"diaryList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"afterId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"diaryList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"afterId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"afterId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"previewText"}}]}},{"kind":"Field","name":{"kind":"Name","value":"haveNext"}}]}}]}}]} as unknown as DocumentNode<DiaryListQuery, DiaryListQueryVariables>;
export const LogMoodDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"logMood"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LogMoodInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logMood"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"last"}}]}}]}}]} as unknown as DocumentNode<LogMoodMutation, LogMoodMutationVariables>;
export const MoodsListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"moodsList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"afterId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"moodsList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"afterId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"afterId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"mood"}}]}},{"kind":"Field","name":{"kind":"Name","value":"moodsCount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mood"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"haveNext"}}]}}]}}]} as unknown as DocumentNode<MoodsListQuery, MoodsListQueryVariables>;
export const TodosDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Todos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"todayTodos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"checked"}},{"kind":"Field","name":{"kind":"Name","value":"dayPart"}}]}}]}}]}}]} as unknown as DocumentNode<TodosQuery, TodosQueryVariables>;
export const EditTodoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"editTodo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TodoInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editTodo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"todayTodos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"checked"}},{"kind":"Field","name":{"kind":"Name","value":"dayPart"}}]}}]}}]}}]} as unknown as DocumentNode<EditTodoMutation, EditTodoMutationVariables>;
export const TrackTodoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"trackTodo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackTodoInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"trackTodo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"todayTodos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"checked"}},{"kind":"Field","name":{"kind":"Name","value":"dayPart"}}]}}]}}]}}]} as unknown as DocumentNode<TrackTodoMutation, TrackTodoMutationVariables>;
export const RemoveTodoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeTodo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeTodo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"todayTodos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"checked"}},{"kind":"Field","name":{"kind":"Name","value":"dayPart"}}]}}]}}]}}]} as unknown as DocumentNode<RemoveTodoMutation, RemoveTodoMutationVariables>;
export const ViciousCircleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"viciousCircle"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viciousCircle"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"trigger"}},{"kind":"Field","name":{"kind":"Name","value":"negativeThoughts"}},{"kind":"Field","name":{"kind":"Name","value":"emotions"}},{"kind":"Field","name":{"kind":"Name","value":"physicalSymptoms"}},{"kind":"Field","name":{"kind":"Name","value":"behaviour"}}]}}]}}]} as unknown as DocumentNode<ViciousCircleQuery, ViciousCircleQueryVariables>;
export const CurrentViciousCircleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"currentViciousCircle"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentViciousCircle"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"trigger"}},{"kind":"Field","name":{"kind":"Name","value":"negativeThoughts"}},{"kind":"Field","name":{"kind":"Name","value":"emotions"}},{"kind":"Field","name":{"kind":"Name","value":"physicalSymptoms"}},{"kind":"Field","name":{"kind":"Name","value":"behaviour"}}]}}]}}]} as unknown as DocumentNode<CurrentViciousCircleQuery, CurrentViciousCircleQueryVariables>;
export const EditViciousCircleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"editViciousCircle"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EditViciousCircleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editViciousCircle"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"trigger"}},{"kind":"Field","name":{"kind":"Name","value":"negativeThoughts"}},{"kind":"Field","name":{"kind":"Name","value":"emotions"}},{"kind":"Field","name":{"kind":"Name","value":"physicalSymptoms"}},{"kind":"Field","name":{"kind":"Name","value":"behaviour"}}]}}]}}]} as unknown as DocumentNode<EditViciousCircleMutation, EditViciousCircleMutationVariables>;
export const ViciousCircleListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"viciousCircleList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"afterId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viciousCircleList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"afterId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"afterId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}},{"kind":"Field","name":{"kind":"Name","value":"haveNext"}}]}}]}}]} as unknown as DocumentNode<ViciousCircleListQuery, ViciousCircleListQueryVariables>;
export const CurrentUserQuestionnairesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CurrentUserQuestionnaires"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentUserQuestionnaires"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"occasion"}},{"kind":"Field","name":{"kind":"Name","value":"questionnaires"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"finished"}},{"kind":"Field","name":{"kind":"Name","value":"questionnaire"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"questionCount"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"haveActiveQuestionnaire"}}]}},{"kind":"Field","name":{"kind":"Name","value":"registrationStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"journeysToChoose"}}]}}]}}]} as unknown as DocumentNode<CurrentUserQuestionnairesQuery, CurrentUserQuestionnairesQueryVariables>;
export const QuestionnaireDetailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"questionnaireDetail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"questionnaireDetail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"answers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"questionId"}},{"kind":"Field","name":{"kind":"Name","value":"answerIndex"}}]}},{"kind":"Field","name":{"kind":"Name","value":"questionnaire"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"questionCount"}},{"kind":"Field","name":{"kind":"Name","value":"questions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"question"}},{"kind":"Field","name":{"kind":"Name","value":"answers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"answer"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<QuestionnaireDetailQuery, QuestionnaireDetailQueryVariables>;
export const UpdateQuestionnaireDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateQuestionnaire"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserQuestionnaireInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateQuestionnaire"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"finished"}}]}}]}}]} as unknown as DocumentNode<UpdateQuestionnaireMutation, UpdateQuestionnaireMutationVariables>;
export const UserQuestionnairesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserQuestionnaires"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userQuestionnaires"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"finished"}},{"kind":"Field","name":{"kind":"Name","value":"questionnaire"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"questionCount"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userInfoCompleted"}}]}}]}}]}}]} as unknown as DocumentNode<UserQuestionnairesQuery, UserQuestionnairesQueryVariables>;
export const EditProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"editProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EditProfileInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]}}]} as unknown as DocumentNode<EditProfileMutation, EditProfileMutationVariables>;
export const FinishRegistrationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"finishRegistration"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FinishRegistrationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"finishRegistration"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"finishedRegistration"}},{"kind":"Field","name":{"kind":"Name","value":"userInfoCompleted"}},{"kind":"Field","name":{"kind":"Name","value":"age"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"maritalStatus"}},{"kind":"Field","name":{"kind":"Name","value":"maritalStatusDescription"}},{"kind":"Field","name":{"kind":"Name","value":"numberOfChildren"}},{"kind":"Field","name":{"kind":"Name","value":"educationalAttainment"}},{"kind":"Field","name":{"kind":"Name","value":"population"}}]}}]}}]}}]}}]} as unknown as DocumentNode<FinishRegistrationMutation, FinishRegistrationMutationVariables>;
export const MeQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MeQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"finishedRegistration"}},{"kind":"Field","name":{"kind":"Name","value":"userInfoCompleted"}},{"kind":"Field","name":{"kind":"Name","value":"age"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"maritalStatus"}},{"kind":"Field","name":{"kind":"Name","value":"maritalStatusDescription"}},{"kind":"Field","name":{"kind":"Name","value":"numberOfChildren"}},{"kind":"Field","name":{"kind":"Name","value":"educationalAttainment"}},{"kind":"Field","name":{"kind":"Name","value":"population"}},{"kind":"Field","name":{"kind":"Name","value":"actualState"}}]}},{"kind":"Field","name":{"kind":"Name","value":"haveActiveQuestionnaire"}}]}}]}}]} as unknown as DocumentNode<MeQueryQuery, MeQueryQueryVariables>;
export const RegistrationStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RegistrationStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registrationStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isCompleted"}},{"kind":"Field","name":{"kind":"Name","value":"userLabel"}},{"kind":"Field","name":{"kind":"Name","value":"journeysToChoose"}},{"kind":"Field","name":{"kind":"Name","value":"group"}}]}}]}}]} as unknown as DocumentNode<RegistrationStatusQuery, RegistrationStatusQueryVariables>;
export const RemoveMoodRecordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeMoodRecord"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeMoodRecord"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<RemoveMoodRecordMutation, RemoveMoodRecordMutationVariables>;