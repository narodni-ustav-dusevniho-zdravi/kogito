import React, {FC} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {useContent} from '../modules/content/useContent';
import MainContainerWrapper from '../components/container/MainContainerWrapper';
import MainContainer from '../components/container/MainContainer/MainContainer';
import BoxBig from '../components/primitives/BoxBig';
import {StackScreenProps} from '@react-navigation/stack';
import MainHeader from '../components/container/MainHeader/MainHeader';
import Text from '../components/primitives/Text';
import ArticleListBox from '../components/primitives/ArticleListBox';

const StoriesListScreen: FC<StackScreenProps<any>> = ({navigation}) => {
  const {stories} = useContent();

  return (
    <SafeAreaView>
      <MainContainerWrapper>
        <MainHeader />
        <ScrollView>
          <MainContainer align={null} page={'dashboard'} color={'white'}>
            <MainContainer align={null} page={'subWithoutFooter'}>
              <Text
                textVariant={'headerSub'}
                style={{
                  marginTop: -40,
                }}>
                Příběhy
              </Text>
              {stories &&
                stories.map(story => (
                  <ArticleListBox
                    onPress={() =>
                      navigation.navigate('StoryDetail', {id: story.id})
                    }
                    title={story.title}
                    date={story.published}
                    buttonText={story.videoLink ? 'Přehrát' : 'Přečíst'}
                  />
                ))}
            </MainContainer>
          </MainContainer>
        </ScrollView>
      </MainContainerWrapper>
    </SafeAreaView>
  );
};

export default StoriesListScreen;
