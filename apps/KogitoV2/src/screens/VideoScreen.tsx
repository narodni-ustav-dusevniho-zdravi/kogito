import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, ToastAndroid, TouchableOpacity, View} from 'react-native';
import MainContainer from '../components/container/MainContainer/MainContainer';
import MainHeader from '../components/container/MainHeader/MainHeader';
import MainContainerWrapper from '../components/container/MainContainerWrapper';
import Text from '../components/primitives/Text';
import {RootStackParamList} from '../navigation/Navigation';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useItemContent} from '../modules/content/useItemContent';
import {useTrackProgress} from '../modules/content/useTrackProgress';
import YoutubePlayer from 'react-native-youtube-iframe';
import useEventListener from '../helpers/useEventListener';
import useInterval from '../helpers/useInterval';
import ColoredSafeAreaView from '../components/primitives/ColoredSafeAreaView';
import useMixPanelTracking from '../tracking/useMixPanelTracking';
import type {AppScreen} from '../navigation/Navigation';

export type AudioScreenProps = RouteProp<RootStackParamList, 'Audio'>;

const VideoScreen: AppScreen<'Video'> = () => {
  const route = useRoute<AudioScreenProps>();
  const {fireEvent} = useEventListener();
  const {trackLessonCompleted} = useMixPanelTracking();
  const [isLoading, setLoading] = useState(true);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [tracked, setTracked] = useState(false);
  const [playing, setPlaying] = useState(false);

  const onStateChange = (state: string) => {
    if (state === 'ended') {
      setPlaying(false);
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

  const {videoItem} = useItemContent(route.params.id);
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
          trackLessonCompleted(videoItem.name);
        }
        fireEvent('refetch-progress');
      });
    }
  }, [playing, setPlayedSeconds, playedSeconds]);

  useEffect(() => {
    setLoading(true);
  }, []);

  useInterval(handleInterval, 1000);

  if (videoItem) {
    return (
      <ColoredSafeAreaView
        color1={'rgba(255,255,255,0.29)'}
        color2={'rgba(255,231,231,0.29)'}
        angle={180}>
        <MainContainerWrapper>
          <MainHeader />
          <MainContainer page={'sub'} color={'white'}>
            <Text textVariant={'header'}>{videoItem.name}</Text>
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
            {isLoading && <Text align={'center'}>Nahrávám video</Text>}
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
