import React, {useCallback, useEffect, useState} from 'react';
import moment from 'moment';

import {logEvent} from '~modules/analytics';
import type {AppScreen} from '~modules/navigation';
import {useSaveOnClose} from '~modules/navigation';
import {ScreenContainer} from '~modules/ui';

import TextArea from '../components/form/TextArea';
import Text from '../components/primitives/Text';
import {useDiaryEntry} from '../diary/useDiaryEntry';
import eventListener from '../helpers/eventListener';

const DiaryEditScreen: AppScreen<'DiaryEdit'> = ({route}) => {
  const [id, setId] = useState<string | null>(null);
  const [content, setContent] = useState<string>('');
  const {diaryEntry, saveDiaryEntry} = useDiaryEntry(id);

  const handleSave = useCallback(async () => {
    if (!content) return;
    const result = await saveDiaryEntry({variables: {input: {id, content}}});

    if (id === null) {
      logEvent('Journal Entry Added');
      eventListener.fireEvent('refetch-user-diary');
    }
    setId(result.data?.editDiaryEntry?.id ?? null);
  }, [content, id, saveDiaryEntry]);

  useEffect(() => {
    if (diaryEntry) {
      setContent(diaryEntry.content);
    } else {
      setContent('');
    }
  }, [diaryEntry]);

  useEffect(() => {
    setId(route.params.id);
    setContent('');
  }, [route.params.id]);

  useSaveOnClose(handleSave);

  return (
    <ScreenContainer
      contentContainerStyle={{paddingHorizontal: 16}}
      title="Deník"
      type="static">
      {diaryEntry && (
        <Text textVariant="textMini">
          {moment(diaryEntry.date).format('Do MMMM YYYY, HH:mm')}
        </Text>
      )}
      <TextArea
        scrollEnabled={false}
        style={{paddingTop: 48, paddingBottom: 48}}
        value={content}
        onChangeText={text => setContent(text)}
      />
    </ScreenContainer>
  );
};

export default DiaryEditScreen;
