import React from 'react';
import IconSearch from '../../../assets/icon-search.svg';
import S from './styles';

type ContainerProps = {};

const InputSearch: React.FC<ContainerProps> = ({...rest}) => {
  return (
    <S.Container {...rest}>
      <S.Wrapper>
        <IconSearch />
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
