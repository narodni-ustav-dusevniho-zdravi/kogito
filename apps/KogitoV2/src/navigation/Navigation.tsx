import React from 'react';
import {StackScreenProps, createStackNavigator} from '@react-navigation/stack';
import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import LoginScreen from '../screens/LoginScreen';
import AvailableQuestionnairesScreen from '../screens/AvailableQuestionnairesScreen';
import QuestionnaireScreen from '../screens/QuestionnaireScreen';
import RegisterScreen from '../screens/RegisterScreen';
import DashboardScreen from '../screens/DashboardScreen';
import RelaxationScreen from '../screens/RelaxationScreen';
import AudioScreen from '../screens/AudioScreen';
import JourneyProgressScreen from '../screens/JourneyProgressScreen';
import JourneyScreen from '../screens/JourneyScreen';
import FinishRegistrationScreen from '../screens/FinishRegistrationScreen';
import SplashScreen from '../screens/SplashScreen';
import ProfileSettingsScreen from '../screens/ProfileSettingsScreen';
import LogoutScreen from '../screens/LogoutScreen';
import StoriesListScreen from '../screens/StoriesListScreen';
import StoryDetailScreen from '../screens/StoryDetailScreen';
import ArticleScreen from '../screens/ArticleScreen';
import DiaryScreen from '../screens/DiaryScreen';
import DiaryEditScreen from '../screens/DiaryEditScreen';
import MoodListScreen from '../screens/MoodListScreen';
import ScheduleDayScreen from '../screens/ScheduleDayScreen';
import ViciousCircleScreen from '../screens/ViciousCircleScreen';
import ViciousCircleEditScreen from '../screens/ViciousCircleEditScreen';
import QuestionnaireResultScreen from '../screens/QuestionnaireResultScreen';
import SelectJourneyScreen from '../screens/SelectJourneyScreen';
import VideoScreen from '../screens/VideoScreen';
import TodosScreen from '../screens/TodosScreen';
import AfterMonthQuestionnaireScreen from '../screens/AfterMonthQuestionnaireScreen';
import AfterMonthQuestionnaireDetailScreen from '../screens/AfterMonthQuestionnaireDetailScreen';
import JourneySwitchScreen from '../screens/JourneySwitchScreen';

import IconMyDay from '../assets/icon-my-day.svg';
import IconRoad from '../assets/icon-road.svg';
import IconSun from '../assets/icon-sun.svg';
import IconTodo from '../assets/icon-todo.svg';
import TermsScreen from '../screens/TermsScreen';

export type RootStackParamList = {
  Splash: undefined;
  Terms: undefined;
  Signpost: undefined;
  Login: undefined;
  Registration: undefined;
  Dashboard: undefined;
  ProfileSettings: undefined;
  Audio: {id: string};
  Video: {id: string};
  Article: {id: string};
  StoriesList: undefined;
  StoryDetail: {id: string};

  Diary: undefined;
  DiaryEdit: {id: string | null};

  MoodList: undefined;

  ViciousCircle: undefined;
  ViciousCircleEdit: {id: string | null};

  ScheduleDay: undefined;

  Todos: undefined;

  AfterMonthQuestionnaire: undefined;
  AfterMonthQuestionnaireDetail: {id: string};
  SelectJourneyScreen: undefined;

  JourneySwitch: undefined;

  Logout: undefined;
};

export type RegistrationStackParamList = {
  Register: undefined;
  AvailableQuestionnaires: undefined;
  QuestionnaireResultScreen: undefined;
  FinishRegistrationScreen: undefined;
  SelectJourneyScreen: undefined;
  QuestionnaireScreen: {id: string};
};

export type DashboardStackParamList = {
  MyDay: undefined;
  Journey: {id: string; level: number};
};

export type StoriesStackParamList = {};

type DashboardTabParamList = Record<
  'DashboardTab' | 'JourneyProgress' | 'Relaxation' | 'Todos',
  undefined
>;
//TODO: is it actually used?
type UnusedScreensParamList = {
  RoadPhase: undefined;
  RoadTools: undefined;
  RoadRelaxation: undefined;
  RoadTodos: undefined;
  RelaxationLocked: undefined;
};
export type AppParamList = DashboardStackParamList &
  RegistrationStackParamList &
  RootStackParamList &
  DashboardTabParamList &
  UnusedScreensParamList;

export type AppScreenName = keyof AppParamList;

