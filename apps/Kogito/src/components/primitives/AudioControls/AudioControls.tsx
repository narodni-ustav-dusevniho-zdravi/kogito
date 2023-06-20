import React from 'react';
import DropShadow from 'react-native-drop-shadow';

import {Color, Icon, theme} from '~modules/ui';

import S from './styles';

type AudioControls = {
  disableNextButton: boolean;
  disablePrevButton: boolean;
  isPlaying: boolean;
  onPressNext?: () => void;
  onPressPlay?: () => void;
  onPressPrev?: () => void;
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
          <Icon
            color={
              disablePrevButton
                ? Color.alpha(theme.colors.primary, 0.23)
                : theme.colors.primary
            }
            name="audio-prev"
            size={29}
          />
        </S.Button>
        <DropShadow
          style={{
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 20},
            shadowOpacity: 0.16,
            shadowRadius: 20,
          }}>
          <S.ButtonPlay onPress={onPressPlay}>
            <Icon
              color={theme.colors.primary}
              name={isPlaying ? 'audio-pause' : 'audio-play'}
              size={29}
            />
          </S.ButtonPlay>
        </DropShadow>
        <S.Button disabled={disableNextButton} onPress={onPressNext}>
          <Icon
            color={
              disableNextButton
                ? Color.alpha(theme.colors.primary, 0.23)
                : theme.colors.primary
            }
            name="audio-next"
            size={29}
          />
        </S.Button>
      </S.Wrapper>
    </S.Container>
  );
};

export default AudioControls;
