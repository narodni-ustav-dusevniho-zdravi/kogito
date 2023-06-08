import styled from 'styled-components/native';
import {variant} from 'styled-system';

const S = {
  Container: styled.View<{checked: boolean}>`
    border-radius: 10px;
    background-color: #f5f4fa;
    margin-bottom: 6px;
    ${variant({
      prop: 'checked',
      variants: {
        true: {
          backgroundColor: 'rgba(245,244,250,0.6)',
        },
      },
    })};
  `,
  Wrapper: styled.View`
    flex-direction: row;
    align-items: center;
    min-height: 48px;
    padding: 0 14px;
  `,
  Box: styled.TouchableOpacity`
    width: 24px;
    height: 24px;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border-radius: 6px;
    margin-right: 16px;
  `,
  Title: styled.Text<{checked: boolean}>`
    color: #1c1c1c;
    font-size: 14px;
    font-weight: 500;
    padding: 8px 0;
    ${variant({
      prop: 'checked',
      variants: {
        true: {
          opacity: 0.6,
          textDecoration: 'line-through',
        },
      },
    })};
  `,
  TitleEdit: styled.TextInput`
    color: #1c1c1c;
    font-size: 14px;
    font-weight: 500;
    padding: 8px 0;
    width: 100%;
    ${variant({
      prop: 'checked',
      variants: {
        true: {
          opacity: 0.6,
          textDecoration: 'line-through',
        },
      },
    })};
  `,
};

export default S;
