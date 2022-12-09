import React, {FC} from 'react';
import {StyledButton} from './styles';
import ReactNative from 'react-native';
import IconBack from '../../../assets/icon-chevron-left.svg';

export type ColorVariants = 'red' | 'white' | 'transparent';

type ButtonProps = {
  colorVariant?: ColorVariants;
} & ReactNative.TouchableOpacityProps;

const ButtonBack: FC<ButtonProps> = ({colorVariant = 'red', ...rest}) => {
  return (
    <StyledButton colorVariant={colorVariant} {...rest}>
      <IconBack
        style={{
          color: '#ca4233',
        }}
      />
    </StyledButton>
  );
};

export default ButtonBack;
