import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import type {RouteProp} from '@react-navigation/native';
import type {
  StackNavigationProp,
  StackScreenProps,
} from '@react-navigation/stack';

export type RootStackParamList = {
  AfterMonthQuestionnaire: undefined;
  AfterMonthQuestionnaireDetail: {id: string};
  Article: {id: string};
  Audio: {id: string};
  AvailableQuestionnaires: undefined;
  Dashboard: undefined;
  Diary: undefined;
  DiaryEdit: {id: string | null};
  FinishRegistrationScreen: undefined;
  Intro: undefined;
  JourneySwitch: undefined;
  LoginOrRegister: undefined;
  LoginPopup: undefined;
  Logout: undefined;

  MoodList: undefined;
  ProfileSettings: undefined;

  QuestionnaireResultScreen: undefined;
  QuestionnaireScreen: {id: string};

  Register: undefined;

  RegisterPopup: undefined;

  ScheduleDay: undefined;
  SelectJourneyScreen: undefined;

  Signpost: undefined;

  Splash: undefined;
  StoriesList: undefined;
  StoryDetail: {id: string};
  Todos: undefined;
  ViciousCircle: undefined;
  ViciousCircleEdit: {id: string | null};
  Video: {id: string};
};

export type DashboardStackParamList = {
  Journey: {id: string; level: number};
  MyDay: undefined;
};

export type DashboardTabParamList = Record<
  'DashboardTab' | 'JourneyProgress' | 'Relaxation' | 'Todos' | 'Dev',
  undefined
>;

export type AppParamList = DashboardStackParamList &
  RootStackParamList &
  DashboardTabParamList;

export type AppScreenName = keyof AppParamList;

export type AppNavigationProps<S extends AppScreenName> = StackNavigationProp<
  AppParamList,
  S
>;

export type AppRouteProps<T extends AppScreenName> = RouteProp<AppParamList, T>;

export type AppScreen<T extends AppScreenName> = React.FC<
  T extends keyof DashboardTabParamList
    ? BottomTabScreenProps<DashboardTabParamList, T> &
        StackScreenProps<AppParamList, T>
    : StackScreenProps<AppParamList, T>
>;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface RootParamList extends AppParamList {}
  }
}

export type NavigationFunction = <RouteName extends AppScreenName>(
  ...args: undefined extends AppParamList[RouteName]
    ? [screen: RouteName] | [screen: RouteName, params: AppParamList[RouteName]]
    : [screen: RouteName, params: AppParamList[RouteName]]
) => void;
