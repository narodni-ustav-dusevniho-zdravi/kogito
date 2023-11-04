import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';

import {logEvent} from '~modules/analytics';
import type {AppScreen} from '~modules/navigation';
import {Html} from '~modules/ui';

import MainContainer from '../components/container/MainContainer/MainContainer';
import MainContainerWrapper from '../components/container/MainContainerWrapper';
import Button from '../components/primitives/Button';
import ProgressBar from '../components/primitives/ProgressBar/ProgressBar';
import Text from '../components/primitives/Text';
import {useItemContent} from '../content/useItemContent';
import {useTrackProgressMutation} from '../content/useTrackProgressMutation';
import eventListener from '../helpers/eventListener';

const ArticleScreen: AppScreen<'Article'> = ({
  navigation: {replace, goBack},
  route,
}) => {
  const {articleItem} = useItemContent(route.params.id);

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
              <Html source={articleItem.content[position]?.content || ''} />
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
