import styled from 'styled-components/native';
import {Align, AlignVertical, Color, Page} from './MainContainer';
import {variant} from 'styled-system';

type View = {
  align?: Align;
  alignVertical?: AlignVertical;
  page?: Page;
  color?: Color;
};

export const Container = styled.View<View>`
  padding: 64px 42px 0;
  flex: 1 1 auto;
  align-items: stretch;
  ${variant({
    prop: 'align',
    variants: {
      center: {
        alignItems: 'center',
      },
      left: {
        alignItems: 'flex-start',
      },
      right: {
        alignItems: 'flex-end',
      },
    },
  })}
  ${variant({
    prop: 'alignVertical',
    variants: {
      center: {
        justifyContent: 'center',
      },
      between: {
        justifyContent: 'space-between',
      },
      bottom: {
        justifyContent: 'flex-end',
      },
    },
  })}
  ${variant({
    prop: 'page',
    variants: {
      dashboard: {
        padding: '0',
      },
      sub: {
        padding: '0 24px',
      },
      subWithoutFooter: {
        padding: '0 24px 24px',
      },
      withoutFooter: {
        padding: '0 0 24px',
      },
    },
  })}
  ${variant({
    prop: 'color',
    variants: {
      white: {
        background: '#fff',
      },
      main: {
        background: '#FFE7E7',
      },
    },
  })}
`;
