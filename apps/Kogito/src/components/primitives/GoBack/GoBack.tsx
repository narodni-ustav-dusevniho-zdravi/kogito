import React from 'react';

import {useNavigation} from '~modules/navigation';
import {Icon} from '~modules/ui';

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
        <Icon color="#1c1c1c" name="chevron-left" size={32} />
        <S.Text>{title}</S.Text>
      </S.Wrapper>
    </S.Container>
  );
};

export default GoBack;
