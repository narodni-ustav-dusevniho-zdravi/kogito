import React from 'react';
import {Text, View} from 'react-native';

import ENV from '~modules/env';
import type {AppScreenName} from '~modules/navigation';
import {useNavigation} from '~modules/navigation';
import {ScreenContainer} from '~modules/ui';

import Button from '../components/primitives/Button';

const screens: Record<AppScreenName, boolean> = {
  DashboardTab: true,
  JourneyProgress: true,
  Relaxation: true,
  Todos: true,
  Dev: true,
  Journey: true,
  MyDay: true,
  AfterMonthQuestionnaire: true,
  AfterMonthQuestionnaireDetail: true,
  Article: true,
  Audio: true,
  AvailableQuestionnaires: true,
  Dashboard: true,
  Diary: true,
  DiaryEdit: true,
  FinishRegistrationScreen: true,
  Intro: true,
  JourneySwitch: true,
  LoginOrRegister: true,
  LoginPopup: true,
  Logout: true,
  MoodList: true,
  ProfileSettings: true,
  QuestionnaireResultScreen: true,
  QuestionnaireScreen: true,
  Register: true,
  RegisterPopup: true,
  ScheduleDay: true,
  SelectJourneyScreen: true,
  Signpost: true,
  Splash: true,
  StoriesList: true,
  StoryDetail: true,
  ViciousCircle: true,
  ViciousCircleEdit: true,
  Video: true,
};

export const DevScreen = () => {
  const {navigate} = useNavigation();
  return (
    <ScreenContainer title="Dev" type="static">
      <Text>{JSON.stringify(ENV, null, 2)}</Text>
      <View style={{gap: 8}}>
        {Object.keys(screens).map(screen => (
          <Button
            key={screen}
            title={`open ${screen}`}
            type="small"
            //@ts-expect-error let the screens requiring params fail
            onPress={() => navigate(screen, {})}
          />
        ))}
      </View>
    </ScreenContainer>
  );
};
