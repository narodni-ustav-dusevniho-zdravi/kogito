import React from 'react';
import {Wrapper, Barrier, ProgressLine} from './styles';

export type ProgressBarVariants = 'small' | 'level' | null;

type ProgressBar = {
  min?: number;
  max?: number;
  progressBarVariants?: ProgressBarVariants;
  value: number;
};

const ProgressBar: React.FC<ProgressBar> = ({
  progressBarVariants = null,
  min = 0,
  max = 100,
  value,
}) => {
  return (
    <Wrapper>
      <Barrier progressBarVariants={progressBarVariants}>
        <ProgressLine
          progressBarVariants={progressBarVariants}
          value={(value - min) * (100 / (max - min))}
        />
      </Barrier>
    </Wrapper>
  );
};

export default ProgressBar;
