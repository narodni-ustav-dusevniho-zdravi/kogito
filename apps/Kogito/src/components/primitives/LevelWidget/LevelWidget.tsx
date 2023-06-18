import React, {FC} from 'react';
import Check from '../../../assets/check.svg';
import S from './styles';
import ProgressBar from '../ProgressBar';

export type LevelWidgetVariant = 'done' | 'inProgress' | 'locked';

type ContainerProps = {
  name: string;
  state?: LevelWidgetVariant;
  onPress?: () => void;
  progress: number;
  maxProgress?: number;
};

const LevelWidget: FC<ContainerProps> = ({
  name,
  state = 'locked',
  onPress = () => {},
  progress,
  maxProgress = 100,
}) => {
  console.log({progress});

  return (
    <S.Container disabled={state === 'locked'} onPress={onPress}>
      <S.Wrapper state={state}>
        <S.Text>{name}</S.Text>
        {state === 'done' && <Check />}
        {state === 'inProgress' && (
          <ProgressBar
            progressBarVariants={'level'}
            value={progress}
            max={maxProgress}
          />
        )}
      </S.Wrapper>
    </S.Container>
  );
};

export default LevelWidget;
