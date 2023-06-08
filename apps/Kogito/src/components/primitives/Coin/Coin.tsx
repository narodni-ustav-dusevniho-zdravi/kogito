import React from 'react';
import {StyledButton, Text} from './styles';
import ReactNative from 'react-native';
import IconCoin from '../../../assets/icon-coin.svg';

type ButtonProps = {
  title: string;
} & ReactNative.TouchableOpacityProps;

const Coin: React.FC<ButtonProps> = ({title, ...rest}) => {
  return (
    <StyledButton {...rest}>
      <IconCoin />
      <Text>{title}</Text>
    </StyledButton>
  );
};

export default Coin;
