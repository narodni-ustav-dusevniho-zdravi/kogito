
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum Mood {
    SATISFIED = "SATISFIED",
    HAPPY = "HAPPY",
    OKAY = "OKAY",
    SAD = "SAD",
    VERYSAD = "VERYSAD"
}

export enum DayPart {
    MORNING = "MORNING",
    AFTERNOON = "AFTERNOON",
    EVENING = "EVENING"
}

export interface InitLoginInput {
    phoneNumber: string;
    platform?: string;
}

export interface LoginInput {
    phoneNumber: string;
    password: string;
}

export interface RefreshTokensInput {
    accessToken: string;
    refreshToken: string;
}

export interface TrackProgressInput {
    id: string;
    progress: number;
}

export interface TrackScheduleInput {
    id: string;
    checked: boolean;
}

export interface LogMoodInput {
    mood: Mood;
}

export interface EditDiaryEntryInput {
    id?: string;
    content: string;
}

export interface TodoInput {
    id?: string;
    title: string;
    dayPart: DayPart;
}

export interface TrackTodoInput {
    id: string;
    checked: boolean;
}

export interface EditViciousCircleInput {
    id?: string;
    name: string;
    trigger: string[];
    negativeThoughts: string[];
    emotions: string[];
    physicalSymptoms: string[];
    behaviour: string[];
}

export interface UserAnswerInput {
    questionId: string;
    answerIndex: number;
}

export interface UserQuestionnaireInput {
    id: string;
    answers: UserAnswerInput[];
}

export interface FinishRegistrationInput {
    email: string;
    firstName: string;
    lastName: string;
    age?: number;
    dateOfBirth?: DateTime;
    maritalStatus?: number;
    maritalStatusDescription?: string;
    numberOfChildren?: number;
    educationalAttainment?: number;
    population?: number;
    actualState?: number;
}

export interface EditProfileInput {
    firstName: string;
    lastName: string;
}

export interface NodeType {
    id: string;
}

export interface Item {
    id: string;
    name: string;
    subTitle?: string;
    image?: string;
    locked: boolean;
    options?: string;
    progress?: number;
}

export interface InitLoginResult {
    usePassword: boolean;
    useSmsCode: boolean;
}

export interface TokensResult {
    accessToken: string;
    refreshToken: string;
}

export interface IMutation {
    initLogin(input: InitLoginInput): InitLoginResult | Promise<InitLoginResult>;
    login(input: LoginInput): TokensResult | Promise<TokensResult>;
    refreshAccessToken(input: RefreshTokensInput): TokensResult | Promise<TokensResult>;
    trackProgress(input?: TrackProgressInput): TrackProgressResult | Promise<TrackProgressResult>;
    trackSchedule(input: TrackScheduleInput): TrackScheduleResult | Promise<TrackScheduleResult>;
    selectJourney(id?: string): boolean | Promise<boolean>;
    switchJourney(id: string): boolean | Promise<boolean>;
    logMood(input: LogMoodInput): LogMoodResult | Promise<LogMoodResult>;
    removeMoodRecord(id: string): boolean | Promise<boolean>;
    editDiaryEntry(input: EditDiaryEntryInput): DiaryRecord | Promise<DiaryRecord>;
    removeDiaryEntry(id: string): boolean | Promise<boolean>;
    editTodo(input: TodoInput): Viewer | Promise<Viewer>;
    removeTodo(id: string): Viewer | Promise<Viewer>;
    trackTodo(input: TrackTodoInput): Viewer | Promise<Viewer>;
    editViciousCircle(input: EditViciousCircleInput): ViciousCircle | Promise<ViciousCircle>;
    updateQuestionnaire(input: UserQuestionnaireInput): UserQuestionnaire | Promise<UserQuestionnaire>;
    finishRegistration(input: FinishRegistrationInput): FinishRegistrationResult | Promise<FinishRegistrationResult>;
    editProfile(input: EditProfileInput): EditProfileResut | Promise<EditProfileResut>;
}

export interface IQuery {
    serverTime(): DateTime | Promise<DateTime>;
    test(): string | Promise<string>;
    content(): Content | Promise<Content>;
    journey(id: string): Journey | Promise<Journey>;
    itemDetail(id: string): Item | Promise<Item>;
    audioDetail(id: string): AudioItem | Promise<AudioItem>;
    storyDetail(id: string): Story | Promise<Story>;
    testContent(): string | Promise<string>;
    moodsList(afterId?: string): MoodList | Promise<MoodList>;
    diaryList(afterId?: string): DiaryList | Promise<DiaryList>;
    diaryEntry(id: string): DiaryRecord | Promise<DiaryRecord>;
    viciousCircleList(afterId?: string): ViciousCircleList | Promise<ViciousCircleList>;
    viciousCircle(id: string): ViciousCircle | Promise<ViciousCircle>;
    currentViciousCircle(): ViciousCircle | Promise<ViciousCircle>;
    userQuestionnaires(): UserQuestionnaire[] | Promise<UserQuestionnaire[]>;
    currentUserQuestionnaires(): CurrentUserQuestionnaires | Promise<CurrentUserQuestionnaires>;
    questionnaireDetail(id: string): UserQuestionnaire | Promise<UserQuestionnaire>;
    registrationStatus(): RegistrationStatus | Promise<RegistrationStatus>;
    viewer(): Viewer | Promise<Viewer>;
}

