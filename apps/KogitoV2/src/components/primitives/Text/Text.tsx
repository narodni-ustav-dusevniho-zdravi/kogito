import React from 'react';
import ReactNative, {TouchableOpacity} from 'react-native';
import S from './styles';
import IconPlus from '../../../assets/icon-plus.svg';

export type TextVariant =
  | 'bigHeader'
  | 'leftBigHeader'
  | 'header'
  | 'text'
  | 'questionNumber'
  | 'headerSub'
  | 'headerSub2'
  | 'textSmall'
  | 'text600'
  | 'textMini'
  | 'textCopy';
export type ColorVariant = 'gray' | 'main' | null;
export type Align = 'right' | 'center' | 'left' | null;
export type Space = 'main' | 'mainY' | null;

type TextProps = {
  textVariant?: TextVariant;
  colorVariant?: ColorVariant;
  align?: Align;
  add?: boolean;
  goTo?: string;
  space?: Space;
  onPressPlus?: () => void;
} & ReactNative.TextProps;

const Text: React.FC<TextProps> = ({
  textVariant = 'text',
  colorVariant = null,
  align = null,
  space = null,
  add = null,
  children,
  onPressPlus,
  ...rest
}) => {
  return (
    <S.Container space={space} align={align} {...rest}>
      <S.StyledText
        textVariant={textVariant}
        colorVariant={colorVariant}
        add={add}>
        {children}
      </S.StyledText>
      {onPressPlus && (
        <TouchableOpacity
          onPress={onPressPlus}
          style={{
            padding: 15,
          }}>
          <IconPlus />
        </TouchableOpacity>
      )}
    </S.Container>
  );
};

export default Text;
