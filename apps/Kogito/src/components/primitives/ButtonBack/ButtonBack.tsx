import React from 'react';
import type ReactNative from 'react-native';

import {Icon, theme} from '~modules/ui';

import {StyledButton} from './styles';

export type ColorVariants = 'red' | 'white' | 'transparent';

type ButtonProps = {
  colorVariant?: ColorVariants;
} & ReactNative.TouchableOpacityProps;

const ButtonBack: React.FC<ButtonProps> = ({colorVariant = 'red', ...rest}) => {
  return (
    <StyledButton colorVariant={colorVariant} {...rest}>
      <Icon color={theme.colors.primary} name="chevron-left" size={24} />
    </StyledButton>
  );
};

export default ButtonBack;
