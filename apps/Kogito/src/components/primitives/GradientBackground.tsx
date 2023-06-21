import React, {PropsWithChildren} from 'react';
import LinearGradient from 'react-native-linear-gradient';

type GradientProps = PropsWithChildren & {
  color1?: string;
  color2?: string;
  angle?: number;
};

const GradientBackground: React.FC<GradientProps> = ({
  children,
  color1 = '#ffe7e7',
  color2 = '#fff3e7',
  angle = 148,
}) => {
  return (
    <LinearGradient colors={[color1, color2]} useAngle={true} angle={angle}>
      {children}
    </LinearGradient>
  );
};

export default GradientBackground;
