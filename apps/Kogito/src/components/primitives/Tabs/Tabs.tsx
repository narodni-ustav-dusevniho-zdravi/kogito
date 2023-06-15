import React from 'react';
import type {ViewProps} from 'react-native';
import {ScrollView} from 'react-native';

import {useNavigation} from '../../../navigation';

import {Border, Container, Link, ScrollViewInner, Text} from './styles';

type ContainerProps = ViewProps & {
  isActive?: boolean;
};

const Tabs: React.FC<ContainerProps> = ({isActive = false, ...rest}) => {
  const {navigate} = useNavigation();
  return (
    <Container {...rest}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <ScrollViewInner>
          <Link onPress={() => navigate('Relaxation')}>
            <Text isActive={true}>Bojujte s depresí</Text>
            <Border isActive={true} />
          </Link>
          <Link onPress={() => navigate('RelaxationLocked')}>
            <Text isActive={isActive}>Jak se vyrovnat z úzkostí</Text>
            <Border isActive={isActive} />
          </Link>
        </ScrollViewInner>
      </ScrollView>
    </Container>
  );
};

export default Tabs;
