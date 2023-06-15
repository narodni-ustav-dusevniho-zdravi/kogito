import React from 'react';
import type {ViewProps} from 'react-native';

import {useNavigation} from '~modules/navigation';

import S from './styles';

export type activeVariants = 'phase' | 'tools' | 'relaxation' | 'todos' | null;

type ContainerProps = {
  active?: activeVariants;
} & ViewProps;

const RoadNavigation: React.FC<ContainerProps> = ({active = null, ...rest}) => {
  const {navigate} = useNavigation();

  return (
    <S.Container {...rest}>
      <S.Wrapper>
        <S.Button
          active={active === 'phase'}
          onPress={() => navigate('RoadPhase')}>
          <S.Text active={active === 'phase'}>Etapa</S.Text>
        </S.Button>
        <S.Button
          active={active === 'tools'}
          onPress={() => navigate('RoadTools')}>
          <S.Text active={active === 'tools'}>Nástroje</S.Text>
        </S.Button>
        <S.Button
          active={active === 'relaxation'}
          onPress={() => navigate('RoadRelaxation')}>
          <S.Text active={active === 'relaxation'}>Relaxace</S.Text>
        </S.Button>
        <S.Button
          active={active === 'todos'}
          onPress={() => navigate('RoadTodos')}>
          <S.Text active={active === 'todos'}>Úkoly</S.Text>
        </S.Button>
      </S.Wrapper>
    </S.Container>
  );
};

export default RoadNavigation;
