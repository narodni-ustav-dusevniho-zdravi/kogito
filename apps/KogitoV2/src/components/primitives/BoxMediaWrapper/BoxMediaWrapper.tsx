import React, {PropsWithChildren} from 'react';
import S from './styles';

type ContainerProps = PropsWithChildren;

const BoxMediaWrapper: React.FC<ContainerProps> = ({children, ...rest}) => {
  return (
    <S.Container {...rest}>
      <S.Wrapper>{children}</S.Wrapper>
    </S.Container>
  );
};

export default BoxMediaWrapper;
