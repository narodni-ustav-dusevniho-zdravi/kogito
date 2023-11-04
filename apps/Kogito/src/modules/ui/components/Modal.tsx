import React from 'react';
import type {ModalProps} from 'react-native';
// eslint-disable-next-line no-restricted-imports
import {Modal as RNModal, Pressable, StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export const Modal: React.FC<ModalProps> = ({
  children,
  onRequestClose,
  style,
  ...props
}) => {
  return (
    <RNModal {...props} onRequestClose={onRequestClose}>
      <SafeAreaProvider>
        <Pressable
          style={[StyleSheet.absoluteFillObject, style]}
          onPress={onRequestClose}
        />
        {children}
      </SafeAreaProvider>
    </RNModal>
  );
};
