import styled from 'styled-components/native';

const S = {
  Container: styled.TouchableOpacity`
    border-radius: 10px;
    margin-bottom: 6px;
  `,
  Wrapper: styled.View`
    flex-direction: row;
    align-items: center;
    min-height: 48px;
    padding: 0 14px;
  `,
  Box: styled.View`
    width: 24px;
    height: 24px;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border-radius: 6px;
    margin-right: 16px;
  `,
  Title: styled.Text`
    color: #1c1c1c;
    font-size: 14px;
    font-weight: 500;
    padding: 8px 0;
  `,
};

export default S;
