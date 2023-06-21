import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import HTML from 'react-native-render-html';
import SoundPlayer from 'react-native-sound-player';
import {useEventCallback, useInterval} from 'usehooks-ts';

import {logEvent} from '~modules/analytics';
import type {AppScreen} from '~modules/navigation';
import {useNavigationListener} from '~modules/navigation';

import MainContainer from '../components/container/MainContainer/MainContainer';
import MainContainerWrapper from '../components/container/MainContainerWrapper';
import MainHeader from '../components/container/MainHeader/MainHeader';
import Modal from '../components/container/Modal/Modal';
import AudioControls from '../components/primitives/AudioControls';
import Button from '../components/primitives/Button';
import GradientBackground from '../components/primitives/GradientBackground';
import Slider from '../components/primitives/Slider';
import Text from '../components/primitives/Text';
import {useItemContent} from '../content/useItemContent';
import {useTrackProgress} from '../content/useTrackProgress';
import eventListener from '../helpers/eventListener';
import images from '../helpers/images';
import {secondsToTime} from '../helpers/secondsToTime';

const styles = {
  p: {
    textAlign: 'justify' as const,
    marginBottom: 12,
    fontSize: 18,
  },
  li: {
    fontSize: 18,
    margin: 0,
    padding: 0,
    lineHeight: 20,
  },
};

