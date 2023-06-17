import type {MixpanelProperties} from 'mixpanel-react-native';
import {Mixpanel} from 'mixpanel-react-native';

import ENV from '~modules/env';
import type {AppScreenName} from '~modules/navigation';

import type {Events, NoParamsEvent} from '../types';

import {getScreenOpenedEvent} from './screenEventMapping';

const mixPanel = ENV.MIXPANEL_API_KEY
  ? new Mixpanel(ENV.MIXPANEL_API_KEY, true)
  : null;
mixPanel?.init();

type TrackFc<T extends keyof Events> = T extends NoParamsEvent
  ? (eventName: T) => void
  : (eventName: T, properties: Events[T]) => void;

const track = (
  eventName: string,
  properties: MixpanelProperties | undefined,
) => {
  if (__DEV__) console.log(`Tracking ${eventName} with properties`, properties);
  mixPanel?.track(eventName, properties);
};

export const logEvent = <T extends keyof Events>(
  ...args: Parameters<TrackFc<T>>
) => {
  const [eventName, properties] = args as unknown as [T, Events[T]];
  track(eventName, properties);
};

export const identifyUser = async (userId: string) => {
  mixPanel?.alias(userId, await mixPanel.getDistinctId());
  mixPanel?.identify(userId);
  // mixPanel.getPeople().set('$email', email);
};

export const logScreen = <T extends AppScreenName>(screen: T) => {
  const event = getScreenOpenedEvent(screen);
  event && track(event, undefined);
};
