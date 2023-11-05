import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import ENV from '~modules/env';
import {Icon} from '~modules/ui';

import AfterMonthQuestionnaireDetailScreen from '../../screens/AfterMonthQuestionnaireDetailScreen';
import AfterMonthQuestionnaireScreen from '../../screens/AfterMonthQuestionnaireScreen';
import ArticleScreen from '../../screens/ArticleScreen';
import AudioScreen from '../../screens/AudioScreen';
import AvailableQuestionnairesScreen from '../../screens/AvailableQuestionnairesScreen';
import DashboardScreen from '../../screens/DashboardScreen';
import {DevScreen} from '../../screens/DevScreen';
import DiaryEditScreen from '../../screens/DiaryEditScreen';
import DiaryScreen from '../../screens/DiaryScreen';
import FinishRegistrationScreen from '../../screens/FinishRegistrationScreen';
import IntroScreen from '../../screens/IntroScreen';
import JourneyProgressScreen from '../../screens/JourneyProgressScreen';
import JourneyScreen from '../../screens/JourneyScreen';
import JourneySwitchScreen from '../../screens/JourneySwitchScreen';
import LoginScreen from '../../screens/LoginScreen';
import LogoutScreen from '../../screens/LogoutScreen';
import MoodListScreen from '../../screens/MoodListScreen';
import ProfileSettingsScreen from '../../screens/ProfileSettingsScreen';
import QuestionnaireResultScreen from '../../screens/QuestionnaireResultScreen';
import QuestionnaireScreen from '../../screens/QuestionnaireScreen';
import RegisterScreen from '../../screens/RegisterScreen';
import RelaxationScreen from '../../screens/RelaxationScreen';
import ScheduleDayScreen from '../../screens/ScheduleDayScreen';
import SelectJourneyScreen from '../../screens/SelectJourneyScreen';
import SplashScreen from '../../screens/SplashScreen';
import StoriesListScreen from '../../screens/StoriesListScreen';
import StoryDetailScreen from '../../screens/StoryDetailScreen';
import TodosScreen from '../../screens/TodosScreen';
import ViciousCircleEditScreen from '../../screens/ViciousCircleEditScreen';
import ViciousCircleScreen from '../../screens/ViciousCircleScreen';
import VideoScreen from '../../screens/VideoScreen';

import type {
  DashboardStackParamList,
  DashboardTabParamList,
  RegistrationStackParamList,
  RootStackParamList,
} from './types';

const Stack = createStackNavigator<RootStackParamList>();
const RegistrationStack = createStackNavigator<RegistrationStackParamList>();
const DashboardStack = createStackNavigator<DashboardStackParamList>();

const UnfinishedRegistrationScreens: React.FC = () => {
  return (
    <RegistrationStack.Navigator screenOptions={{headerShown: false}}>
      <RegistrationStack.Screen component={RegisterScreen} name="Register" />
      <RegistrationStack.Screen
        component={AvailableQuestionnairesScreen}
        name="AvailableQuestionnaires"
      />
      <RegistrationStack.Screen
        component={QuestionnaireScreen}
        name="QuestionnaireScreen"
      />
      <RegistrationStack.Screen
        component={QuestionnaireResultScreen}
        name="QuestionnaireResultScreen"
      />
      <RegistrationStack.Screen
        component={SelectJourneyScreen}
        name="SelectJourneyScreen"
      />
      <RegistrationStack.Screen
        component={FinishRegistrationScreen}
        name="FinishRegistrationScreen"
      />
    </RegistrationStack.Navigator>
  );
};

const DashboardScreens: React.FC = () => {
  return (
    <DashboardStack.Navigator
      initialRouteName="MyDay"
      screenOptions={{headerShown: false}}>
      <DashboardStack.Screen component={DashboardScreen} name="MyDay" />
      <DashboardStack.Screen component={JourneyScreen} name="Journey" />
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
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({color: iconColor}) => {
          switch (route.name) {
            case 'DashboardTab':
              return <Icon color={iconColor} name="my-day" size={32} />;
            case 'JourneyProgress':
              return <Icon color={iconColor} name="road" size={32} />;
            case 'Relaxation':
              return <Icon color={iconColor} name="sun" size={32} />;
            case 'Todos':
              return <Icon color={iconColor} name="todo" size={32} />;
            case 'Dev':
              return <Icon color={iconColor} name="lock" size={32} />;
          }
        },
      })}>
      <Tab.Screen
        component={DashboardScreens}
        name="DashboardTab"
        options={{title: 'Můj den'}}
      />
      <Tab.Screen
        component={JourneyProgressScreen}
        name="JourneyProgress"
        options={{title: 'Cesta'}}
      />
      <Tab.Screen
        component={RelaxationScreen}
        name="Relaxation"
        options={{title: 'Relaxace'}}
      />
      <Tab.Screen
        component={TodosScreen}
        name="Todos"
        options={{headerShown: false}}
      />
      {ENV.IS_DEV && (
        <Tab.Screen
          component={DevScreen}
          name="Dev"
          options={{headerShown: false}}
        />
      )}
    </Tab.Navigator>
  );
};

const Navigation: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{headerShown: false}}>
      <Stack.Screen component={SplashScreen} name="Splash" />
      <Stack.Screen component={IntroScreen} name="Intro" />
      <Stack.Screen component={LoginScreen} name="LoginOrRegister" />
      <Stack.Screen
        component={UnfinishedRegistrationScreens}
        name="Registration"
      />
      <Stack.Screen component={DashboardTabNavigation} name="Dashboard" />
      <Stack.Screen component={ProfileSettingsScreen} name="ProfileSettings" />
      <Stack.Screen component={AudioScreen} name="Audio" />
      <Stack.Screen component={VideoScreen} name="Video" />
      <Stack.Screen component={ArticleScreen} name="Article" />
      <Stack.Screen component={StoriesListScreen} name="StoriesList" />
      <Stack.Screen component={StoryDetailScreen} name="StoryDetail" />
      <Stack.Screen component={DiaryScreen} name="Diary" />
      <Stack.Screen component={DiaryEditScreen} name="DiaryEdit" />
      <Stack.Screen component={MoodListScreen} name="MoodList" />
      <Stack.Screen component={ViciousCircleScreen} name="ViciousCircle" />
      <Stack.Screen
        component={ViciousCircleEditScreen}
        name="ViciousCircleEdit"
      />
      <Stack.Screen component={ScheduleDayScreen} name="ScheduleDay" />
      <Stack.Screen
        component={AfterMonthQuestionnaireScreen}
        name="AfterMonthQuestionnaire"
      />
      <Stack.Screen
        component={AfterMonthQuestionnaireDetailScreen}
        name="AfterMonthQuestionnaireDetail"
      />
      <Stack.Screen
        component={SelectJourneyScreen}
        name="SelectJourneyScreen"
      />
      <Stack.Screen component={JourneySwitchScreen} name="JourneySwitch" />
      <Stack.Screen component={LogoutScreen} name="Logout" />
    </Stack.Navigator>
  );
};

export default Navigation;
