import React from 'react';

import {useNavigation} from '~modules/navigation';
import {Icon} from '~modules/ui';

import {BorderTop, Button, Container, Text} from './styles';

export type Align = 'center' | 'left' | 'right' | 'between' | null;

type MainContainerProps = {
  align?: Align;
};

const MainFooter: React.FC<MainContainerProps> = ({align = null, ...rest}) => {
  const {navigate} = useNavigation();

  return (
    <Container align={align} {...rest}>
      <BorderTop />
      <Button onPress={() => navigate('Dashboard')}>
        <Icon color="#8e8e93" name="my-day" size={32} />
        <Text>Můj den</Text>
      </Button>
      <Button onPress={() => navigate('JourneyProgress')}>
        <Icon color="#8e8e93" name="road" size={32} />
        <Text>Cesta</Text>
      </Button>
      <Button onPress={() => navigate('Relaxation')}>
        <Icon color="#8e8e93" name="sun" size={32} />
        <Text>Relaxace</Text>
      </Button>
      <Button onPress={() => navigate('RoadTodos')}>
        <Icon color="#8e8e93" name="todo" size={32} />
        <Text>Úkoly</Text>
      </Button>
      <Button onPress={() => navigate('Signpost')}>
        <Icon
          color="#8e8e93"
          name="more-horizontal"
          size={32}
          style={{marginTop: 'auto', marginBottom: 'auto'}}
        />
        <Text>Více</Text>
      </Button>
    </Container>
  );
};

export default MainFooter;
