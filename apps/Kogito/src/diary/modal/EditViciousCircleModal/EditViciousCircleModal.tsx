import React, {useEffect, useState} from 'react';
import {View} from 'react-native';

import {Dialog} from '~modules/ui';

import TextInput from '../../../components/form/TextInput';
import Button from '../../../components/primitives/Button';

type EditViciousCircleModal = {
  close: () => void;
  initText: string;
  remove: () => void;
  save: (value: string) => void;
  title: string;
};

const EditViciousCircleModal: React.FC<EditViciousCircleModal> = ({
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
    <Dialog title={title} visible onHide={close}>
      <TextInput
        style={{
          marginVertical: 32,
        }}
        value={text}
        onChangeText={val => setText(val)}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Button
          colorVariant="transparentBlack"
          disabled={!text}
          title="Zahodit"
          type="small"
          onPress={() => remove()}
        />
        <Button
          disabled={!text}
          title="Uložit"
          type="small"
          onPress={() => save(text)}
        />
      </View>
    </Dialog>
  );
};

export default EditViciousCircleModal;
