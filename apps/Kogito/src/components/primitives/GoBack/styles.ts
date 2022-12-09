import styled from 'styled-components/native';

const S = {
  Container: styled.TouchableOpacity`
    padding: 12px;
    margin: -12px;
  `,
  Wrapper: styled.View`
    flex-direction: row;
    align-items: center;
  `,
  Text: styled.Text`
    color: #1c1c1c;
    font-size: 16px;
    margin-left: 16px;
  `,
};

export default S;
