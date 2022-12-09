import React, {FC} from 'react';
import {
  ContainerWrap,
  ContainerInner,
  StyledModal,
  OutsideWrap,
} from './styles';
import ReactNative, {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import {Platform} from 'react-native';

type HalfOverlayProps = {
  close: () => void | undefined;
} & ReactNative.ModalProperties;

const HalfOverlay: FC<HalfOverlayProps> = ({children, ...rest}) => {
  return (
    <StyledModal animationType="slide" transparent={true} {...rest}>
      <TouchableWithoutFeedback onPress={() => rest.close()}>
        <OutsideWrap />
      </TouchableWithoutFeedback>

      <KeyboardAvoidingView
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'flex-end',
        }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ContainerInner>{children}</ContainerInner>
      </KeyboardAvoidingView>
    </StyledModal>
  );
};

export default HalfOverlay;
