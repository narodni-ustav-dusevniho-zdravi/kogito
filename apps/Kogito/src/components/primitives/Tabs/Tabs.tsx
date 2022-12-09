import React, {FC} from 'react';
import {Container, ScrollViewInner, Link, Text, Border} from './styles';
import {ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

type ContainerProps = {
  isActive?: boolean;
};

const Tabs: FC<ContainerProps> = ({isActive = false, ...rest}) => {
  const navigation = useNavigation();
  return (
    <Container {...rest}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <ScrollViewInner>
          <Link onPress={() => navigation.navigate('Relaxation')}>
            <Text isActive={true}>Bojujte s depresí</Text>
            <Border isActive={true} />
          </Link>
          <Link
            isActive={isActive}
            onPress={() => navigation.navigate('RelaxationLocked')}>
            <Text isActive={isActive}>Jak se vyrovnat z úzkostí</Text>
            <Border isActive={isActive} />
          </Link>
        </ScrollViewInner>
      </ScrollView>
    </Container>
  );
};

export default Tabs;
