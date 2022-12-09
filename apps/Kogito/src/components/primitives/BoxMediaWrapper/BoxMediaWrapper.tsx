import React, {FC} from 'react';
import S from './styles';

type ContainerProps = {};

const BoxMediaWrapper: FC<ContainerProps> = ({children, ...rest}) => {
  return (
    <S.Container {...rest}>
      <S.Wrapper>{children}</S.Wrapper>
    </S.Container>
  );
};

export default BoxMediaWrapper;
