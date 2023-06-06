import React, {useCallback, useMemo} from 'react';
import {SafeAreaView, ScrollView, Alert} from 'react-native';
import MainContainer from '../components/container/MainContainer/MainContainer';
import MainHeader from '../components/container/MainHeader/MainHeader';
import MainContainerWrapper from '../components/container/MainContainerWrapper';
import Text from '../components/primitives/Text';
import DayInfoBox from '../components/primitives/DayInfoBox';
import {useDiaryList} from '../modules/diary/useDiaryList';
import {groupBy, capitalize} from 'lodash';
import moment from 'moment';
import {useFocusEffect} from '@react-navigation/native';
import {useDiaryEntry} from '../modules/diary/useDiaryEntry';
import useMixPanelTracking from '../tracking/useMixPanelTracking';
import type {AppScreen} from '../navigation/Navigation';

const DiaryScreen: AppScreen<'Diary'> = ({navigation}) => {
  const {records, refetch} = useDiaryList();
  const {removeDiaryEntry} = useDiaryEntry(null);
  const {trackJournalOpened} = useMixPanelTracking();

  const groupedRecords = useMemo(() => {
    // preparing grouping parameter
    const items = records.map(item => {
      const date = new Date(item.date);
      return {
        ...item,
        key: `${date.getFullYear()}_${date.getMonth()}`,
      };
    });

    const grouped = groupBy(items, 'key');

    // preparing array for printing - title and items
    return Object.keys(grouped).map(index => {
      const date = moment(grouped[index][0].date);
      return {
        title: capitalize(date.format('MMMM YYYY')),
        items: grouped[index],
      };
    });
  }, [records]);

  const handleLongPress = (id: string) => {
    Alert.alert('Smazat', 'Doopravdy chcete smazat záznam?', [
      {
        text: 'Ne',
        style: 'cancel',
      },
      {
        text: 'Ano',
        onPress: async () => {
          await removeDiaryEntry({
            variables: {
              id,
            },
          });
          refetch();
        },
      },
    ]);
  };

  useFocusEffect(
    useCallback(() => {
      trackJournalOpened();
      console.log('REFETCH');
      refetch();
    }, [refetch]),
  );

  return (
    <SafeAreaView>
      <MainContainerWrapper>
        <MainHeader />
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <MainContainer page={'dashboard'} color={'white'}>
            <Text
              textVariant={'bigHeader'}
              onPressPlus={() => navigation.navigate('DiaryEdit', {id: null})}
              space={'main'}>
              Deník
            </Text>

            {groupedRecords.map(item => (
              <>
                <Text
                  textVariant={'headerSub2'}
                  colorVariant={'gray'}
                  space={'main'}>
                  {item.title}
                </Text>
                {item.items.map(entry => {
                  const date = new Date(entry.date);
                  return (
                    <DayInfoBox
                      date={date}
                      title={entry.previewText}
                      onPress={() =>
                        navigation.navigate('DiaryEdit', {id: entry.id})
                      }
                      onLongPress={() => handleLongPress(entry.id)}
                    />
                  );
                })}
              </>
            ))}
          </MainContainer>
        </ScrollView>
      </MainContainerWrapper>
    </SafeAreaView>
  );
};

export default DiaryScreen;
