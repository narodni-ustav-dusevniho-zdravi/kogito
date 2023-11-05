import React from 'react';
import {SafeAreaView} from 'react-native';

import type {AppScreen} from '~modules/navigation';
import {ScrollView} from '~modules/ui';

import MainContainer from '../components/container/MainContainer/MainContainer';
import MainContainerWrapper from '../components/container/MainContainerWrapper';
import MainHeader from '../components/container/MainHeader/MainHeader';
import ArticleListBox from '../components/primitives/ArticleListBox';
import Text from '../components/primitives/Text';
import {useContent} from '../content/useContent';

const StoriesListScreen: AppScreen<'StoriesList'> = ({
  navigation: {navigate},
}) => {
  const {stories} = useContent();

  return (
    <SafeAreaView>
      <MainContainerWrapper>
        <MainHeader />
        <ScrollView>
          <MainContainer color="white" page="dashboard">
            <MainContainer page="subWithoutFooter">
              <Text
                style={{
                  marginTop: -40,
                }}
                textVariant="headerSub">
                Příběhy
              </Text>
              {stories.map(story => (
                <ArticleListBox
                  key={story.id}
                  buttonText={story.videoLink ? 'Přehrát' : 'Přečíst'}
                  title={story.title}
                  onPress={() => navigate('StoryDetail', {id: story.id})}
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
