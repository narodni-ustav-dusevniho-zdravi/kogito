import React from 'react';
import ReactNative from 'react-native';
import S from './styles';

type TextArea = {} & ReactNative.TextInputProps;

const TextArea: React.FC<TextArea> = ({...rest}) => {
  return (
    <S.Container>
      <S.StyledTextArea
        underlineColorAndroid="transparent"
        placeholder="Zapiš si myšlenky, emoce a příznaky"
        placeholderTextColor="grey"
        textAlignVertical="top"
        multiline={true}
        {...rest}
      />
    </S.Container>
  );
};

export default TextArea;
