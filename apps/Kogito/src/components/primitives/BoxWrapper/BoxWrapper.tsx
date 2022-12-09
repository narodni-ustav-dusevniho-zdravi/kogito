import React, {FC} from 'react';
import {Container} from './styles';

type ContainerProps = {};

const BoxWrapper: FC<ContainerProps> = ({children, ...rest}) => {
  return <Container {...rest}>{children}</Container>;
};

export default BoxWrapper;
