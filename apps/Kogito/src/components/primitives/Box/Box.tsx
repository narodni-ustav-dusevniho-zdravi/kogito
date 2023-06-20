import React from 'react';
import DropShadow from 'react-native-drop-shadow';

import {Icon, theme} from '~modules/ui';

import {Container, Image, Text, TextWrapper, Wrapper} from './styles';

type ContainerProps = {
  img: number;
  isBonus?: boolean;
  isDisabled?: boolean;
  isMedia?: boolean;
  maxHeight?: boolean;
  onPress?: () => void;
  title?: string;
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
        <Wrapper isBonus={isBonus} isDisabled={isDisabled}>
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
                <Icon
                  backgroundColor="white"
                  color={theme.colors.primary}
                  name="audio-play"
                  size={24}
                  style={{
                    height: 41,
                    width: 41,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                />
              </DropShadow>
            )}
          </TextWrapper>
        </Wrapper>
      </DropShadow>
    </Container>
  );
};

export default Box;
