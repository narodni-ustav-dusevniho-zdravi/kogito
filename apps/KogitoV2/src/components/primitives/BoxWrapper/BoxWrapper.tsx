import React, {PropsWithChildren} from 'react';
import {Container} from './styles';

type ContainerProps = PropsWithChildren;

const BoxWrapper: React.FC<ContainerProps> = ({children, ...rest}) => {
  return <Container {...rest}>{children}</Container>;
};

export default BoxWrapper;
