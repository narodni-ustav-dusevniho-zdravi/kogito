import React, {useEffect, useMemo} from 'react';
import {Alert, Image, SafeAreaView, View} from 'react-native';
import {gql, useMutation} from '@apollo/client';
import {groupBy} from 'lodash';
import moment from 'moment';

import EmoticonHappy from '~assets/emotions/happy.png';
import EmoticonOkay from '~assets/emotions/okay.png';
import EmoticonSad from '~assets/emotions/sad.png';
import EmoticonSatisfied from '~assets/emotions/satisfied.png';
import EmoticonVerysad from '~assets/emotions/verysad.png';
import type {
  Mood,
  MoodCount,
  RemoveMoodRecordMutation,
  RemoveMoodRecordMutationVariables,
} from '~gql/graphql';
import type {AppScreen} from '~modules/navigation';
import {useOnScreenFocus} from '~modules/navigation';
import {ScrollView} from '~modules/ui';

import MainContainer from '../components/container/MainContainer/MainContainer';
import MainContainerWrapper from '../components/container/MainContainerWrapper';
import MainHeader from '../components/container/MainHeader/MainHeader';
import ButtonIcon from '../components/primitives/ButtonIcon';
import MoodRecord from '../components/primitives/MoodRecord/MoodRecord';
import Text from '../components/primitives/Text';
import {useMoodsList} from '../diary/useMoodsList';
import eventListener from '../helpers/eventListener';

const prepareCount = (items: MoodCount[], mood: Mood): number => {
  return items.find(item => item.mood === mood)?.count || 0;
};

const removeMoodRecordMutation = gql`
  mutation removeMoodRecord($id: ID!) {
    removeMoodRecord(id: $id)
  }
`;

// eslint-disable-next-line max-lines-per-function
const MoodListScreen: AppScreen<'MoodList'> = () => {
  const {records, moodsCount, refetch} = useMoodsList();
  const [removeMoodRecord] = useMutation<
    RemoveMoodRecordMutation,
    RemoveMoodRecordMutationVariables
  >(removeMoodRecordMutation);

  const groupedRecords = useMemo(() => {
    const items = records.map(item => {
      const date = new Date(item.date);

      return {
        ...item,
        key: `${date.getFullYear()}_${date.getMonth()}_${date.getDay()}`,
      };
    });

    const grouped = groupBy(items, 'key');

    return Object.keys(grouped).map(index => {
      const date = moment(grouped[index]?.[0]?.date);

      return {
        title: date.format('Do MMMM YYYY'),
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
          await removeMoodRecord({
            variables: {
              id,
            },
          });
          refetch();
        },
      },
    ]);
  };

  const pressAdd = () => {
    eventListener.fireEvent('open-log-mood');
  };

  useEffect(() => {
    const handleRefetch = () => {
      refetch();
    };

    eventListener.addListener('refetch-mood-list', handleRefetch);

    return () => {
      eventListener.removeListener(handleRefetch);
    };
  }, [refetch]);

  useOnScreenFocus(() => refetch());

  return (
    <SafeAreaView>
      <MainContainerWrapper>
        <MainHeader />
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <MainContainer color="white" page="subWithoutFooter">
            <Text textVariant="bigHeader" onPressPlus={pressAdd}>
              Hodnocení nálady
            </Text>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                marginVertical: 24,
              }}>
              <ButtonIcon disabled={true}>
                <Image source={EmoticonSatisfied} />
                <Text colorVariant="gray" textVariant="text600">
                  {prepareCount(moodsCount, 'SATISFIED')}
                </Text>
              </ButtonIcon>

              <ButtonIcon disabled={true}>
                <Image source={EmoticonHappy} />
                <Text colorVariant="gray" textVariant="text600">
                  {prepareCount(moodsCount, 'HAPPY')}
                </Text>
              </ButtonIcon>

              <ButtonIcon disabled={true}>
                <Image source={EmoticonOkay} />
                <Text colorVariant="gray" textVariant="text600">
                  {prepareCount(moodsCount, 'OKAY')}
                </Text>
              </ButtonIcon>

              <ButtonIcon disabled={true}>
                <Image source={EmoticonSad} />
                <Text colorVariant="gray" textVariant="text600">
                  {prepareCount(moodsCount, 'SAD')}
                </Text>
              </ButtonIcon>

              <ButtonIcon disabled={true}>
                <Image source={EmoticonVerysad} />
                <Text colorVariant="gray" textVariant="text600">
                  {prepareCount(moodsCount, 'VERYSAD')}
                </Text>
              </ButtonIcon>
            </View>

            {groupedRecords.map(record => (
              <React.Fragment key={record.title}>
                <Text
                  colorVariant="gray"
                  style={{
                    marginTop: 20,
                    marginBottom: 8,
                  }}
                  textVariant="text600">
                  {record.title}
                </Text>
                {record.items?.map(item => (
                  <MoodRecord
                    key={item.id}
                    type={item.mood}
                    onLongPress={() => handleLongPress(item.id)}>
                    {moment(item.date).format('HH:mm')}
                  </MoodRecord>
                ))}
              </React.Fragment>
            ))}
          </MainContainer>
        </ScrollView>
      </MainContainerWrapper>
    </SafeAreaView>
  );
};

export default MoodListScreen;
