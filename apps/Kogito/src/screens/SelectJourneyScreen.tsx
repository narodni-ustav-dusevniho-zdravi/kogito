import React, {FC} from 'react';
import {SafeAreaView} from 'react-native';
import {useSelectJourney} from '../modules/content/useSelectJourney';
import {StackScreenProps} from '@react-navigation/stack';
import JourneyBig from '../components/primitives/JourneyBig';
import MainContainerWrapper from '../components/container/MainContainerWrapper';
import MainContainer from '../components/container/MainContainer';
import Text from '../components/primitives/Text';

const SelectJourneyScreen: FC<StackScreenProps<any>> = ({navigation}) => {
  const {selectJourneyMutation} = useSelectJourney();

  const handleSelect = async (journeyId: string) => {
    await selectJourneyMutation({
      variables: {
        id: journeyId,
      },
    });

    navigation.navigate('Dashboard');
  };

  return (
    <SafeAreaView>
      <MainContainerWrapper>
        <MainContainer align={null} page={'dashboard'} color={'white'}>
          <MainContainer align={null} page={'subWithoutFooter'}>
            <Text textVariant="bigHeader">Vyberte si svou cestu</Text>
            <JourneyBig
              title="Cesta deprese"
              variant="depression"
              onPress={() => handleSelect('Sm91cm5leTox')}
            />
            <JourneyBig
              title="Cesta úzkosti"
              variant="anxiety"
              onPress={() => handleSelect('Sm91cm5leToy')}
            />
          </MainContainer>
        </MainContainer>
      </MainContainerWrapper>
    </SafeAreaView>
  );
};

export default SelectJourneyScreen;
