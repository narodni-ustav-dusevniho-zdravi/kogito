import React from 'react';
import S from './styles';
import IconPlay from '../../../assets/icon-play.svg';
import IconLocked from '../../../assets/icon-locked.svg';
import DropShadow from 'react-native-drop-shadow';

type ContainerProps = {
  title?: string;
  subTitle?: string | null;
  isLocked?: boolean;
  isPlayable?: boolean;
  isCompleted?: boolean;
  img?: object;
  onPress?: () => void;
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
        <S.Box isLocked={isLocked} isCompleted={isCompleted} img={!!img}>
          {img && <S.Image source={img} />}
          <S.Headline>
            <S.Title>{title}</S.Title>
            {subTitle !== null && <S.SubTitle>{subTitle}</S.SubTitle>}
          </S.Headline>
          <DropShadow
            style={{
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 3},
              shadowOpacity: 0.16,
              shadowRadius: 2,
            }}>
            {!isLocked && isPlayable && <IconPlay />}
            {isLocked && <IconLocked />}
          </DropShadow>
        </S.Box>
      </S.Wrapper>
    </S.Container>
  );
};

export default BoxMedia;
