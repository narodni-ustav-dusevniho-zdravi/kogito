import React from 'react';
import {Container, ContainerInner, Title, Text} from './styles';
import Button from '../Button';
import Woman from '../../../assets/woman-2.svg';
import {View} from 'react-native';
import Moment from 'react-moment';

type BoxBigProps = {
  title: string;
  buttonText: string;
  date: Date;
  onPress?: () => void;
};

const BoxBig: React.FC<BoxBigProps> = ({
  title,
  buttonText,
  date,
  onPress = () => {},
  ...rest
}) => {
  return (
    <Container {...rest}>
      <Woman
        style={{
          position: 'absolute',
          bottom: -32,
          right: -24,
        }}
      />
      <ContainerInner>
        <Title>{title}</Title>
        <Moment element={Text}>{date}</Moment>
        <View>
          <Button
            onPress={onPress}
            title={buttonText}
            colorVariant={'red'}
            type={'small'}
          />
        </View>
      </ContainerInner>
    </Container>
  );
};

export default BoxBig;
