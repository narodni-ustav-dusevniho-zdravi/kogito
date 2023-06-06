import styled from 'styled-components/native';

export const Wrapper = styled.View`
  width: 100%;
`;

export const Line = styled.View`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  margin-bottom: 10px;
`;

export const Left = styled.View`
  align-self: flex-end;
`;

export const PullRight = styled.View`
  margin-left: auto;
  align-self: flex-end;
`;

export const Spacer = styled.View`
  width: 100%;
  height: 1px;
  opacity: 0.15;
  background-color: #707070;
`;
