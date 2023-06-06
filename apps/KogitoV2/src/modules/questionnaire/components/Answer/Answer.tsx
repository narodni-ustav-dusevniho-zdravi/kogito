import React from 'react';
import {AnswerButton, AnswerIndex, Character, Text} from './styles';
import DropShadow from 'react-native-drop-shadow';

type Answer = {
  index: number;
  selected: boolean;
  answer: string;
  press: (index: number) => void;
};

const Answer: React.FC<Answer> = ({index, answer, selected, press}) => {
  const character = String.fromCharCode(65 + index);

  return (
    <AnswerButton onPress={() => press(index)}>
      <DropShadow
        style={
          selected && {
            shadowColor: '#ca4233',
            shadowOffset: {width: 0, height: 0},
            shadowOpacity: 1,
            shadowRadius: 3,
          }
        }>
        <AnswerIndex selected={selected}>
          <Character selected={selected}>{character}</Character>
        </AnswerIndex>
      </DropShadow>
      <Text selected={selected}>{answer}</Text>
    </AnswerButton>
  );
};

export default Answer;
