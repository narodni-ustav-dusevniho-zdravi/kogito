import TrackPlayer, {
  Event,
  useActiveTrack,
  useIsPlaying,
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';

import type {AudioItem} from '~gql/graphql';

type AudioFile = Pick<AudioItem, 'image' | 'link' | 'name' | 'subTitle'>;

const setupPlayer = async () => {
  try {
    await TrackPlayer.setupPlayer({autoHandleInterruptions: true});
  } catch (e) {
    console.log(e);
  }
};

const play = async (track: AudioFile) => {
  await setupPlayer();
  const active = await TrackPlayer.getActiveTrack();
  const isCurrentTrack = active?.url === track.link;
  if (!isCurrentTrack) {
    await TrackPlayer.reset();
    await TrackPlayer.add({
      artist: 'Kogito',
      title: track.name,
      album: track.subTitle ?? '',
      artwork: track.image ?? '',
      url: track.link,
    });
  }
  await TrackPlayer.play();
};

TrackPlayer.addEventListener(Event.PlaybackQueueEnded, TrackPlayer.reset);

export const useTrack = (url: string | undefined, updateInterval = 500) => {
  const progress = useProgress(updateInterval);
  const activeTrack = useActiveTrack();
  const isPlaying = !!useIsPlaying().playing;
  const playbackState = usePlaybackState();

  if (activeTrack?.url !== url) return {isPlaying: false};
  const percents =
    progress.duration <= 0 ? 0 : (progress.position / progress.duration) * 100;
  return {progress: {...progress, percents}, playbackState, isPlaying};
};

export const SoundPlayer = {
  ...TrackPlayer,
  play,
  resume: TrackPlayer.play,
};
