import React from 'react';
import S from './styles';
import * as NativeSlider from '@react-native-community/slider';

type Slider = {
  progress: number;
  onSlidingStart?: () => void;
  onSeek?: (progress: number) => void;
};

const Slider: React.FC<Slider> = ({
  progress,
  onSlidingStart = () => {},
  onSeek = () => {},
}) => {
  return (
    <S.Wrapper>
      <NativeSlider.default
        minimumValue={0}
        maximumValue={100}
        value={progress}
        minimumTrackTintColor="#ca4233"
        maximumTrackTintColor="#f7dcda"
        thumbTintColor="#E0E0E0"
        style={{width: '100%', height: 5}}
        onSlidingStart={onSlidingStart}
        onSlidingComplete={onSeek}
      />
    </S.Wrapper>
  );
};

export default Slider;
