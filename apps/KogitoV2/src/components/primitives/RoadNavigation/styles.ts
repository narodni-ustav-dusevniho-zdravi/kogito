import styled from 'styled-components/native';
import {variant} from 'styled-system';

type ActiveState = {
  active: boolean;
};

const S = {
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
};

export default S;
