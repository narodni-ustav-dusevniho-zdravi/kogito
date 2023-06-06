import styled from 'styled-components/native';
import {variant} from 'styled-system';

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
    ${variant({
      prop: 'colorBackground',
      variants: {
        happy: {
          opacity: 1,
          background: '#ffe382',
        },
      },
    })}
  `,

  ContainerWrap: styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  `,

  ContainerInner: styled.View`
    background: white;
    width: 90%;
    min-height: 200px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    padding: 34px 12px 16px;
    ${variant({
      prop: 'type',
      variants: {
        full: {
          padding: 0,
          background: 'transparent',
          boxShadow: 'none',
          borderRadius: 0,
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
    })}
  `,
};

export default S;
