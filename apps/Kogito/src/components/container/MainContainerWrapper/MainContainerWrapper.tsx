import React, {FC} from 'react';
import {Container} from './styles';

export type Color = 'white' | null;

type MainContainerProps = {
  color?: Color;
};

const MainContainerWrapper: FC<MainContainerProps> = ({
  children,
  color = null,
  ...rest
}) => {
  return (
    <Container color={color} {...rest}>
      {children}
    </Container>
  );
};

export default MainContainerWrapper;
