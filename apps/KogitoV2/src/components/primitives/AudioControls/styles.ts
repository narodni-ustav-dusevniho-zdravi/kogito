import styled from 'styled-components/native';

const S = {
  Container: styled.View`
    padding: 42px 24px;
  `,
  Wrapper: styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
  `,
  Button: styled.TouchableOpacity`
    width: 77px;
    height: 77px;
    align-items: center;
    justify-content: center;
  `,
  ButtonPlay: styled.TouchableOpacity`
    box-shadow: 0 20px 20px rgba(0, 0, 0, 0.16);
    background-color: #ffffff;
    border-radius: 100px;
    width: 77px;
    height: 77px;
    align-items: center;
    justify-content: center;
  `,
};

export default S;
