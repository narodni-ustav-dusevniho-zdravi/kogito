import styled from 'styled-components/native';
import {variant} from 'styled-system';

export const Text = styled.Text<{isActive: boolean}>`
  opacity: 0.5;
  color: #1c1c1c;
  font-size: 18px;
  font-weight: 500;
  ${variant({
    prop: 'isActive',
    variants: {
      true: {
        opacity: '1',
        fontWeight: 700,
      },
    },
  })};
`;
export const Link = styled.TouchableOpacity`
  position: relative;
  padding: 8px 15px;
`;
export const Border = styled.View<{isActive: boolean}>`
  position: relative;
  opacity: 0;
  height: 3px;
  background: #ca4233;
  flex: 1 1 auto;
  margin-top: 8px;
  ${variant({
    prop: 'isActive',
    variants: {
      true: {
        opacity: '1',
      },
    },
  })};
`;
export const ScrollViewInner = styled.View`
  flex-direction: row;
  padding: 0 24px 0 9px;
`;
export const Container = styled.View`
  position: relative;
  margin: 42px 0 24px;
`;
