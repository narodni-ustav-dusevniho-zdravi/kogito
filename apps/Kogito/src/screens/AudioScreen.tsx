import React, {useEffect, useRef, useState} from 'react';
import {Image, SafeAreaView, View} from 'react-native';
import {useEventCallback, useInterval} from 'usehooks-ts';

import {logEvent} from '~modules/analytics';
import type {AppScreen} from '~modules/navigation';
import {useNavigationListener} from '~modules/navigation';
import {SoundPlayer, useTrack} from '~modules/trackPlayer';
import {Dialog, Html, ScreenContainer} from '~modules/ui';

import AudioControls from '../components/primitives/AudioControls';
import Button from '../components/primitives/Button';
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
        variables: {input: {id: route.params.id, progress}},
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
    <ScreenContainer
      contentContainerStyle={{
        alignItems: 'center',
        paddingHorizontal: 16,
        rowGap: 16,
        justifyContent: 'center',
        flexGrow: 1,
      }}
      gradientBackground
      type="static">
      {audioFile.image && (
        <Image
          source={images('audioDetail', audioFile.image)}
          style={{marginBottom: 16, borderRadius: 10}}
        />
      )}
      <Text align="center" textVariant="bigHeader">
        {audioFile.name}
      </Text>
      <View style={{alignSelf: 'stretch'}}>
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
      </View>
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
          audioFile.previous && navigate('Audio', {id: audioFile.previous})
        }
      />
      {audioFile.transcript && (
        <>
          <Button
            colorVariant="transparentBlack"
            title="Chci raději číst"
            type="small"
            onPress={() => setVisibleTranscript(!visibleTranscript)}
          />
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
    </ScreenContainer>
  );
};

export default AudioScreen;
