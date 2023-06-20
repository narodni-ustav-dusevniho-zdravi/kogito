import React from 'react';

import {Icon, theme} from '~modules/ui';

import S from './styles';

type BoxAdd = {
  onPress: () => void;
};

const BoxAdd: React.FC<BoxAdd> = ({onPress}) => {
  return (
    <S.Container onPress={onPress}>
      <S.Wrapper>
        <S.Box>
          <Icon color={theme.colors.primary} name="plus" size={24} />
        </S.Box>
        <S.Title>Přidat úkol</S.Title>
      </S.Wrapper>
    </S.Container>
  );
};

export default BoxAdd;
