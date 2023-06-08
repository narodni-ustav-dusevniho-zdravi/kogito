import React from 'react';
import S from './styles';
import Icon from '../../../assets/icon-plus.svg';

type BoxAdd = {
  onPress: () => void;
};

const BoxAdd: React.FC<BoxAdd> = ({onPress}) => {
  return (
    <S.Container onPress={onPress}>
      <S.Wrapper>
        <S.Box>
          <Icon />
        </S.Box>
        <S.Title>Přidat úkol</S.Title>
      </S.Wrapper>
    </S.Container>
  );
};

export default BoxAdd;
