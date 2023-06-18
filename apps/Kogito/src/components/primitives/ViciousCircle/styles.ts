import styled from 'styled-components/native';

const S = {
  Container: styled.TouchableOpacity`
    margin: 0 8px;
    width: ${props => `${props.size}px`};
  `,
  Circle: styled.View`
    width: ${props => `${props.size}px`};
    height: ${props => `${props.size}px`};
    border-radius: ${props => `${props.size / 2}px`};
    overflow: hidden;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    margin: 0 0 54px;
  `,
  CircleInner: styled.View`
    width: 90%;
    height: 90%;
    border-radius: ${props => `${props.size / 2}px`};
    overflow: hidden;
    align-items: center;
    justify-content: center;
    font-size: 20px;
  `,
  Text: styled.Text`
    text-align: center;
    font-size: 24px;
    color: #011e46;
    font-weight: 700;
    text-transform: capitalize;
  `,
  CircleInnerWrapper: styled.View`
    height: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    position: relative;
  `,
  ButtonAdd: styled.TouchableOpacity`
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -27px 0 0 -27px;
    padding: 18px;
    background: #fff;
    border-radius: 100px;
  `,
  ItemWrapper: styled.View`
    flex: 0 0 auto;
    margin: 6px 8px;
    padding: 6px 16px;
    border-radius: 24px;
    background: rgba(231, 238, 248, 0.5);
  `,
  Item: styled.Text`
    font-size: 14px;
    color: #011e46;
  `,
  ItemIcon: styled.Text`
    font-size: 42px;
    font-weight: 100;
  `,
};

export default S;
