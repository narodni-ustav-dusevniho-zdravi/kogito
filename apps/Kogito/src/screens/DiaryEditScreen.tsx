import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import MainContainer from '../components/container/MainContainer/MainContainer';
import MainHeader from '../components/container/MainHeader/MainHeader';
import MainContainerWrapper from '../components/container/MainContainerWrapper';
import Text from '../components/primitives/Text';
import TextArea from '../components/form/TextArea';
import {useDiaryEntry} from '../modules/diary/useDiaryEntry';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/Navigation';
import useEventListener from '../helpers/useEventListener';
import moment from 'moment';
import useMixPanelTracking from '../tracking/useMixPanelTracking';
import type {AppScreen} from '../navigation/Navigation';
import {useNavigationListener} from '../navigation/useNavigationListener';

export type AudioScreenProps = RouteProp<RootStackParamList, 'DiaryEdit'>;

const DiaryEditScreen: AppScreen<'DiaryEdit'> = () => {
  const route = useRoute<AudioScreenProps>();
  const [id, setId] = useState<string | null>(null);
  const [content, setContent] = useState<string>('');
  const {fireEvent} = useEventListener();
  const {diaryEntry, saveDiaryEntry} = useDiaryEntry(id);
  const {trackJournalEntryOpened, trackJournalEntryAdded} =
    useMixPanelTracking();

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
          trackJournalEntryAdded();
          fireEvent('refetch-user-diary');
        }

        setId(result?.data?.editDiaryEntry?.id ?? null);
      } catch (e) {
        console.log(e, 'ee');
      }
    }

    return;
  }, [content, fireEvent, id, saveDiaryEntry, trackJournalEntryAdded]);

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
    trackJournalEntryOpened();
  }, [route.params.id]);

  useNavigationListener('beforeRemove', () => handleSave());

  return (
    <SafeAreaView>
      <MainContainerWrapper>
        <MainHeader title="Deník" beforeBackButton={handleSave} />
        <MainContainer page={'sub'} color={'white'}>
          {diaryEntry && (
            <Text textVariant={'textMini'}>
              {moment(diaryEntry.date).format('Do MMMM YYYY, HH:mm')}
            </Text>
          )}
          <TextArea
            value={content}
            style={{
              paddingTop: 48,
            }}
            onChangeText={text => setContent(text)}
          />
        </MainContainer>
      </MainContainerWrapper>
    </SafeAreaView>
  );
};

export default DiaryEditScreen;
