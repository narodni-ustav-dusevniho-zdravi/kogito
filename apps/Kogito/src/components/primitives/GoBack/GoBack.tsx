import React from 'react';

import {useNavigation} from '~modules/navigation';
import {Icon} from '~modules/ui';

import S from './styles';

type ContainerProps = {
  title: string;
};

const GoBack: React.FC<ContainerProps> = ({title, ...rest}) => {
  const {goBack} = useNavigation();

  return (
    <S.Container {...rest} onPress={goBack}>
      <S.Wrapper>
        <Icon color="#1c1c1c" name="chevron-left" size={32} />
        <S.Text>{title}</S.Text>
      </S.Wrapper>
    </S.Container>
  );
};

export default GoBack;
