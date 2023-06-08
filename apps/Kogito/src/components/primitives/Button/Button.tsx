import React from 'react';
import {StyledButton, ButtonInnerText} from './styles';
import ReactNative from 'react-native';

export type ColorVariants =
  | 'red'
  | 'white'
  | 'transparent'
  | 'transparentBlack'
  | 'orange';
export type Type = 'small' | 'medium' | 'large' | null;

type ButtonProps = {
  title: string;
  colorVariant?: ColorVariants;
  type?: Type;
} & ReactNative.TouchableOpacityProps;

const Button: React.FC<ButtonProps> = ({
  colorVariant = 'red',
  title,
  type = 'large',
  ...rest
}) => {
  return (
    <StyledButton colorVariant={colorVariant} type={type} {...rest}>
      <ButtonInnerText colorVariant={colorVariant} type={type}>
        {title}
      </ButtonInnerText>
    </StyledButton>
  );
};

export default Button;
