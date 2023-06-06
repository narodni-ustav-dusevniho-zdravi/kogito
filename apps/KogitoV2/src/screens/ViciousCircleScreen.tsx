import React, {useEffect, useMemo} from 'react';

import {SafeAreaView, ScrollView} from 'react-native';
import MainContainerWrapper from '../components/container/MainContainerWrapper/MainContainerWrapper';
import MainHeader from '../components/container/MainHeader/MainHeader';
import Text from '../components/primitives/Text';
import {useViciousCircleList} from '../modules/diary/useViciousCircleList';
import {capitalize, groupBy} from 'lodash';
import moment from 'moment';
import DayInfoBox from '../components/primitives/DayInfoBox';

import {useTrackSchedule} from '../modules/content/useTrackSchedule';
import type {AppScreen} from '../navigation/Navigation';

const ViciousCircleScreen: AppScreen<'ViciousCircle'> = ({navigation}) => {
  const {records, refetch} = useViciousCircleList();
  const {} = useTrackSchedule();

  const groupedRecords = useMemo(() => {
    const items = records.map(item => {
      const date = new Date(item.date);
      return {
        ...item,
        key: `${date.getFullYear()}_${date.getMonth()}`,
      };
    });

    const grouped = groupBy(items, 'key');

    return Object.keys(grouped).map(index => {
      const date = moment(grouped[index][0].date);

      return {
        title: capitalize(date.format('MMMM YYYY')),
        items: grouped[index],
      };
    });
  }, [records]);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <SafeAreaView>
      <MainContainerWrapper>
        <MainHeader />
        <ScrollView>
          <Text
            textVariant={'bigHeader'}
            onPressPlus={() =>
              navigation.navigate('ViciousCircleEdit', {id: null})
            }
            space={'main'}>
            Kruhy
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
                console.log(entry.date);
                const date = new Date(entry.date);
                return (
                  <DayInfoBox
                    date={date}
                    title={'Title'}
                    onPress={() =>
                      navigation.navigate('ViciousCircleEdit', {id: entry.id})
                    }
                  />
                );
              })}
            </>
          ))}
        </ScrollView>
      </MainContainerWrapper>
    </SafeAreaView>
  );
};

export default ViciousCircleScreen;
