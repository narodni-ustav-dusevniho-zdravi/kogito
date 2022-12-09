import React, {FC, useEffect} from 'react';
import S from './styles';
import ReactNative, {BackHandler, TouchableWithoutFeedback} from 'react-native';

type HalfOverlayProps = {
  close: () => void | undefined;
} & ReactNative.ModalProperties;

const Modal: FC<HalfOverlayProps> = ({children, ...rest}) => {
  return (
    <S.Modal animationType="fade" transparent={true} {...rest}>
      <TouchableWithoutFeedback onPress={() => rest.close()}>
        <S.OpacityBackground />
      </TouchableWithoutFeedback>
      <S.ContainerWrap>
        <S.ContainerInner>{children}</S.ContainerInner>
      </S.ContainerWrap>
    </S.Modal>
  );
};

export default Modal;
