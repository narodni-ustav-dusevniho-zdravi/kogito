import React, {PropsWithChildren} from 'react';
import S from './styles';
import DropShadow from 'react-native-drop-shadow';
import {TouchableOpacityProps} from 'react-native';

const ButtonIcon: React.FC<PropsWithChildren & TouchableOpacityProps> = ({
  children,
  ...rest
}) => {
  return (
    <S.Button {...rest}>
      <DropShadow
        style={{
          shadowColor: '#000',
          shadowOffset: {width: 3, height: 6},
          shadowOpacity: 0.08,
          shadowRadius: 6,
        }}>
        <S.ButtonInner>{children}</S.ButtonInner>
      </DropShadow>
    </S.Button>
  );
};

export default ButtonIcon;
