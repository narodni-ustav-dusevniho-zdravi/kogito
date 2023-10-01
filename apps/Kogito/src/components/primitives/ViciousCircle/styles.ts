import styled from 'styled-components/native';

type Props = {size: number};

const S = {
  Container: styled.TouchableOpacity<Props>`
    margin: 0 8px;
    width: ${(props: Props) => `${props.size}px`};
  `,
  Circle: styled.View<Props>`
    width: ${(props: Props) => `${props.size}px`};
    height: ${(props: Props) => `${props.size}px`};
    border-radius: ${(props: Props) => `${props.size / 2}px`};
    overflow: hidden;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    margin: 0 0 54px;
    border-width: 20px;
    border-color: rgba(231, 231, 231, 0.5);
    background: white;
    overflow: visible;
  `,
  Text: styled.Text`
    text-align: center;
    font-size: 24px;
    color: #011e46;
    font-weight: 700;
    text-transform: capitalize;
  `,
  CircleInnerWrapper: styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    position: relative;
  `,
  ButtonAdd: styled.TouchableOpacity`
    position: absolute;
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
    background: rgba(231, 238, 248, 1);
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
