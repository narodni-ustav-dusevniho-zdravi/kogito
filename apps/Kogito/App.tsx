import React from 'react';
import {StatusBar} from 'react-native';
import {ApolloProvider} from '@apollo/client';
import ApolloClient from './src/apollo/client';
import {AuthProvider} from './src/modules/auth/auth-context';
import Navigation from './src/navigation/Navigation';
import {NavigationContainer} from '@react-navigation/native';
import Moment from 'react-moment';
import 'moment/locale/cs';
import LogMoodModal from './src/modules/diary/modal/LogMoodModal/LogMoodModal';
import MixPanelTrackingProvider from './src/tracking/MixPanelTracking';
import {ENV} from './src/env';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

Moment.globalLocale = 'cs';
Moment.globalFormat = 'Do MMMM YYYY';

// TODO PROSTE SE SNAZ VIC HERMANE
const App = () => {
  console.log('----------------------------------------------------');
  console.log('----------------------------------------------------');
  console.log(ENV);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <MixPanelTrackingProvider>
        <NavigationContainer>
          <AuthProvider>
            <ApolloProvider client={ApolloClient}>
              <StatusBar barStyle="dark-content" />
              <Navigation />
              <LogMoodModal />
            </ApolloProvider>
          </AuthProvider>
        </NavigationContainer>
      </MixPanelTrackingProvider>
    </GestureHandlerRootView>
  );
};

export default App;
