import React from 'react';

import Icon from '~assets/icon-chevron-left.svg';
import {useNavigation} from '~modules/navigation';

import S from './styles';

type ContainerProps = {
  title: string;
  beforeBackButton?: () => Promise<void>;
};

const GoBack: React.FC<ContainerProps> = ({
  title,
  beforeBackButton,
  ...rest
}) => {
  const {navigate} = useNavigation();

  const handlePress = async () => {
    await beforeBackButton?.();
    navigate('Dashboard');
  };

  return (
    <S.Container {...rest} onPress={handlePress}>
      <S.Wrapper>
        <Icon color="#1c1c1c" />
        <S.Text>{title}</S.Text>
      </S.Wrapper>
    </S.Container>
  );
};

export default GoBack;
