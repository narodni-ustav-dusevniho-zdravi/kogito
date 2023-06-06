import styled from 'styled-components/native';

const S = {
  Container: styled.View`
    padding: 0 24px;
  `,
  Wrapper: styled.View`
    flex-direction: row;
    align-items: center;
    border-bottom-color: rgba(112, 112, 112, 0.15);
    border-bottom-width: 1px;
  `,
  TextInput: styled.TextInput`
    padding: 12px 20px;
    color: #1c1c1c;
    font-size: 14px;
  `,
};

export default S;
