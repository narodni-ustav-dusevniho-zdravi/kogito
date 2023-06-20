import React from 'react';

import {Icon, theme} from '~modules/ui';

import S from './styles';

type ContainerProps = {
  title: string;
};

const Locked: React.FC<ContainerProps> = ({title, ...rest}) => {
  return (
    <S.Container {...rest}>
      <S.Wrapper>
        <Icon color={theme.colors.primary} name="lock" size={36} />
        <S.Text>{title}</S.Text>
      </S.Wrapper>
    </S.Container>
  );
};

export default Locked;
