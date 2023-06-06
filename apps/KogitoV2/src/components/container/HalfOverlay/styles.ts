import styled from 'styled-components/native';

export const StyledModal = styled.Modal`
  margin: 0;
  justify-content: flex-end;
`;

export const OutsideWrap = styled.View`
  flex: 1;
`;

export const ContainerWrap = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-end;
`;

export const ContainerInner = styled.View`
  padding-left: 42px;
  padding-right: 42px;
  padding-top: 35px;
  background: white;
  width: 100%;
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
  box-shadow: 0px -30px 90px rgba(188, 88, 88, 0.39);
`;
