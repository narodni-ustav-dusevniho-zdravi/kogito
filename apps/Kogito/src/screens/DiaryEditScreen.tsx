import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import moment from 'moment';

import {logEvent} from '~modules/analytics';
import type {AppScreen} from '~modules/navigation';
import {useNavigationListener} from '~modules/navigation';

import MainContainer from '../components/container/MainContainer/MainContainer';
import MainContainerWrapper from '../components/container/MainContainerWrapper';
import MainHeader from '../components/container/MainHeader/MainHeader';
import TextArea from '../components/form/TextArea';
import Text from '../components/primitives/Text';
import {useDiaryEntry} from '../diary/useDiaryEntry';
import eventListener from '../helpers/eventListener';

const DiaryEditScreen: AppScreen<'DiaryEdit'> = ({route}) => {
  const [id, setId] = useState<string | null>(null);
  const [content, setContent] = useState<string>('');
  const {diaryEntry, saveDiaryEntry} = useDiaryEntry(id);

  const handleSave = useCallback(async () => {
    if (content !== '') {
      try {
        const result = await saveDiaryEntry({
          variables: {
            input: {
              id,
              content,
            },
          },
        });

        if (id === null) {
          logEvent('Journal Entry Added');
          eventListener.fireEvent('refetch-user-diary');
        }

        setId(result.data?.editDiaryEntry?.id ?? null);
      } catch (e) {
        console.log(e, 'ee');
      }
    }

    return;
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

  useNavigationListener('beforeRemove', handleSave);

  return (
    <SafeAreaView>
      <MainContainerWrapper>
        <MainHeader beforeBackButton={handleSave} title="Deník" />
        <MainContainer color="white" page="sub">
          {diaryEntry && (
            <Text textVariant="textMini">
              {moment(diaryEntry.date).format('Do MMMM YYYY, HH:mm')}
            </Text>
          )}
          <TextArea
            style={{
              paddingTop: 48,
            }}
            value={content}
            onChangeText={text => setContent(text)}
          />
        </MainContainer>
      </MainContainerWrapper>
    </SafeAreaView>
  );
};

export default DiaryEditScreen;
