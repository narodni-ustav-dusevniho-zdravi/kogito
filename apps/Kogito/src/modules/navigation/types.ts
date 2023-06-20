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
  Dashboard: undefined;
  Diary: undefined;
  DiaryEdit: {id: string | null};
  JourneySwitch: undefined;
  Login: undefined;
  Logout: undefined;
  MoodList: undefined;
  ProfileSettings: undefined;

  Registration: undefined;
  ScheduleDay: undefined;

  SelectJourneyScreen: undefined;

  Signpost: undefined;
  Splash: undefined;

  StoriesList: undefined;

  StoryDetail: {id: string};

  Terms: undefined;
  Todos: undefined;
  ViciousCircle: undefined;

  ViciousCircleEdit: {id: string | null};

  Video: {id: string};
};

export type RegistrationStackParamList = {
  AvailableQuestionnaires: undefined;
  FinishRegistrationScreen: undefined;
  QuestionnaireResultScreen: undefined;
  QuestionnaireScreen: {id: string};
  Register: undefined;
  SelectJourneyScreen: undefined;
};

export type DashboardStackParamList = {
  Journey: {id: string; level: number};
  MyDay: undefined;
};

export type DashboardTabParamList = Record<
  'DashboardTab' | 'JourneyProgress' | 'Relaxation' | 'Todos',
  undefined
>;

export type AppParamList = DashboardStackParamList &
  RegistrationStackParamList &
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
