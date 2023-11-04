import React, {useEffect, useRef, useState} from 'react';
import {Image, SafeAreaView, TouchableOpacity, View} from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import {useEventCallback, useInterval} from 'usehooks-ts';

import {logEvent} from '~modules/analytics';
import type {AppScreen} from '~modules/navigation';
import {useNavigationListener} from '~modules/navigation';
import {SoundPlayer, useTrack} from '~modules/trackPlayer';
import {Dialog, Html} from '~modules/ui';

import MainContainer from '../components/container/MainContainer/MainContainer';
import MainContainerWrapper from '../components/container/MainContainerWrapper';
import MainHeader from '../components/container/MainHeader/MainHeader';
import AudioControls from '../components/primitives/AudioControls';
import Button from '../components/primitives/Button';
import GradientBackground from '../components/primitives/GradientBackground';
import Slider from '../components/primitives/Slider';
import Text from '../components/primitives/Text';
import {useItemContent} from '../content/useItemContent';
import {useTrackProgressMutation} from '../content/useTrackProgressMutation';
import eventListener from '../helpers/eventListener';
import images from '../helpers/images';
import {secondsToTime} from '../helpers/secondsToTime';

// eslint-disable-next-line max-lines-per-function
const AudioScreen: AppScreen<'Audio'> = ({navigation: {navigate}, route}) => {
  const {audioFile} = useItemContent(route.params.id);
  const trackProgressMutation = useTrackProgressMutation();
  const track = useTrack(audioFile?.link);
  const progressPercents = track.progress?.percents ?? 0;
  useNavigationListener('blur', SoundPlayer.reset);
  useEffect(() => {
    if (!audioFile?.link) return;
    SoundPlayer.play(audioFile);
  }, [audioFile]);

  const [visibleTranscript, setVisibleTranscript] = useState<boolean>(false);
  useEffect(() => {
    if (visibleTranscript) SoundPlayer.pause();
  }, [visibleTranscript]);

  const lastTrackedProgress = useRef(0);

  const seek = (progress: number) => {
    if (!track.progress) return;
    SoundPlayer.seekTo(Math.floor(track.progress.duration * (progress / 100)));
  };

  const trackProgress = useEventCallback(() => {
    const progress = Math.round(progressPercents);
    try {
      if (progress <= lastTrackedProgress.current || progress < 10) return;
      trackProgressMutation({
        variables: {
          input: {
            id: route.params.id,
            progress,
          },
        },
      }).then(() => {
        lastTrackedProgress.current = progress;
        eventListener.fireEvent('refetch-progress');
      });
      if (audioFile && progress > 80) {
        logEvent('Lesson completed', {lessonTitle: audioFile.name});
      }
    } catch (e) {
      console.log(e);
    }
  });

  useInterval(trackProgress, 500);

  if (!audioFile)
    return (
      <SafeAreaView>
        <Text>Loading</Text>
      </SafeAreaView>
    );
  return (
    <SafeAreaView style={{backgroundColor: '#fff'}}>
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

            <View
              style={{
                alignSelf: 'stretch',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              {track.progress && (
                <>
                  <Text>{secondsToTime(track.progress.position)}</Text>
                  <Text>{secondsToTime(track.progress.duration)}</Text>
                </>
              )}
            </View>
            <Slider progress={progressPercents} onValueChange={seek} />

            <View>
              <AudioControls
                disableNextButton={!audioFile.next}
                disablePrevButton={!audioFile.previous}
                isPlaying={track.isPlaying}
                onPressNext={() =>
                  audioFile.next && navigate('Audio', {id: audioFile.next})
                }
                onPressPlay={() => {
                  if (track.isPlaying) return SoundPlayer.pause();
                  SoundPlayer.play(audioFile);
                }}
                onPressPrev={() =>
                  audioFile.previous &&
                  navigate('Audio', {id: audioFile.previous})
                }
              />

              {audioFile.transcript && (
                <>
                  <View>
                    <TouchableOpacity
                      style={{
                        width: '100%',
                      }}
                      onPress={() => setVisibleTranscript(!visibleTranscript)}>
                      <Text align="center">
                        {visibleTranscript
                          ? 'Zpět k audiu'
                          : 'Chci raději číst'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Dialog
                    title={audioFile.name}
                    visible={visibleTranscript}
                    onHide={() => setVisibleTranscript(!visibleTranscript)}>
                    <Html source={audioFile.transcript} />
                    <Button
                      title="Zavřít"
                      onPress={() => setVisibleTranscript(false)}
                    />
                  </Dialog>
                </>
              )}
            </View>
          </MainContainer>
        </MainContainerWrapper>
      </GradientBackground>
    </SafeAreaView>
  );
};

export default AudioScreen;
