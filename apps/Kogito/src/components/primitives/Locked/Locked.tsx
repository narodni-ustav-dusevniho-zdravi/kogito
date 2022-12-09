import React, {FC} from 'react';
import IconLock from '../../../assets/icon-lock.svg';
import S from './styles';

type ContainerProps = {
  title: string;
};

const Locked: FC<ContainerProps> = ({title, ...rest}) => {
  return (
    <S.Container {...rest}>
      <S.Wrapper>
        <IconLock />
        <S.Text>{title}</S.Text>
      </S.Wrapper>
    </S.Container>
  );
};

export default Locked;
