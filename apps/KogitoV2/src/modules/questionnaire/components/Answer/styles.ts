import styled from 'styled-components/native';
import {variant} from 'styled-system';

type Selected = {
  selected: boolean;
};

export const AnswerButton = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
  margin-top: 28px;
`;

export const Character = styled.Text<Selected>`
  font-weight: bold;
  font-size: 14px;
  text-align: center;
  line-height: 30px;
  color: ${props => (props.selected ? '#ffffff' : '#243936')};
`;

export const AnswerIndex = styled.View<Selected>`
  width: 32px;
  height: 32px;
  border-radius: 4px;
  border: 1px solid #e4e4e4;
  ${variant({
    prop: 'selected',
    variants: {
      false: {},
      true: {
        borderColor: 'transparent',
        background: '#ca4233',
      },
    },
  })}
`;

export const Text = styled.Text<Selected>`
  font-size: 15px;
  text-align: left;
  margin-left: 10px;
  color: #243936;
  font-weight: ${props => (props.selected ? 'bold' : 'normal')};
`;
