import React from 'react';
import {Container} from './styles';
import {ViewProps} from 'react-native';

export type Align = 'center' | 'left' | 'right' | 'between';
export type AlignVertical = 'center' | 'bottom' | 'between';
export type Page = 'dashboard' | 'sub' | 'withoutFooter' | 'subWithoutFooter';
export type Color = 'white' | 'main';

type MainContainerProps = ViewProps & {
  align?: Align;
  alignVertical?: AlignVertical;
  page?: Page;
  color?: Color;
};

const MainContainer: React.FC<MainContainerProps> = ({
  children,
  align = 'center',
  alignVertical,
  page,
  color,
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
