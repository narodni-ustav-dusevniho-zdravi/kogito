import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {ApolloProvider} from '@apollo/client';
import ApolloClient from './src/apollo/client';
import {AuthProvider} from './src/modules/auth/auth-context';
import Navigation from './src/navigation/Navigation';
import {MODE, API_CORE} from '@env';
import {NavigationContainer} from '@react-navigation/native';
import Moment from 'react-moment';
import 'moment/locale/cs';
import LogMoodModal from './src/modules/diary/modal/LogMoodModal/LogMoodModal';
import MixPanelTrackingProvider from './src/tracking/MixPanelTracking';

Moment.globalLocale = 'cs';
Moment.globalFormat = 'Do MMMM YYYY';

declare const global: {HermesInternal: null | {}};

// TODO PROSTE SE SNAZ VIC HERMANE
const App = () => {
  console.log('----------------------------------------------------');
  console.log('----------------------------------------------------');
  console.log({MODE, API_CORE});

  return (
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
  );
};

export default App;
