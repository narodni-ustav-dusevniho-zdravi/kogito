import React from 'react';
import DropShadow from 'react-native-drop-shadow';

import {Icon, theme} from '~modules/ui';

import S from './styles';

type ContainerProps = {
  img?: object;
  isCompleted?: boolean;
  isLocked?: boolean;
  isPlayable?: boolean;
  onPress?: () => void;
  subTitle?: string | null;
  title?: string;
};

const BoxMedia: React.FC<ContainerProps> = ({
  title,
  subTitle = null,
  isLocked = false,
  isPlayable = false,
  isCompleted = false,
  img = null,
  onPress = () => {},
}) => {
  const handlePress = () => {
    if (!isLocked) {
      onPress();
    }
  };
  return (
    <S.Container disabled={isLocked} onPress={handlePress}>
      <S.Wrapper>
        <S.Box img={!!img} isCompleted={isCompleted} isLocked={isLocked}>
          {img && <S.Image source={img} />}
          <S.Headline>
            <S.Title>{title}</S.Title>
            {subTitle !== null && <S.SubTitle>{subTitle}</S.SubTitle>}
          </S.Headline>
          {(isLocked || isPlayable) && (
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
                name={isLocked ? 'lock' : 'audio-play'}
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
        </S.Box>
      </S.Wrapper>
    </S.Container>
  );
};

export default BoxMedia;
