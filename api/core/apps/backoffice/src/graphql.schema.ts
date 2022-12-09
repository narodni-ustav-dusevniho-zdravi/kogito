
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum UserGroup {
    normal = "normal",
    control = "control"
}

export interface LoginInput {
    username: string;
    password: string;
}

export interface AnswerInput {
    answer: string;
}

export interface QuestionInput {
    id?: string;
    question: string;
    answers?: AnswerInput[];
}

export interface NodeType {
    id: string;
}

export interface LoginResult {
    accessToken: string;
}

export interface IMutation {
    login(input: LoginInput): LoginResult | Promise<LoginResult>;
    createQuestionnaire(name: string, questions?: QuestionInput[]): Questionnaire | Promise<Questionnaire>;
    updateQuestionnaire(id: string, name: string, questions?: QuestionInput[]): Questionnaire | Promise<Questionnaire>;
    createUser(phoneNumber: string): User | Promise<User>;
}

export interface IQuery {
    serverTime(): DateTime | Promise<DateTime>;
    Questionnaire(id: string): Questionnaire | Promise<Questionnaire>;
    allQuestionnaires(): Questionnaire[] | Promise<Questionnaire[]>;
    _allQuestionnairesMeta(): QuestionnaireListMeta | Promise<QuestionnaireListMeta>;
    me(): User | Promise<User>;
    User(id: string): User | Promise<User>;
    allUsers(): User[] | Promise<User[]>;
    _allUsersMeta(): UserListMeta | Promise<UserListMeta>;
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
    isDefaultAfterRegistration: boolean;
}

export interface QuestionnaireListMeta {
    count: number;
}

export interface UserQuestionnaireItem {
    question: string;
    answer: string;
}

export interface UserQuestionnaire {
    id: string;
    name: string;
    completedAt?: DateTime;
    items: UserQuestionnaireItem[];
}

export interface UserProgress {
    actualJourney: string;
}

export interface User extends NodeType {
    id: string;
    createdAt: DateTime;
    phoneNumber: string;
    email?: string;
    firstName: string;
    lastName: string;
    birthDate?: DateTime;
    enabled: boolean;
    isAdmin: boolean;
    userQuestionnaire: UserQuestionnaire[];
    group: UserGroup;
    registrationLabel?: string;
    finishedRegistration: boolean;
    userInfoCompleted: boolean;
    invitedUser: boolean;
    age?: number;
    dateOfBirth?: DateTime;
    maritalStatus?: number;
    maritalStatusDescription?: string;
    numberOfChildren?: number;
    educationalAttainment?: number;
    population?: number;
    actualState?: number;
    actualJourney: string;
}

export interface UserListMeta {
    count: number;
}

export type DateTime = any;
