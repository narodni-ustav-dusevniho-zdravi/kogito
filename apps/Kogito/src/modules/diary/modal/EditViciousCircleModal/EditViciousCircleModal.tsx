import React, {FC, useEffect, useState} from 'react';
import Modal from '../../../../components/container/Modal/Modal';
import Text from '../../../../components/primitives/Text';
import Button from '../../../../components/primitives/Button';
import TextInput from '../../../../components/form/TextInput';
import MainContainer from '../../../../components/container/MainContainer';
import {View} from 'react-native';

type EditViciousCircleModal = {
  title: string;
  initText: string;
  save: (value: string) => void;
  close: () => void;
  remove: () => void;
};

const EditViciousCircleModal: FC<EditViciousCircleModal> = ({
  title,
  initText,
  save,
  close,
  remove,
}) => {
  const [text, setText] = useState('');

  useEffect(() => {
    setText(initText);
  }, [initText]);

  return (
    <Modal close={() => close()}>
      <Text textVariant="bigHeader" align={'center'}>
        {title}
      </Text>
      <TextInput
        value={text}
        onChangeText={val => setText(val)}
        style={{
          marginVertical: 32,
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Button
          onPress={() => remove()}
          title="Zahodit"
          colorVariant={'transparentBlack'}
          type={'small'}
        />
        <Button onPress={() => save(text)} title="Uložit" type={'small'} />
      </View>
    </Modal>
  );
};

export default EditViciousCircleModal;
