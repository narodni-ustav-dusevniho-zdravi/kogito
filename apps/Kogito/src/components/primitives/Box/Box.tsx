import React from 'react';
import {Container, Text, TextWrapper, Image, Wrapper} from './styles';
import IconPlay from '../../../assets/icon-play.svg';
import DropShadow from 'react-native-drop-shadow';

type ContainerProps = {
  title?: string;
  img: number;
  isDisabled?: boolean;
  isMedia?: boolean;
  isBonus?: boolean;
  onPress?: () => void;
  maxHeight?: boolean;
};

const Box: React.FC<ContainerProps> = ({
  title,
  img,
  isDisabled = false,
  isMedia = false,
  isBonus = false,
  onPress = () => {},
  maxHeight = false,
}) => {
  return (
    <Container onPress={onPress}>
      <DropShadow
        style={{
          shadowColor: '#666F8B',
          shadowOpacity: 0.1,
          shadowOffset: {width: 0, height: 4},
          shadowRadius: 10,
        }}>
        <Wrapper isDisabled={isDisabled} isBonus={isBonus}>
          <Image source={img} style={maxHeight ? {height: 100} : {}} />
          <TextWrapper isBonus={isBonus}>
            <Text isBonus={isBonus}>{title}</Text>
            {isMedia && (
              <DropShadow
                style={{
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 3},
                  shadowOpacity: 0.16,
                  shadowRadius: 2,
                }}>
                <IconPlay style={{marginLeft: 4}} />
              </DropShadow>
            )}
          </TextWrapper>
        </Wrapper>
      </DropShadow>
    </Container>
  );
};

export default Box;
