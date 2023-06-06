import React from 'react';
import IconPrev from '../../../assets/icon-audio-prev.svg';
import IconNext from '../../../assets/icon-audio-next.svg';
import IconPlay from '../../../assets/icon-audio-play.svg';
import IconPause from '../../../assets/icon-audio-pause.svg';
import S from './styles';
import DropShadow from 'react-native-drop-shadow';

type AudioControls = {
  isPlaying: boolean;
  disablePrevButton: boolean;
  disableNextButton: boolean;
  onPressPrev?: () => void;
  onPressNext?: () => void;
  onPressPlay?: () => void;
};

const AudioControls: React.FC<AudioControls> = ({
  isPlaying,
  disablePrevButton,
  disableNextButton,
  onPressPrev = () => {},
  onPressNext = () => {},
  onPressPlay = () => {},
}) => {
  return (
    <S.Container>
      <S.Wrapper>
        <S.Button disabled={disablePrevButton} onPress={onPressPrev}>
          <IconPrev />
        </S.Button>
        <DropShadow
          style={{
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 20},
            shadowOpacity: 0.16,
            shadowRadius: 20,
          }}>
          <S.ButtonPlay onPress={onPressPlay}>
            {isPlaying ? (
              <IconPause />
            ) : (
              <IconPlay
                style={{
                  marginLeft: 5,
                }}
              />
            )}
          </S.ButtonPlay>
        </DropShadow>
        <S.Button disabled={disableNextButton} onPress={onPressNext}>
          <IconNext />
        </S.Button>
      </S.Wrapper>
    </S.Container>
  );
};

export default AudioControls;
