import React from 'react';
import * as NativeSlider from '@react-native-community/slider';

import S from './styles';

type Slider = {
  onValueChange: (progress: number) => void;
  progress: number;
  onSlidingStart?: () => void;
};

const Slider: React.FC<Slider> = ({
  progress,
  onSlidingStart = () => {},
  onValueChange = () => {},
}) => {
  return (
    <S.Wrapper>
      <NativeSlider.default
        maximumTrackTintColor="#f7dcda"
        maximumValue={100}
        minimumTrackTintColor="#ca4233"
        minimumValue={0}
        style={{width: '100%', height: 5}}
        thumbTintColor="#E0E0E0"
        value={progress}
        onSlidingStart={onSlidingStart}
        onValueChange={onValueChange}
      />
    </S.Wrapper>
  );
};

export default Slider;
