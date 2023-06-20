import React, {useState} from 'react';
import {TouchableWithoutFeedback} from 'react-native';

import {Icon, theme} from '~modules/ui';

import S from './styles';

type ContainerProps = {
  checked?: boolean;
  onChange?: (value: boolean) => void;
  onLongPress?: () => void;
  title?: string;
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
          <S.Box onPress={clickChange}>
            {state && (
              <Icon color={theme.colors.primary} name="check" size={18} />
            )}
          </S.Box>
          <S.Title checked={state}>{title}</S.Title>
        </S.Wrapper>
      </S.Container>
    </TouchableWithoutFeedback>
  );
};

export default BoxCheckbox;
