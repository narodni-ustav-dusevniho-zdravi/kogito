/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation refreshAccessToken($input: RefreshTokensInput!) {\n    refreshAccessToken(input: $input) {\n      accessToken\n      refreshToken\n    }\n  }\n": types.RefreshAccessTokenDocument,
    "\n  mutation login($input: LoginInput!) {\n    login(input: $input) {\n      accessToken\n      refreshToken\n    }\n  }\n": types.LoginDocument,
    "\n  mutation initLogin($input: InitLoginInput!) {\n    initLogin(input: $input) {\n      usePassword\n      useSmsCode\n    }\n  }\n": types.InitLoginDocument,
    "\n  query ContentQuery {\n    content {\n      userJourney {\n        id\n        name\n        unlocked\n        currentLevel\n        levels {\n          id\n          level\n          progress\n          unlocked\n        }\n      }\n      stories {\n        id\n        published\n        videoLink\n        title\n      }\n      currentRelaxation {\n        id\n        name\n        image\n      }\n      bonusRelaxation {\n        id\n        name\n        image\n      }\n      todaySchedule {\n        morning {\n          id\n          name\n          completed\n        }\n        afternoon {\n          id\n          name\n          completed\n        }\n        evening {\n          id\n          name\n          completed\n        }\n      }\n      journeyRelaxation {\n        id\n        name\n        unlocked\n        relaxation {\n          id\n          name\n          subTitle\n          locked\n          options\n          progress\n          ... on AudioItem {\n            duration\n            link\n          }\n        }\n      }\n    }\n  }\n": types.ContentQueryDocument,
    "\n  query itemDetail($id: ID!) {\n    itemDetail(id: $id) {\n      id\n      name\n      subTitle\n      image\n      options\n      ... on AudioItem {\n        duration\n        transcript\n        link\n        next\n        previous\n      }\n      ... on ArticleItem {\n        content {\n          content\n          continue\n        }\n      }\n      ... on VideoItem {\n        link\n      }\n    }\n  }\n": types.ItemDetailDocument,
    "\n  query journey($id: ID!) {\n    journey(id: $id) {\n      id\n      name\n      levels {\n        id\n        level\n        progress\n        phase {\n          id\n          name\n          subTitle\n          image\n          locked\n          options\n          progress\n          ... on AudioItem {\n            duration\n            link\n          }\n        }\n        relaxation {\n          id\n          name\n          subTitle\n          image\n          locked\n          options\n          progress\n          ... on AudioItem {\n            duration\n            link\n          }\n        }\n        tools {\n          id\n          name\n          subTitle\n          image\n          locked\n          options\n          progress\n          ... on AudioItem {\n            duration\n            link\n          }\n        }\n        tasks {\n          id\n          name\n          subTitle\n          image\n          locked\n          options\n          progress\n          ... on AudioItem {\n            duration\n            link\n          }\n        }\n      }\n    }\n  }\n": types.JourneyDocument,
    "\n  mutation selectJourney($id: ID) {\n    selectJourney(id: $id)\n  }\n": types.SelectJourneyDocument,
    "\n  query storyDetail($id: ID!) {\n    storyDetail(id: $id) {\n      id\n      title\n      published\n      content\n      videoLink\n    }\n  }\n": types.StoryDetailDocument,
    "\n  mutation switchJourney($id: ID!) {\n    switchJourney(id: $id)\n  }\n": types.SwitchJourneyDocument,
    "\n  mutation trackProgress($input: TrackProgressInput!) {\n    trackProgress(input: $input) {\n      success\n    }\n  }\n": types.TrackProgressDocument,
    "\n  mutation trackSchedule($input: TrackScheduleInput!) {\n    trackSchedule(input: $input) {\n      success\n    }\n  }\n": types.TrackScheduleDocument,
    "\n  query diaryEntry($id: ID!) {\n    diaryEntry(id: $id) {\n      id\n      date\n      content\n    }\n  }\n": types.DiaryEntryDocument,
    "\n  mutation editDiaryEntry($input: EditDiaryEntryInput!) {\n    editDiaryEntry(input: $input) {\n      id\n      date\n      previewText\n      content\n    }\n  }\n": types.EditDiaryEntryDocument,
    "\n  mutation removeDiaryEntry($id: ID!) {\n    removeDiaryEntry(id: $id)\n  }\n": types.RemoveDiaryEntryDocument,
    "\n  query diaryList($afterId: ID) {\n    diaryList(afterId: $afterId) {\n      records {\n        id\n        date\n        previewText\n      }\n      haveNext\n    }\n  }\n": types.DiaryListDocument,
    "\n  mutation logMood($input: LogMoodInput!) {\n    logMood(input: $input) {\n      last\n    }\n  }\n": types.LogMoodDocument,
    "\n  query moodsList($afterId: ID) {\n    moodsList(afterId: $afterId) {\n      records {\n        id\n        date\n        mood\n      }\n      moodsCount {\n        mood\n        count\n      }\n      haveNext\n    }\n  }\n": types.MoodsListDocument,
    "\n  query Todos {\n    viewer {\n      id\n      todayTodos {\n        id\n        title\n        checked\n        dayPart\n      }\n    }\n  }\n": types.TodosDocument,
    "\n  mutation editTodo($input: TodoInput!) {\n    editTodo(input: $input) {\n      id\n      todayTodos {\n        id\n        title\n        checked\n        dayPart\n      }\n    }\n  }\n": types.EditTodoDocument,
    "\n  mutation trackTodo($input: TrackTodoInput!) {\n    trackTodo(input: $input) {\n      id\n      todayTodos {\n        id\n        title\n        checked\n        dayPart\n      }\n    }\n  }\n": types.TrackTodoDocument,
    "\n  mutation removeTodo($id: ID!) {\n    removeTodo(id: $id) {\n      todayTodos {\n        id\n        title\n        checked\n        dayPart\n      }\n    }\n  }\n": types.RemoveTodoDocument,
    "\n  query viciousCircle($id: ID!) {\n    viciousCircle(id: $id) {\n      id\n      date\n      name\n      trigger\n      negativeThoughts\n      emotions\n      physicalSymptoms\n      behaviour\n    }\n  }\n": types.ViciousCircleDocument,
    "\n  query currentViciousCircle {\n    currentViciousCircle {\n      id\n      date\n      name\n      trigger\n      negativeThoughts\n      emotions\n      physicalSymptoms\n      behaviour\n    }\n  }\n": types.CurrentViciousCircleDocument,
    "\n  mutation editViciousCircle($input: EditViciousCircleInput!) {\n    editViciousCircle(input: $input) {\n      id\n      name\n      date\n      trigger\n      negativeThoughts\n      emotions\n      physicalSymptoms\n      behaviour\n    }\n  }\n": types.EditViciousCircleDocument,
    "\n  query viciousCircleList($afterId: ID) {\n    viciousCircleList(afterId: $afterId) {\n      records {\n        id\n        name\n        date\n      }\n      haveNext\n    }\n  }\n": types.ViciousCircleListDocument,
    "\n  query CurrentUserQuestionnaires {\n    currentUserQuestionnaires {\n      occasion\n      questionnaires {\n        id\n        finished\n        questionnaire {\n          id\n          name\n          questionCount\n        }\n      }\n    }\n    viewer {\n      haveActiveQuestionnaire\n    }\n    registrationStatus {\n      journeysToChoose\n    }\n  }\n": types.CurrentUserQuestionnairesDocument,
    "\n  query questionnaireDetail($id: ID!) {\n    questionnaireDetail(id: $id) {\n      id\n      answers {\n        questionId\n        answerIndex\n      }\n      questionnaire {\n        name\n        questionCount\n        questions {\n          id\n          question\n          answers {\n            answer\n          }\n        }\n      }\n    }\n  }\n": types.QuestionnaireDetailDocument,
    "\n  mutation updateQuestionnaire($input: UserQuestionnaireInput!) {\n    updateQuestionnaire(input: $input) {\n      id\n      finished\n    }\n  }\n": types.UpdateQuestionnaireDocument,
    "\n  query UserQuestionnaires {\n    userQuestionnaires {\n      id\n      finished\n      questionnaire {\n        id\n        name\n        questionCount\n      }\n    }\n    viewer {\n      me {\n        userInfoCompleted\n      }\n    }\n  }\n": types.UserQuestionnairesDocument,
    "\n  mutation editProfile($input: EditProfileInput!) {\n    editProfile(input: $input) {\n      viewer {\n        me {\n          firstName\n          lastName\n        }\n      }\n    }\n  }\n": types.EditProfileDocument,
    "\n  mutation finishRegistration($input: FinishRegistrationInput!) {\n    finishRegistration(input: $input) {\n      success\n      viewer {\n        me {\n          firstName\n          lastName\n          email\n          finishedRegistration\n          userInfoCompleted\n          age\n          dateOfBirth\n          maritalStatus\n          maritalStatusDescription\n          numberOfChildren\n          educationalAttainment\n          population\n        }\n      }\n    }\n  }\n": types.FinishRegistrationDocument,
    "\n  query MeQuery {\n    viewer {\n      id\n      me {\n        id\n        firstName\n        lastName\n        email\n        finishedRegistration\n        userInfoCompleted\n        age\n        dateOfBirth\n        maritalStatus\n        maritalStatusDescription\n        numberOfChildren\n        educationalAttainment\n        population\n        actualState\n      }\n      haveActiveQuestionnaire\n    }\n  }\n": types.MeQueryDocument,
    "\n  query RegistrationStatus {\n    registrationStatus {\n      isCompleted\n      userLabel\n      journeysToChoose\n      group\n    }\n  }\n": types.RegistrationStatusDocument,
    "\n  mutation removeMoodRecord($id: ID!) {\n    removeMoodRecord(id: $id)\n  }\n": types.RemoveMoodRecordDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation refreshAccessToken($input: RefreshTokensInput!) {\n    refreshAccessToken(input: $input) {\n      accessToken\n      refreshToken\n    }\n  }\n"): (typeof documents)["\n  mutation refreshAccessToken($input: RefreshTokensInput!) {\n    refreshAccessToken(input: $input) {\n      accessToken\n      refreshToken\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation login($input: LoginInput!) {\n    login(input: $input) {\n      accessToken\n      refreshToken\n    }\n  }\n"): (typeof documents)["\n  mutation login($input: LoginInput!) {\n    login(input: $input) {\n      accessToken\n      refreshToken\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation initLogin($input: InitLoginInput!) {\n    initLogin(input: $input) {\n      usePassword\n      useSmsCode\n    }\n  }\n"): (typeof documents)["\n  mutation initLogin($input: InitLoginInput!) {\n    initLogin(input: $input) {\n      usePassword\n      useSmsCode\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ContentQuery {\n    content {\n      userJourney {\n        id\n        name\n        unlocked\n        currentLevel\n        levels {\n          id\n          level\n          progress\n          unlocked\n        }\n      }\n      stories {\n        id\n        published\n        videoLink\n        title\n      }\n      currentRelaxation {\n        id\n        name\n        image\n      }\n      bonusRelaxation {\n        id\n        name\n        image\n      }\n      todaySchedule {\n        morning {\n          id\n          name\n          completed\n        }\n        afternoon {\n          id\n          name\n          completed\n        }\n        evening {\n          id\n          name\n          completed\n        }\n      }\n      journeyRelaxation {\n        id\n        name\n        unlocked\n        relaxation {\n          id\n          name\n          subTitle\n          locked\n          options\n          progress\n          ... on AudioItem {\n            duration\n            link\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query ContentQuery {\n    content {\n      userJourney {\n        id\n        name\n        unlocked\n        currentLevel\n        levels {\n          id\n          level\n          progress\n          unlocked\n        }\n      }\n      stories {\n        id\n        published\n        videoLink\n        title\n      }\n      currentRelaxation {\n        id\n        name\n        image\n      }\n      bonusRelaxation {\n        id\n        name\n        image\n      }\n      todaySchedule {\n        morning {\n          id\n          name\n          completed\n        }\n        afternoon {\n          id\n          name\n          completed\n        }\n        evening {\n          id\n          name\n          completed\n        }\n      }\n      journeyRelaxation {\n        id\n        name\n        unlocked\n        relaxation {\n          id\n          name\n          subTitle\n          locked\n          options\n          progress\n          ... on AudioItem {\n            duration\n            link\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query itemDetail($id: ID!) {\n    itemDetail(id: $id) {\n      id\n      name\n      subTitle\n      image\n      options\n      ... on AudioItem {\n        duration\n        transcript\n        link\n        next\n        previous\n      }\n      ... on ArticleItem {\n        content {\n          content\n          continue\n        }\n      }\n      ... on VideoItem {\n        link\n      }\n    }\n  }\n"): (typeof documents)["\n  query itemDetail($id: ID!) {\n    itemDetail(id: $id) {\n      id\n      name\n      subTitle\n      image\n      options\n      ... on AudioItem {\n        duration\n        transcript\n        link\n        next\n        previous\n      }\n      ... on ArticleItem {\n        content {\n          content\n          continue\n        }\n      }\n      ... on VideoItem {\n        link\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query journey($id: ID!) {\n    journey(id: $id) {\n      id\n      name\n      levels {\n        id\n        level\n        progress\n        phase {\n          id\n          name\n          subTitle\n          image\n          locked\n          options\n          progress\n          ... on AudioItem {\n            duration\n            link\n          }\n        }\n        relaxation {\n          id\n          name\n          subTitle\n          image\n          locked\n          options\n          progress\n          ... on AudioItem {\n            duration\n            link\n          }\n        }\n        tools {\n          id\n          name\n          subTitle\n          image\n          locked\n          options\n          progress\n          ... on AudioItem {\n            duration\n            link\n          }\n        }\n        tasks {\n          id\n          name\n          subTitle\n          image\n          locked\n          options\n          progress\n          ... on AudioItem {\n            duration\n            link\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query journey($id: ID!) {\n    journey(id: $id) {\n      id\n      name\n      levels {\n        id\n        level\n        progress\n        phase {\n          id\n          name\n          subTitle\n          image\n          locked\n          options\n          progress\n          ... on AudioItem {\n            duration\n            link\n          }\n        }\n        relaxation {\n          id\n          name\n          subTitle\n          image\n          locked\n          options\n          progress\n          ... on AudioItem {\n            duration\n            link\n          }\n        }\n        tools {\n          id\n          name\n          subTitle\n          image\n          locked\n          options\n          progress\n          ... on AudioItem {\n            duration\n            link\n          }\n        }\n        tasks {\n          id\n          name\n          subTitle\n          image\n          locked\n          options\n          progress\n          ... on AudioItem {\n            duration\n            link\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation selectJourney($id: ID) {\n    selectJourney(id: $id)\n  }\n"): (typeof documents)["\n  mutation selectJourney($id: ID) {\n    selectJourney(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query storyDetail($id: ID!) {\n    storyDetail(id: $id) {\n      id\n      title\n      published\n      content\n      videoLink\n    }\n  }\n"): (typeof documents)["\n  query storyDetail($id: ID!) {\n    storyDetail(id: $id) {\n      id\n      title\n      published\n      content\n      videoLink\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation switchJourney($id: ID!) {\n    switchJourney(id: $id)\n  }\n"): (typeof documents)["\n  mutation switchJourney($id: ID!) {\n    switchJourney(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation trackProgress($input: TrackProgressInput!) {\n    trackProgress(input: $input) {\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation trackProgress($input: TrackProgressInput!) {\n    trackProgress(input: $input) {\n      success\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation trackSchedule($input: TrackScheduleInput!) {\n    trackSchedule(input: $input) {\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation trackSchedule($input: TrackScheduleInput!) {\n    trackSchedule(input: $input) {\n      success\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query diaryEntry($id: ID!) {\n    diaryEntry(id: $id) {\n      id\n      date\n      content\n    }\n  }\n"): (typeof documents)["\n  query diaryEntry($id: ID!) {\n    diaryEntry(id: $id) {\n      id\n      date\n      content\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation editDiaryEntry($input: EditDiaryEntryInput!) {\n    editDiaryEntry(input: $input) {\n      id\n      date\n      previewText\n      content\n    }\n  }\n"): (typeof documents)["\n  mutation editDiaryEntry($input: EditDiaryEntryInput!) {\n    editDiaryEntry(input: $input) {\n      id\n      date\n      previewText\n      content\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation removeDiaryEntry($id: ID!) {\n    removeDiaryEntry(id: $id)\n  }\n"): (typeof documents)["\n  mutation removeDiaryEntry($id: ID!) {\n    removeDiaryEntry(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query diaryList($afterId: ID) {\n    diaryList(afterId: $afterId) {\n      records {\n        id\n        date\n        previewText\n      }\n      haveNext\n    }\n  }\n"): (typeof documents)["\n  query diaryList($afterId: ID) {\n    diaryList(afterId: $afterId) {\n      records {\n        id\n        date\n        previewText\n      }\n      haveNext\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation logMood($input: LogMoodInput!) {\n    logMood(input: $input) {\n      last\n    }\n  }\n"): (typeof documents)["\n  mutation logMood($input: LogMoodInput!) {\n    logMood(input: $input) {\n      last\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query moodsList($afterId: ID) {\n    moodsList(afterId: $afterId) {\n      records {\n        id\n        date\n        mood\n      }\n      moodsCount {\n        mood\n        count\n      }\n      haveNext\n    }\n  }\n"): (typeof documents)["\n  query moodsList($afterId: ID) {\n    moodsList(afterId: $afterId) {\n      records {\n        id\n        date\n        mood\n      }\n      moodsCount {\n        mood\n        count\n      }\n      haveNext\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Todos {\n    viewer {\n      id\n      todayTodos {\n        id\n        title\n        checked\n        dayPart\n      }\n    }\n  }\n"): (typeof documents)["\n  query Todos {\n    viewer {\n      id\n      todayTodos {\n        id\n        title\n        checked\n        dayPart\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation editTodo($input: TodoInput!) {\n    editTodo(input: $input) {\n      id\n      todayTodos {\n        id\n        title\n        checked\n        dayPart\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation editTodo($input: TodoInput!) {\n    editTodo(input: $input) {\n      id\n      todayTodos {\n        id\n        title\n        checked\n        dayPart\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation trackTodo($input: TrackTodoInput!) {\n    trackTodo(input: $input) {\n      id\n      todayTodos {\n        id\n        title\n        checked\n        dayPart\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation trackTodo($input: TrackTodoInput!) {\n    trackTodo(input: $input) {\n      id\n      todayTodos {\n        id\n        title\n        checked\n        dayPart\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation removeTodo($id: ID!) {\n    removeTodo(id: $id) {\n      todayTodos {\n        id\n        title\n        checked\n        dayPart\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation removeTodo($id: ID!) {\n    removeTodo(id: $id) {\n      todayTodos {\n        id\n        title\n        checked\n        dayPart\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query viciousCircle($id: ID!) {\n    viciousCircle(id: $id) {\n      id\n      date\n      name\n      trigger\n      negativeThoughts\n      emotions\n      physicalSymptoms\n      behaviour\n    }\n  }\n"): (typeof documents)["\n  query viciousCircle($id: ID!) {\n    viciousCircle(id: $id) {\n      id\n      date\n      name\n      trigger\n      negativeThoughts\n      emotions\n      physicalSymptoms\n      behaviour\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query currentViciousCircle {\n    currentViciousCircle {\n      id\n      date\n      name\n      trigger\n      negativeThoughts\n      emotions\n      physicalSymptoms\n      behaviour\n    }\n  }\n"): (typeof documents)["\n  query currentViciousCircle {\n    currentViciousCircle {\n      id\n      date\n      name\n      trigger\n      negativeThoughts\n      emotions\n      physicalSymptoms\n      behaviour\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation editViciousCircle($input: EditViciousCircleInput!) {\n    editViciousCircle(input: $input) {\n      id\n      name\n      date\n      trigger\n      negativeThoughts\n      emotions\n      physicalSymptoms\n      behaviour\n    }\n  }\n"): (typeof documents)["\n  mutation editViciousCircle($input: EditViciousCircleInput!) {\n    editViciousCircle(input: $input) {\n      id\n      name\n      date\n      trigger\n      negativeThoughts\n      emotions\n      physicalSymptoms\n      behaviour\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query viciousCircleList($afterId: ID) {\n    viciousCircleList(afterId: $afterId) {\n      records {\n        id\n        name\n        date\n      }\n      haveNext\n    }\n  }\n"): (typeof documents)["\n  query viciousCircleList($afterId: ID) {\n    viciousCircleList(afterId: $afterId) {\n      records {\n        id\n        name\n        date\n      }\n      haveNext\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CurrentUserQuestionnaires {\n    currentUserQuestionnaires {\n      occasion\n      questionnaires {\n        id\n        finished\n        questionnaire {\n          id\n          name\n          questionCount\n        }\n      }\n    }\n    viewer {\n      haveActiveQuestionnaire\n    }\n    registrationStatus {\n      journeysToChoose\n    }\n  }\n"): (typeof documents)["\n  query CurrentUserQuestionnaires {\n    currentUserQuestionnaires {\n      occasion\n      questionnaires {\n        id\n        finished\n        questionnaire {\n          id\n          name\n          questionCount\n        }\n      }\n    }\n    viewer {\n      haveActiveQuestionnaire\n    }\n    registrationStatus {\n      journeysToChoose\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query questionnaireDetail($id: ID!) {\n    questionnaireDetail(id: $id) {\n      id\n      answers {\n        questionId\n        answerIndex\n      }\n      questionnaire {\n        name\n        questionCount\n        questions {\n          id\n          question\n          answers {\n            answer\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query questionnaireDetail($id: ID!) {\n    questionnaireDetail(id: $id) {\n      id\n      answers {\n        questionId\n        answerIndex\n      }\n      questionnaire {\n        name\n        questionCount\n        questions {\n          id\n          question\n          answers {\n            answer\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateQuestionnaire($input: UserQuestionnaireInput!) {\n    updateQuestionnaire(input: $input) {\n      id\n      finished\n    }\n  }\n"): (typeof documents)["\n  mutation updateQuestionnaire($input: UserQuestionnaireInput!) {\n    updateQuestionnaire(input: $input) {\n      id\n      finished\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query UserQuestionnaires {\n    userQuestionnaires {\n      id\n      finished\n      questionnaire {\n        id\n        name\n        questionCount\n      }\n    }\n    viewer {\n      me {\n        userInfoCompleted\n      }\n    }\n  }\n"): (typeof documents)["\n  query UserQuestionnaires {\n    userQuestionnaires {\n      id\n      finished\n      questionnaire {\n        id\n        name\n        questionCount\n      }\n    }\n    viewer {\n      me {\n        userInfoCompleted\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation editProfile($input: EditProfileInput!) {\n    editProfile(input: $input) {\n      viewer {\n        me {\n          firstName\n          lastName\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation editProfile($input: EditProfileInput!) {\n    editProfile(input: $input) {\n      viewer {\n        me {\n          firstName\n          lastName\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation finishRegistration($input: FinishRegistrationInput!) {\n    finishRegistration(input: $input) {\n      success\n      viewer {\n        me {\n          firstName\n          lastName\n          email\n          finishedRegistration\n          userInfoCompleted\n          age\n          dateOfBirth\n          maritalStatus\n          maritalStatusDescription\n          numberOfChildren\n          educationalAttainment\n          population\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation finishRegistration($input: FinishRegistrationInput!) {\n    finishRegistration(input: $input) {\n      success\n      viewer {\n        me {\n          firstName\n          lastName\n          email\n          finishedRegistration\n          userInfoCompleted\n          age\n          dateOfBirth\n          maritalStatus\n          maritalStatusDescription\n          numberOfChildren\n          educationalAttainment\n          population\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query MeQuery {\n    viewer {\n      id\n      me {\n        id\n        firstName\n        lastName\n        email\n        finishedRegistration\n        userInfoCompleted\n        age\n        dateOfBirth\n        maritalStatus\n        maritalStatusDescription\n        numberOfChildren\n        educationalAttainment\n        population\n        actualState\n      }\n      haveActiveQuestionnaire\n    }\n  }\n"): (typeof documents)["\n  query MeQuery {\n    viewer {\n      id\n      me {\n        id\n        firstName\n        lastName\n        email\n        finishedRegistration\n        userInfoCompleted\n        age\n        dateOfBirth\n        maritalStatus\n        maritalStatusDescription\n        numberOfChildren\n        educationalAttainment\n        population\n        actualState\n      }\n      haveActiveQuestionnaire\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query RegistrationStatus {\n    registrationStatus {\n      isCompleted\n      userLabel\n      journeysToChoose\n      group\n    }\n  }\n"): (typeof documents)["\n  query RegistrationStatus {\n    registrationStatus {\n      isCompleted\n      userLabel\n      journeysToChoose\n      group\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation removeMoodRecord($id: ID!) {\n    removeMoodRecord(id: $id)\n  }\n"): (typeof documents)["\n  mutation removeMoodRecord($id: ID!) {\n    removeMoodRecord(id: $id)\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;