import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, useWindowDimensions} from 'react-native';
import HTML from 'react-native-render-html';

import {logEvent} from '~modules/analytics';
import type {AppScreen} from '~modules/navigation';

import MainContainer from '../components/container/MainContainer/MainContainer';
import MainContainerWrapper from '../components/container/MainContainerWrapper';
import Button from '../components/primitives/Button';
import ProgressBar from '../components/primitives/ProgressBar/ProgressBar';
import Text from '../components/primitives/Text';
import {useItemContent} from '../content/useItemContent';
import {useTrackProgressMutation} from '../content/useTrackProgressMutation';
import eventListener from '../helpers/eventListener';

const styles = {
  p: {
    // textAlign: 'justify',
    // textJustify: 'inter-character',
    marginBottom: 12,
    fontSize: 18,
  },
  li: {
    fontSize: 18,
    margin: 0,
    padding: 0,
    lineHeight: 20,
  },
};

const ArticleScreen: AppScreen<'Article'> = ({
  navigation: {replace, goBack},
  route,
}) => {
  const {articleItem} = useItemContent(route.params.id);
  const windowWidth = useWindowDimensions().width;

  const trackProgressMutation = useTrackProgressMutation();
  const [position, setPosition] = useState(0);

  useEffect(() => {
    setPosition(0);
  }, [articleItem]);

  const handlePress = () => {
    if (!articleItem) return;
    const nextPosition = position + 1;
    if (nextPosition === articleItem.content.length) {
      trackProgressMutation({
        variables: {
          input: {
            id: route.params.id,
            progress: 100,
          },
        },
      }).then(() => {
        logEvent('Lesson completed', {lessonTitle: articleItem.name});
        eventListener.fireEvent('refetch-progress');
      });
      const nextScreen =
        articleItem.options && JSON.parse(articleItem.options)?.navigate?.name;
      return nextScreen ? replace(nextScreen) : goBack();
    }
    setPosition(position + 1);
  };

  return (
    <SafeAreaView>
      {articleItem && (
        <MainContainerWrapper color="white">
          <ProgressBar max={articleItem.content.length} value={position} />
          <MainContainer color="white" page="subWithoutFooter">
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
              <Text space="mainY" textVariant="header">
                {articleItem.name}
              </Text>
              <HTML
                source={{html: articleItem.content[position]?.content || ''}}
                tagsStyles={{
                  ...styles,
                  img: {
                    width: windowWidth - 84,
                  },
                }}
              />
              <Button
                style={{
                  marginTop: 'auto',
                }}
                title={articleItem.content[position]?.continue || 'Pokračovat'}
                onPress={handlePress}
              />
            </ScrollView>
          </MainContainer>
        </MainContainerWrapper>
      )}
    </SafeAreaView>
  );
};

export default ArticleScreen;
