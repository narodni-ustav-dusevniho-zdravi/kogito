import styled from 'styled-components/native';
import {variant} from 'styled-system';

type ActiveState = {
  active: boolean;
};

const S = {
  WrapperContainer: styled.View`
    background-color: #ffffff;
    padding: 16px 24px 24px;
    flex: 1 1 auto;
    min-height: 300px;
  `,
  Wrapper: styled.View``,
  Navigation: {
    Container: styled.View`
      padding: 0 0 16px;
    `,
    Wrapper: styled.View`
      flex-direction: row;
      justify-content: space-between;
    `,
    Button: styled.TouchableOpacity<ActiveState>`
      border-radius: 5px;
      padding: 8px 12px;
      ${variant({
        prop: 'active',
        variants: {
          true: {
            backgroundColor: 'rgba(202,66,51,0.1)',
          },
        },
      })}
    `,
    Text: styled.Text<ActiveState>`
      color: #1c1c1c;
      font-size: 14px;
      font-weight: 500;
      ${variant({
        prop: 'active',
        variants: {
          true: {
            color: '#ca4233',
            fontWeight: 600,
          },
        },
      })}
    `,
  },
  LinkItem: {
    Link: styled.TouchableOpacity<{active: boolean}>`
      position: relative;
      padding: 8px 15px;
    `,
    Text: styled.Text<ActiveState>`
      opacity: 0.5;
      color: #1c1c1c;
      font-size: 18px;
      font-weight: 500;
      ${variant({
        prop: 'active',
        variants: {
          true: {
            opacity: '1',
            fontWeight: 700,
          },
        },
      })};
    `,
    Border: styled.View<ActiveState>`
      position: relative;
      opacity: 0;
      height: 3px;
      background: #ca4233;
      flex: 1 1 auto;
      margin-top: 8px;
      ${variant({
        prop: 'active',
        variants: {
          true: {
            opacity: '1',
          },
        },
      })};
    `,
  },
};

export default S;
