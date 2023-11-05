import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {KeyboardAvoidingView} from './KeyboardAvoidingView';
import {Modal} from './Modal';
import {SafeArea} from './SafeArea';
import {ScrollView} from './Scrollables';

type Props = {
  children: React.ReactNode;
  onHide: () => void;
  title: string;
  visible: boolean;
};

const styles = StyleSheet.create({
  background: {backgroundColor: 'black', opacity: 0.7},
  modalContent: {flex: 1, justifyContent: 'center'},
  container: {backgroundColor: 'white', margin: 16, borderRadius: 8},
  contentContainer: {padding: 16},
  title: {alignSelf: 'center', fontWeight: 'bold', fontSize: 24},
});

export const Dialog: React.FC<Props> = ({visible, title, onHide, children}) => {
  if (!visible) return null;
  return (
    <Modal
      animationType="fade"
      style={styles.background}
      transparent
      visible
      onRequestClose={onHide}>
      <SafeArea.Top />
      <KeyboardAvoidingView
        pointerEvents="box-none"
        style={styles.modalContent}>
        <View>
          <ScrollView
            alwaysBounceVertical={false}
            contentContainerStyle={styles.contentContainer}
            enableAutomaticScroll={false}
            style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            {children}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
      <SafeArea.Bottom />
    </Modal>
  );
};
