import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {useContent} from '../modules/content/useContent';
import MainContainerWrapper from '../components/container/MainContainerWrapper';
import MainContainer from '../components/container/MainContainer/MainContainer';
import MainHeader from '../components/container/MainHeader/MainHeader';
import Text from '../components/primitives/Text';
import ArticleListBox from '../components/primitives/ArticleListBox';
import type {AppScreen} from '../navigation/Navigation';

const StoriesListScreen: AppScreen<'StoriesList'> = ({navigation}) => {
  const {stories} = useContent();

  return (
    <SafeAreaView>
      <MainContainerWrapper>
        <MainHeader />
        <ScrollView>
          <MainContainer page={'dashboard'} color={'white'}>
            <MainContainer page={'subWithoutFooter'}>
              <Text
                textVariant={'headerSub'}
                style={{
                  marginTop: -40,
                }}>
                Příběhy
              </Text>
              {stories?.map(story => (
                <ArticleListBox
                  onPress={() =>
                    navigation.navigate('StoryDetail', {id: story.id})
                  }
                  title={story.title}
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
