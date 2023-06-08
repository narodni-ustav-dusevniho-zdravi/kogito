import React, {useCallback} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import MainContainer from '../components/container/MainContainer/MainContainer';
import MainHeader from '../components/container/MainHeader/MainHeader';
import MainContainerWrapper from '../components/container/MainContainerWrapper';
import Text from '../components/primitives/Text';
import BoxCheckbox from '../components/primitives/BoxCheckbox';
import {useContent} from '../modules/content/useContent';
import {useTrackSchedule} from '../modules/content/useTrackSchedule';
import useMixPanelTracking from '../tracking/useMixPanelTracking';
import {useFocusEffect} from '@react-navigation/native';

const ScheduleDayScreen: React.FC = () => {
  const {todaySchedule} = useContent();
  const {trackScheduleMutation} = useTrackSchedule();
  const {trackDayPlannerOpened} = useMixPanelTracking();

  const handleChange = async (id: string, checked: boolean) => {
    try {
      console.log(id, checked);
      await trackScheduleMutation({
        variables: {
          input: {
            id,
            checked,
          },
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      trackDayPlannerOpened();
    }, []),
  );

  return (
    <SafeAreaView>
      <MainContainerWrapper>
        <MainHeader />
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <MainContainer page={'subWithoutFooter'} color={'white'}>
            <Text textVariant={'bigHeader'} add={true}>
              Plán dne
            </Text>

            <Text textVariant={'headerSub2'} colorVariant={'gray'} />
            {todaySchedule &&
              todaySchedule.morning.map(item => (
                <BoxCheckbox
                  title={item.name}
                  checked={item.completed}
                  onChange={value => handleChange(item.id, value)}
                />
              ))}

            {/*<Text textVariant={'headerSub2'} colorVariant={'gray'}>*/}
            {/*  Odpoledne*/}
            {/*</Text>*/}
            {/*{todaySchedule &&*/}
            {/*  todaySchedule.afternoon.map((item) => (*/}
            {/*    <BoxCheckbox*/}
            {/*      title={item.name}*/}
            {/*      checked={item.completed}*/}
            {/*      onChange={(value) => handleChange(item.id, value)}*/}
            {/*    />*/}
            {/*  ))}*/}

            {/*<Text textVariant={'headerSub2'} colorVariant={'gray'}>*/}
            {/*  Večer*/}
            {/*</Text>*/}
            {/*{todaySchedule &&*/}
            {/*  todaySchedule.evening.map((item) => (*/}
            {/*    <BoxCheckbox*/}
            {/*      title={item.name}*/}
            {/*      checked={item.completed}*/}
            {/*      onChange={(value) => handleChange(item.id, value)}*/}
            {/*    />*/}
            {/*  ))}*/}
          </MainContainer>
        </ScrollView>
      </MainContainerWrapper>
    </SafeAreaView>
  );
};

export default ScheduleDayScreen;
