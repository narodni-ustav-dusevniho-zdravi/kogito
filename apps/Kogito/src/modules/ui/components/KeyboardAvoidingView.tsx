import React from 'react';
import type {KeyboardAvoidingViewProps} from 'react-native';
import {
  // eslint-disable-next-line no-restricted-imports
  KeyboardAvoidingView as RNKeyboardAvoidingView,
  Platform,
} from 'react-native';

export const KeyboardAvoidingView: React.FC<KeyboardAvoidingViewProps> =
  props => (
    <RNKeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      {...props}
    />
  );
