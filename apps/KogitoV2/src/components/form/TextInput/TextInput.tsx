import React from 'react';
import ReactNative from 'react-native';
import {StyledTextInput} from './styles';

type TextInput = {} & ReactNative.TextInputProps;

const TextInput: React.FC<TextInput> = ({...rest}) => {
  // tu nevim zda to obalit do nejakeho srack
  return <StyledTextInput {...rest} />;
};

export default TextInput;