export type AppScreen<T extends AppScreenName> = React.FC<
  T extends keyof DashboardTabParamList
    ? BottomTabScreenProps<DashboardTabParamList, T> &
        StackScreenProps<AppParamList, T>
    : StackScreenProps<AppParamList, T>
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppParamList {}
  }
}

const Stack = createStackNavigator<RootStackParamList>();
const RegistrationStack = createStackNavigator<RegistrationStackParamList>();
const DashboardStack = createStackNavigator<DashboardStackParamList>();

const UnfinishedRegistrationScreens: React.FC = () => {
  return (
    <RegistrationStack.Navigator initialRouteName="Register">
      <RegistrationStack.Screen
        name="Register"
        component={RegisterScreen}
        options={{headerShown: false}}
      />
      <RegistrationStack.Screen
        name="AvailableQuestionnaires"
        component={AvailableQuestionnairesScreen}
        options={{headerShown: false}}
      />
      <RegistrationStack.Screen
        name="QuestionnaireScreen"
        component={QuestionnaireScreen}
        options={{headerShown: false}}
      />
      <RegistrationStack.Screen
        name="QuestionnaireResultScreen"
        component={QuestionnaireResultScreen}
        options={{headerShown: false}}
      />
      <RegistrationStack.Screen
        name="SelectJourneyScreen"
        component={SelectJourneyScreen}
        options={{headerShown: false}}
      />
      <RegistrationStack.Screen
        name="FinishRegistrationScreen"
        component={FinishRegistrationScreen}
        options={{headerShown: false}}
      />
    </RegistrationStack.Navigator>
  );
};

const DashboardScreens: React.FC = () => {
  return (
    <DashboardStack.Navigator initialRouteName="MyDay">
      <DashboardStack.Screen
        name="MyDay"
        component={DashboardScreen}
        options={{headerShown: false}}
      />
      <DashboardStack.Screen
        name="Journey"
        component={JourneyScreen}
        options={{headerShown: false}}
      />
    </DashboardStack.Navigator>
  );
};

const Tab = createBottomTabNavigator<DashboardTabParamList>();

const DashboardTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarActiveTintColor: '#F2AC33',
        tabBarInactiveTintColor: '#8e8e93',
        tabBarStyle: {height: 80, paddingTop: 12, paddingBottom: 22},
        tabBarIcon: ({focused}) => {
          const iconColor = focused ? '#F2AC33' : '#8e8e93';

          switch (route.name) {
            case 'DashboardTab':
              return <IconMyDay color={iconColor} />;
            case 'JourneyProgress':
              return <IconRoad color={iconColor} />;
            case 'Relaxation':
              return <IconSun color={iconColor} />;
            case 'Todos':
              return <IconTodo color={iconColor} />;
          }
        },
      })}>
      <Tab.Screen
        name="DashboardTab"
        component={DashboardScreens}
        options={{title: 'Můj den'}}
      />
      <Tab.Screen
        name="JourneyProgress"
        component={JourneyProgressScreen}
        options={{title: 'Cesta'}}
      />
      <Tab.Screen
        name="Relaxation"
        component={RelaxationScreen}
        options={{title: 'Relaxace'}}
      />
      <Tab.Screen
        name="Todos"
        component={TodosScreen}
        options={{title: 'Plánovač'}}
      />
    </Tab.Navigator>
  );
};

const Navigation: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Terms"
        component={TermsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Registration"
        component={UnfinishedRegistrationScreens}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Dashboard"
        component={DashboardTabNavigation}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProfileSettings"
        component={ProfileSettingsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Audio"
        component={AudioScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Video"
        component={VideoScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Article"
        component={ArticleScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="StoriesList"
        component={StoriesListScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="StoryDetail"
        component={StoryDetailScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Diary"
        component={DiaryScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DiaryEdit"
        component={DiaryEditScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MoodList"
        component={MoodListScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ViciousCircle"
        component={ViciousCircleScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ViciousCircleEdit"
        component={ViciousCircleEditScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ScheduleDay"
        component={ScheduleDayScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AfterMonthQuestionnaire"
        component={AfterMonthQuestionnaireScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AfterMonthQuestionnaireDetail"
        component={AfterMonthQuestionnaireDetailScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SelectJourneyScreen"
        component={SelectJourneyScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="JourneySwitch"
        component={JourneySwitchScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Logout"
        component={LogoutScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
