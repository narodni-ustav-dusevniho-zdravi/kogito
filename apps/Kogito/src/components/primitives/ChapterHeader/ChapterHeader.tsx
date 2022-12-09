import React, {FC, ReactElement} from 'react';
import {Wrapper, PullRight, Left, Line, Spacer} from './styles';

type ChapterHeader = {
  left: ReactElement;
  right: ReactElement;
};

const ChapterHeader: FC<ChapterHeader> = ({left, right}) => {
  return (
    <Wrapper>
      <Line>
        <Left>{left}</Left>
        <PullRight>{right}</PullRight>
      </Line>
      <Spacer />
    </Wrapper>
  );
};

export default ChapterHeader;
