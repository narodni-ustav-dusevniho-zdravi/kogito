import React from 'react';
import type {ModalProps} from 'react-native';
// eslint-disable-next-line no-restricted-imports
import {Modal as RNModal, Pressable, StyleSheet} from 'react-native';

export const Modal: React.FC<ModalProps & {onRequestClose?: () => void}> = ({
  children,
  onRequestClose,
  ...props
}) => {
  return (
    <RNModal {...props}>
      <Pressable
        style={StyleSheet.absoluteFillObject}
        onPress={() => {
          onRequestClose?.();
        }}>
        {children}
      </Pressable>
    </RNModal>
  );
};
