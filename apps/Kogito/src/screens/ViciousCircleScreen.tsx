import React, {useMemo} from 'react';
import {SafeAreaView} from 'react-native';
import {capitalize, groupBy} from 'lodash';
import moment from 'moment';

import type {AppScreen} from '~modules/navigation';
import {useOnScreenFocus} from '~modules/navigation';
import {ScrollView} from '~modules/ui';

import MainContainerWrapper from '../components/container/MainContainerWrapper/MainContainerWrapper';
import MainHeader from '../components/container/MainHeader/MainHeader';
import DayInfoBox from '../components/primitives/DayInfoBox';
import Text from '../components/primitives/Text';
import {useTrackSchedule} from '../content/useTrackSchedule';
import {useViciousCircleList} from '../diary/useViciousCircleList';

const ViciousCircleScreen: AppScreen<'ViciousCircle'> = ({
  navigation: {navigate},
}) => {
  const {records, refetch} = useViciousCircleList();
  // eslint-disable-next-line no-empty-pattern
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
      const date = moment(grouped[index]?.[0]?.date);

      return {
        title: capitalize(date.format('MMMM YYYY')),
        items: grouped[index],
      };
    });
  }, [records]);

  useOnScreenFocus(() => refetch());

  return (
    <SafeAreaView>
      <MainContainerWrapper>
        <MainHeader />
        <ScrollView>
          <Text
            space="main"
            textVariant="bigHeader"
            onPressPlus={() => navigate('ViciousCircleEdit', {id: null})}>
            Kruhy
          </Text>

          {groupedRecords.map(item => (
            <React.Fragment key={item.title}>
              <Text colorVariant="gray" space="main" textVariant="headerSub2">
                {item.title}
              </Text>
              {item.items?.map(entry => {
                console.log(entry.date);
                const date = new Date(entry.date);
                return (
                  <DayInfoBox
                    key={entry.id}
                    date={date}
                    title="Title"
                    onPress={() =>
                      navigate('ViciousCircleEdit', {id: entry.id})
                    }
                  />
                );
              })}
            </React.Fragment>
          ))}
        </ScrollView>
      </MainContainerWrapper>
    </SafeAreaView>
  );
};

export default ViciousCircleScreen;
