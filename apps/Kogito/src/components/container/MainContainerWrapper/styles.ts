import styled from 'styled-components/native';
import {variant} from 'styled-system';

export const Container = styled.View`
  height: 100%;
  ${variant({
    prop: 'color',
    variants: {
      white: {
        background: '#fff',
      },
    },
  })}
`;