export interface AudioItem extends Item {
    id: string;
    name: string;
    subTitle?: string;
    image?: string;
    locked: boolean;
    options?: string;
    progress?: number;
    duration: number;
    link: string;
    transcript?: string;
    previous?: string;
    next?: string;
}

export interface ArticleContentItem {
    content: string;
    continue: string;
}

export interface ArticleItem extends Item {
    id: string;
    name: string;
    subTitle?: string;
    image?: string;
    locked: boolean;
    options?: string;
    progress?: number;
    content: ArticleContentItem[];
}

export interface VideoItem extends Item {
    id: string;
    name: string;
    subTitle?: string;
    image?: string;
    locked: boolean;
    options?: string;
    progress?: number;
    link: string;
}

export interface JourneyLevel {
    id: string;
    level: number;
    progress: number;
    unlocked: boolean;
    phase: Item[];
    relaxation: Item[];
    tools: Item[];
    tasks: Item[];
}

export interface Journey {
    id: string;
    name: string;
    unlocked: boolean;
    currentLevel: number;
    currentLevelProgress: number;
    levels: JourneyLevel[];
}

export interface Story {
    id: string;
    published: DateTime;
    title: string;
    videoLink?: string;
    content: string;
}

export interface Task {
    id: string;
    name: string;
    completed: boolean;
}

export interface DailySchedule {
    morning: Task[];
    afternoon: Task[];
    evening: Task[];
}

export interface JourneyRelaxation {
    id: string;
    name: string;
    unlocked: boolean;
    relaxation: Item[];
}

export interface Content {
    stories: Story[];
    userJourney: Journey;
    currentRelaxation: Item[];
    bonusRelaxation: Item[];
    todaySchedule: DailySchedule;
    journeyRelaxation: JourneyRelaxation[];
}

export interface TrackProgressResult {
    success: boolean;
}

export interface TrackScheduleResult {
    success: boolean;
}

export interface MoodRecord {
    id: string;
    date: DateTime;
    mood: Mood;
}

export interface DiaryRecord {
    id: string;
    date: DateTime;
    previewText: string;
    content: string;
}

export interface MoodList {
    records: MoodRecord[];
    moodsCount: MoodCount[];
    havePrev: boolean;
    haveNext: boolean;
}

export interface MoodCount {
    mood: Mood;
    count: number;
}

export interface DiaryList {
    records: DiaryRecord[];
    havePrev: boolean;
    haveNext: boolean;
}

export interface LogMoodResult {
    last?: Mood;
}

export interface Todo {
    id: string;
    title: string;
    checked: boolean;
    dayPart: DayPart;
}

export interface TodoEditResult {
    todo: Todo;
    viewer: Viewer;
}

export interface Viewer {
    todayTodos: Todo[];
    id: string;
    me: User;
    haveActiveQuestionnaire: boolean;
}

export interface ViciousCircle {
    id: string;
    date: DateTime;
    name: string;
    trigger: string[];
    negativeThoughts: string[];
    emotions: string[];
    physicalSymptoms: string[];
    behaviour: string[];
}

export interface ViciousCircleList {
    records: ViciousCircle[];
    havePrev: boolean;
    haveNext: boolean;
}

export interface Answer {
    answer: string;
}

export interface UserAnswer {
    questionId: string;
    answerIndex: number;
}

export interface Question extends NodeType {
    id: string;
    question: string;
    answers: Answer[];
}

export interface Questionnaire extends NodeType {
    id: string;
    name: string;
    questions: Question[];
    questionCount: number;
}

export interface UserQuestionnaire extends NodeType {
    id: string;
    questionnaire: Questionnaire;
    finished: boolean;
    answers: UserAnswer[];
}

export interface CurrentUserQuestionnaires {
    occasion: number;
    questionnaires: UserQuestionnaire[];
}

export interface User {
    id: string;
    phoneNumber: string;
    email?: string;
    firstName: string;
    lastName: string;
    birthDate?: DateTime;
    finishedRegistration: boolean;
    userInfoCompleted: boolean;
    group: string;
    age?: number;
    dateOfBirth?: DateTime;
    maritalStatus?: number;
    maritalStatusDescription?: string;
    numberOfChildren?: number;
    educationalAttainment?: number;
    population?: number;
    actualState?: number;
}

export interface FinishRegistrationResult {
    success: boolean;
    viewer: Viewer;
}

export interface EditProfileResut {
    success: boolean;
    viewer: Viewer;
}

export interface RegistrationStatus {
    isCompleted: boolean;
    userLabel: string;
    journeysToChoose: string[];
    group: string;
}

export type DateTime = any;
