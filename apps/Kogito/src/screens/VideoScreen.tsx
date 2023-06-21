import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, ToastAndroid, TouchableOpacity, View} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import {useInterval} from 'usehooks-ts';

import {logEvent} from '~modules/analytics';
import type {AppScreen} from '~modules/navigation';

import MainContainer from '../components/container/MainContainer/MainContainer';
import MainContainerWrapper from '../components/container/MainContainerWrapper';
import MainHeader from '../components/container/MainHeader/MainHeader';
import ColoredSafeAreaView from '../components/primitives/ColoredSafeAreaView';
import Text from '../components/primitives/Text';
import {useItemContent} from '../content/useItemContent';
import {useTrackProgress} from '../content/useTrackProgress';
import eventListener from '../helpers/eventListener';

// eslint-disable-next-line max-lines-per-function
const VideoScreen: AppScreen<'Video'> = ({route}) => {
  const [isLoading, setLoading] = useState(true);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [tracked, setTracked] = useState(false);
  const [playing, setPlaying] = useState(false);
  const {videoItem} = useItemContent(route.params.id);

  const onStateChange = (state: string) => {
    if (state === 'ended') {
      setPlaying(false);
      // eslint-disable-next-line no-empty
      if (videoItem) {
      }
    }
    if (state === 'playing') {
      setPlaying(true);
    }
    if (state === 'paused') {
      setPlaying(false);
    }
  };

  const {trackProgressMutation} = useTrackProgress();

  const handleInterval = useCallback(() => {
    console.log({playing, playedSeconds, id: route.params.id});

    if (playing) {
      setPlayedSeconds(playedSeconds + 1);
    }

    if (playedSeconds === 30 && !tracked) {
      setTracked(true);

      ToastAndroid.show('Tracking', ToastAndroid.SHORT);

      trackProgressMutation({
        variables: {
          input: {
            id: route.params.id,
            progress: 100,
          },
        },
      }).then(() => {
        if (videoItem) {
          logEvent('Lesson completed', {lessonTitle: videoItem.name});
        }
        eventListener.fireEvent('refetch-progress');
      });
    }
  }, [
    playing,
    playedSeconds,
    route.params.id,
    tracked,
    trackProgressMutation,
    videoItem,
  ]);

  useEffect(() => {
    setLoading(true);
  }, []);

  useInterval(handleInterval, 1000);

  if (videoItem) {
    return (
      <ColoredSafeAreaView
        angle={180}
        color1="rgba(255,255,255,0.29)"
        color2="rgba(255,231,231,0.29)">
        <MainContainerWrapper>
          <MainHeader />
          <MainContainer color="white" page="sub">
            <Text textVariant="header">{videoItem.name}</Text>
            <View>
              <YoutubePlayer
                forceAndroidAutoplay={true}
                // play={playing}
                height={200}
                videoId={videoItem.link}
                onChangeState={onStateChange}
                onReady={() => setLoading(false)}
              />
              <TouchableOpacity
                style={{
                  top: 0,
                  height: 50,
                  width: '100%',
                  position: 'absolute',
                }}
              />
            </View>
            {isLoading && <Text align="center">Nahrávám video</Text>}
          </MainContainer>
        </MainContainerWrapper>
      </ColoredSafeAreaView>
    );
  } else {
    return (
      <SafeAreaView>
        <Text>Nahrávám</Text>
      </SafeAreaView>
    );
  }
};

export default VideoScreen;
