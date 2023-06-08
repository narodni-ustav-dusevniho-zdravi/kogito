import React from 'react';
import S from './styles';
import {TouchableWithoutFeedback} from 'react-native';

type DetailViciousCircleModal = {
  items: string[];
  close: () => void;
  onPressItem: (index?: number, text?: string) => void;
};

const DetailViciousCircleModal: React.FC<DetailViciousCircleModal> = ({
  items,
  close,
  onPressItem,
}) => {
  console.log({items});
  return (
    <S.Modal animationType="fade" transparent={true} onRequestClose={close}>
      <TouchableWithoutFeedback onPress={() => close()}>
        <S.OpacityBackground />
      </TouchableWithoutFeedback>
      <S.ContainerWrap>
        <S.ContainerInner>
          <S.ItemContainer>
            {items.map((item, index) => (
              <S.ItemWrapper>
                <S.Item onPress={() => onPressItem(index, item)}>{item}</S.Item>
              </S.ItemWrapper>
            ))}
          </S.ItemContainer>
        </S.ContainerInner>
      </S.ContainerWrap>
    </S.Modal>
  );
};

export default DetailViciousCircleModal;
