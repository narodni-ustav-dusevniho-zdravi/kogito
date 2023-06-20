import React from 'react';

import {Icon} from '~modules/ui';

import S from './styles';

const InputSearch: React.FC = () => {
  return (
    <S.Container>
      <S.Wrapper>
        <Icon color="#bababa" name="search" size={24} />
        <S.TextInput
          placeholder="Vyhledávej"
          placeholderTextColor="rgba(28,28,28,0.3)"
          returnKeyType="search"
        />
      </S.Wrapper>
    </S.Container>
  );
};

export default InputSearch;
