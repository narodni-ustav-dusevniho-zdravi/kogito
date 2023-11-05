import 'moment/locale/cs';

import React from 'react';
import Moment from 'react-moment';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ApolloProvider} from '@apollo/client';
import {NavigationContainer} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import {
  AnalyticsProvider,
  AppStateTracking,
  logScreen,
} from '~modules/analytics';
import ENV from '~modules/env';
import {getCurrentRoute, navigationRef} from '~modules/navigation';
import Navigation from '~modules/navigation/Navigation';
import {StatusBar} from '~modules/ui';

import ApolloClient from './src/apollo/client';
import {AuthProvider} from './src/auth/auth-context';
import LogMoodModal from './src/diary/modal/LogMoodModal/LogMoodModal';

SplashScreen.preventAutoHideAsync();

Moment.globalLocale = 'cs';
Moment.globalFormat = 'Do MMMM YYYY';

const onNavigationStateChange = () => {
  const routeName = getCurrentRoute()?.name;
  routeName && logScreen(routeName);
};
// TODO PROSTE SE SNAZ VIC HERMANE
const App = () => {
  const [fontsLoaded] = useFonts({
    icons: require('./assets/fonts/icons.ttf'),
  });
  console.log(`
  ----------------------------------------------------
  ----------------------------------------------------
  Running app with config
  ${JSON.stringify(ENV, null, 2)}
  ----------------------------------------------------
  ----------------------------------------------------  
  `);
  if (!fontsLoaded) return null;
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <AnalyticsProvider>
        <AppStateTracking />
        <NavigationContainer
          ref={navigationRef}
          onStateChange={onNavigationStateChange}>
          <AuthProvider>
            <ApolloProvider client={ApolloClient}>
              <StatusBar content="dark" />
              <Navigation />
              <LogMoodModal />
            </ApolloProvider>
          </AuthProvider>
        </NavigationContainer>
      </AnalyticsProvider>
    </GestureHandlerRootView>
  );
};

export default App;
