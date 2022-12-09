import React, {FC} from 'react';
import {Container} from './styles';

export type Align = 'center' | 'left' | 'right' | 'between' | null;
export type AlignVertical = 'center' | 'bottom' | 'between' | null;
export type Page =
  | 'dashboard'
  | 'sub'
  | 'withoutFooter'
  | 'subWithoutFooter'
  | null;
export type Color = 'white' | 'main' | null;

type MainContainerProps = {
  align?: Align;
  alignVertical?: AlignVertical;
  page?: Page;
  color?: Color;
};

const MainContainer: FC<MainContainerProps> = ({
  children,
  align = 'center',
  alignVertical = null,
  page = null,
  color = null,
  ...rest
}) => {
  return (
    <Container
      align={align}
      alignVertical={alignVertical}
      page={page}
      color={color}
      {...rest}>
      {children}
    </Container>
  );
};

export default MainContainer;
