import React from 'react';
import {Container, ContainerInner, Title} from './styles';
import Button from '../Button';
import {View} from 'react-native';
import HeroAnxiety from '../../../assets/anxiety/hero.svg';
import HeroDepression from '../../../assets/depression/hero.svg';

export type ImageVariant = 'depression' | 'anxiety';
type BoxBigProps = {
  title: string;
  onPress?: () => void;
  variant: ImageVariant;
};

const JourneyBig: React.FC<BoxBigProps> = ({
  title,
  onPress = () => {},
  variant,
}) => {
  return (
    <Container background={variant === 'depression' ? '#FFCE8F' : '#BF9BE8'}>
      {variant === 'depression' && (
        <HeroDepression
          style={{
            position: 'absolute',
            bottom: -30,
            right: 5,
          }}
        />
      )}
      {variant === 'anxiety' && (
        <HeroAnxiety
          style={{
            position: 'absolute',
            bottom: -100,
            right: 5,
          }}
        />
      )}
      <ContainerInner>
        <Title>{title}</Title>
        <View>
          <Button
            onPress={onPress}
            title={'Zvolit'}
            colorVariant={'red'}
            type={'small'}
          />
        </View>
      </ContainerInner>
    </Container>
  );
};

export default JourneyBig;
