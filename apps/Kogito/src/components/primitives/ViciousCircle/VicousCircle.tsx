import React from 'react';
import type {ViewProps} from 'react-native';
import {useWindowDimensions} from 'react-native';

import {Icon, theme} from '~modules/ui';

import S from './styles';

type ViciousCircle = ViewProps & {
  items: string[];
  name: string;
  onPress: () => void;
  onPressCircle: () => void;
  onPressItem: (index?: number, text?: string) => void;
};

const ViciousCircle: React.FC<ViciousCircle> = ({
  name,
  items,
  onPress,
  onPressCircle,
  onPressItem,
  ...rest
}) => {
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const size = (windowWidth > windowHeight ? windowHeight : windowWidth) * 0.8;

  return (
    <S.Container
      disabled={items.length === 0}
      size={size}
      onPress={onPressCircle}
      {...rest}>
      <S.Circle size={size}>
        <S.CircleInnerWrapper>
          {items.map((item, index) => (
            <S.ItemWrapper key={item}>
              <S.Item onPress={() => onPressItem(index, item)}>{item}</S.Item>
            </S.ItemWrapper>
          ))}
          <S.ButtonAdd onPress={onPress}>
            <Icon color={theme.colors.primary} name="plus" size={32} />
          </S.ButtonAdd>
        </S.CircleInnerWrapper>
      </S.Circle>
      <S.Text>{name}</S.Text>
    </S.Container>
  );
};

export default ViciousCircle;
