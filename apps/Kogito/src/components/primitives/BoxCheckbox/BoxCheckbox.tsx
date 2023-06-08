import React, {useState} from 'react';
import S from './styles';
import Icon from '../../../assets/icon-check.svg';
import {TouchableWithoutFeedback} from 'react-native';

type ContainerProps = {
  checked?: boolean;
  title?: string;
  onChange?: (value: boolean) => void;
  onLongPress?: () => void;
};

const BoxCheckbox: React.FC<ContainerProps> = ({
  title = '',
  checked = false,
  onChange = () => {},
  onLongPress = () => {},
}) => {
  const [state, setState] = useState<boolean>(checked);

  const clickChange = () => {
    setState(!state);
    onChange(!state);
  };

  return (
    <TouchableWithoutFeedback onLongPress={onLongPress}>
      <S.Container checked={state}>
        <S.Wrapper>
          <S.Box onPress={clickChange}>{state && <Icon />}</S.Box>
          <S.Title checked={state}>{title}</S.Title>
        </S.Wrapper>
      </S.Container>
    </TouchableWithoutFeedback>
  );
};

export default BoxCheckbox;