// eslint-disable-next-line max-lines-per-function
const AudioScreen: AppScreen<'Audio'> = ({navigation: {navigate}, route}) => {
  const {audioFile} = useItemContent(route.params.id);
  const {trackProgressMutation} = useTrackProgress();

  const [visibleTranscript, setVisibleTranscript] = useState<boolean>(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [lastInfo, setLastInfo] = useState<{
    currentTime: number;
    duration: number;
    progress: number;
  }>({currentTime: 0, duration: 0, progress: 0});
  const lastTrackedProgress = useRef(0);

  const pause = () => {
    if (!audioPlaying) return;
    SoundPlayer.pause();
    setAudioPlaying(false);
  };
  const play = () => {
    if (audioPlaying) return;
    SoundPlayer.resume();
    setAudioPlaying(true);
  };
  const seek = (progress: number) => {
    if (!audioFile?.link) return;
    SoundPlayer.seek(Math.floor(lastInfo.duration * (progress / 100)));
    play();
  };
  const togglePlay = () => {
    if (audioPlaying) {
      pause();
    } else {
      play();
    }
  };

  useEffect(() => {
    if (audioFile?.link) {
      SoundPlayer.playUrl(audioFile.link);
      setAudioPlaying(true);
    } else {
      setAudioPlaying(false);
    }
  }, [audioFile?.link]);

  const currentPercents = useMemo(() => {
    const result = Math.floor(100 * (lastInfo.currentTime / lastInfo.duration));
    return result - (result % 10);
  }, [lastInfo.currentTime, lastInfo.duration]);

  const trackProgress = useEventCallback(async () => {
    try {
      const info = await SoundPlayer.getInfo();
      setLastInfo({
        ...info,
        progress: Math.floor(100 * (info.currentTime / info.duration)),
      });
      if (
        currentPercents <= lastTrackedProgress.current ||
        currentPercents < 10
      )
        return;
      trackProgressMutation({
        variables: {
          input: {
            id: route.params.id,
            progress: currentPercents,
          },
        },
      }).then(() => {
        lastTrackedProgress.current = currentPercents;
        eventListener.fireEvent('refetch-progress');
      });
      if (audioFile && currentPercents > 80) {
        logEvent('Lesson completed', {lessonTitle: audioFile.name});
      }
    } catch (e) {
      console.log(e);
      setLastInfo({currentTime: 0, duration: 0, progress: 0});
    }
  });

  useNavigationListener('blur', () => SoundPlayer.stop());
  useNavigationListener('beforeRemove', () => SoundPlayer.stop());

  useEffect(() => {
    const finishedLoadingSubscription = SoundPlayer.addEventListener(
      'FinishedLoadingURL',
      () => {
        SoundPlayer.play();
        setAudioPlaying(true);
      },
    );
    const finishedPlayingSubscription = SoundPlayer.addEventListener(
      'FinishedPlaying',
      () => {
        SoundPlayer.seek(0);
        setAudioPlaying(false);
      },
    );
    return () => {
      finishedLoadingSubscription.remove();
      finishedPlayingSubscription.remove();
    };
  }, []);

  useInterval(trackProgress, 500);

  // useEffect(() => {
  //   const onBackPress = () => {
  //     console.log('back', visibleTranscript);
  //
  //     // if (visibleTranscript) {
  //     setVisibleTranscript(false);
  //     // return false;
  //     // }
  //
  //     return false;
  //   };
  //
  //   BackHandler.addEventListener('hardwareBackPress', onBackPress);
  //
  //   return () =>
  //     BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  // }, []);

  console.log({duration: lastInfo.duration});

  if (!audioFile)
    return (
      <SafeAreaView>
        <Text>Loading</Text>
      </SafeAreaView>
    );
  return (
    <SafeAreaView
      style={{
        backgroundColor: '#fff',
      }}>
      <GradientBackground
        angle={180}
        color1="rgba(255,255,255,0.29)"
        color2="rgba(255,231,231,0.29)">
        <MainContainerWrapper>
          <MainHeader />

          <MainContainer align="center" alignVertical="center" page="sub">
            {!visibleTranscript && (
              <DropShadow
                style={{
                  shadowColor: 'rgba(255,231,231,0.29)',
                  shadowOffset: {width: 0, height: 10},
                  shadowOpacity: 0.64,
                  shadowRadius: 20,
                }}>
                {audioFile.image && (
                  <Image
                    source={images('audioDetail', audioFile.image)}
                    style={{
                      marginBottom: 16,
                      borderRadius: 10,
                    }}
                  />
                )}
              </DropShadow>
            )}
            <View
              style={{
                marginBottom: 32,
              }}>
              <Text align="center" textVariant="bigHeader">
                {audioFile.name}
              </Text>
              <Text align="center" colorVariant="gray" textVariant="textSmall">
                {/*Úroveň 1 • Bojujte s depresí*/}
              </Text>
            </View>

            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Text>{secondsToTime(lastInfo.currentTime)}</Text>
              <View style={{flex: 1}} />
              <Text>
                {secondsToTime(
                  lastInfo.duration > 300000 ? 0 : lastInfo.duration,
                )}
              </Text>
            </View>
            <Slider
              progress={lastInfo.progress}
              onSeek={seek}
              onSlidingStart={() => pause()}
            />

            <View>
              <AudioControls
                disableNextButton={!audioFile.next}
                disablePrevButton={!audioFile.previous}
                isPlaying={audioPlaying}
                onPressNext={() =>
                  audioFile.next && navigate('Audio', {id: audioFile.next})
                }
                onPressPlay={() => togglePlay()} //setAudioPlaying(!audioPlaying)}
                onPressPrev={() =>
                  audioFile.previous &&
                  navigate('Audio', {id: audioFile.previous})
                }
              />

              {audioFile.transcript && (
                <View>
                  <TouchableOpacity
                    style={{
                      width: '100%',
                    }}
                    onPress={() => setVisibleTranscript(!visibleTranscript)}>
                    <Text align="center">
                      {visibleTranscript ? 'Zpět k audiu' : 'Chci raději číst'}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </MainContainer>
        </MainContainerWrapper>
      </GradientBackground>

      {visibleTranscript && !!audioFile.transcript && (
        <Modal
          close={() => setVisibleTranscript(!visibleTranscript)}
          onRequestClose={() => setVisibleTranscript(!visibleTranscript)}>
          <ScrollView>
            <Text align="center" textVariant="bigHeader">
              {audioFile.name}
            </Text>
            <HTML
              source={{html: audioFile.transcript}}
              tagsStyles={{
                ...styles,
              }}
            />
            <Button
              title="Zavřít"
              onPress={() => setVisibleTranscript(false)}
            />
          </ScrollView>
        </Modal>
      )}
    </SafeAreaView>
  );
};

export default AudioScreen;
