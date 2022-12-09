import React, {FC} from 'react';
import styled from 'styled-components/native';

export const DividerView = styled.View`
  border-bottom-color: #666f8b;
  border-bottom-width: 1px;
  margin-bottom: 10px;
`;

const Divider: FC = () => {
  return <DividerView />;
};

export default Divider;
