import styled from 'styled-components/native';

const S = {
  Modal: styled.Modal`
    margin: 0;
    justify-content: flex-end;
    background-color: black;
    opacity: 0.7;
  `,
  OpacityBackground: styled.View`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: black;
    opacity: 0.7;
  `,
  ContainerWrap: styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  `,
  ContainerInner: styled.View`
    min-height: 400px;
    max-width: 90%;
  `,
  ItemContainer: styled.View`
    flex-direction: row;
    flex-wrap: wrap;
  `,
  ItemWrapper: styled.View`
    flex: 0 0 auto;
    margin: 6px 8px;
    padding: 6px 16px;
    border-radius: 24px;
    background: rgb(231, 238, 248);
  `,
  Item: styled.Text`
    font-size: 16px;
    color: #011e46;
  `,
};

export default S;
