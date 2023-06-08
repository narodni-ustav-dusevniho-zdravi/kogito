import styled from 'styled-components/native';
import {Align, BgColor} from './MainHeader';
import {variant} from 'styled-system';

type View = {
  align?: Align;
  bgColor?: BgColor;
};

const S = {
  Container: styled.View<View>`
    height: 64px;
    flex-direction: row;
    padding: 0 24px;
    background: #fff;
    align-items: center;
    justify-content: space-between;
    ${variant({
      prop: 'align',
      variants: {
        left: {
          justifyContent: 'flex-start',
        },
        right: {
          justifyContent: 'flex-end',
        },
      },
    })}
    ${variant({
      prop: 'bgColor',
      variants: {
        transparent: {
          background: 'transparent',
        },
      },
    })}
  `,
};

export default S;
