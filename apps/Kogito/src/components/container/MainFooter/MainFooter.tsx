import React, {FC} from 'react';
import {Container, BorderTop, Button, Text} from './styles';
import IconMyDay from '../../../assets/icon-my-day.svg';
import IconRoad from '../../../assets/icon-road.svg';
import IconSun from '../../../assets/icon-sun.svg';
import IconTodo from '../../../assets/icon-todo.svg';
import IconDots from '../../../assets/icon-dots.svg';
import {useNavigation} from '@react-navigation/native';

export type Align = 'center' | 'left' | 'right' | 'between' | null;

type MainContainerProps = {
  align?: Align;
};

const MainFooter: FC<MainContainerProps> = ({align = null, ...rest}) => {
  const navigation = useNavigation();

  return (
    <Container align={align} {...rest}>
      <BorderTop />
      <Button onPress={() => navigation.navigate('Dashboard')}>
        <IconMyDay style={{color: '#8e8e93'}} />
        <Text>Můj den</Text>
      </Button>
      <Button onPress={() => navigation.navigate('JourneyProgress')}>
        <IconRoad style={{color: '#8e8e93'}} />
        <Text>Cesta</Text>
      </Button>
      <Button onPress={() => navigation.navigate('Relaxation')}>
        <IconSun style={{color: '#8e8e93'}} />
        <Text>Relaxace</Text>
      </Button>
      <Button onPress={() => navigation.navigate('RoadTodos')}>
        <IconTodo style={{color: '#8e8e93'}} />
        <Text>Úkoly</Text>
      </Button>
      <Button onPress={() => navigation.navigate('Signpost')}>
        <IconDots
          style={{color: '#8e8e93', marginTop: 'auto', marginBottom: 'auto'}}
        />
        <Text>Více</Text>
      </Button>
    </Container>
  );
};

export default MainFooter;
