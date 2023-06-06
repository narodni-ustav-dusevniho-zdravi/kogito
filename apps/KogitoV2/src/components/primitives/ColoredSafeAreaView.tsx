import React, {PropsWithChildren} from 'react';
import {SafeAreaView} from 'react-native';
import GradientBackground from './GradientBackground';

type GradientProps = PropsWithChildren & {
  color1?: string;
  color2?: string;
  angle?: number;
};

const ColoredSafeAreaView: React.FC<GradientProps> = ({
  children,
  color1 = '#ffe7e7',
  color2 = '#fff3e7',
  angle = 148,
}) => {
  return (
    <>
      <SafeAreaView style={{flex: 0, backgroundColor: color1}} />
      <SafeAreaView style={{flex: 1, backgroundColor: color2}}>
        <GradientBackground color1={color1} color2={color2} angle={angle}>
          {children}
        </GradientBackground>
      </SafeAreaView>
    </>
  );
};

export default ColoredSafeAreaView;
