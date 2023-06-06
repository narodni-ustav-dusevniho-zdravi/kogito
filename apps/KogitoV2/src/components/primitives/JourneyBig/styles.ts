import styled from 'styled-components/native';

export const Title = styled.Text`
  color: #110a0b;
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
`;
export const Text = styled.Text`
  padding-top: 4px;
  padding-bottom: 12px;
  color: #110a0b;
  font-size: 16px;
  font-weight: 500;
`;
export const Container = styled.View<{background: string}>`
  overflow: hidden;
  position: relative;
  border-radius: 15px;
  background: #ffe7e7;
  background: ${props => props.background};
  margin-bottom: 10px;
`;
export const ContainerInner = styled.View`
  min-height: 237px;
  padding: 32px;
  align-items: flex-start;
`;
