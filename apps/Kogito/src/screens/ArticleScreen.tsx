import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, useWindowDimensions} from 'react-native';
import type {AppScreen} from '../navigation/Navigation';
import MainContainerWrapper from '../components/container/MainContainerWrapper';
import MainContainer from '../components/container/MainContainer/MainContainer';
import {useItemContent} from '../modules/content/useItemContent';
import HTML from 'react-native-render-html';
import ProgressBar from '../components/primitives/ProgressBar/ProgressBar';
import Text from '../components/primitives/Text';
import Button from '../components/primitives/Button';

import {useTrackProgress} from '../modules/content/useTrackProgress';
import useEventListener from '../helpers/useEventListener';
import useMixPanelTracking from '../tracking/useMixPanelTracking';

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

const ArticleScreen: AppScreen<'Article'> = ({navigation, route}) => {
  const {fireEvent} = useEventListener();
  const {articleItem} = useItemContent(route.params.id);
  const windowWidth = useWindowDimensions().width;
  const {trackLessonCompleted} = useMixPanelTracking();

  const {trackProgressMutation} = useTrackProgress();
  const [position, setPosition] = useState(0);

  useEffect(() => {
    setPosition(0);
  }, [articleItem]);

  useEffect(() => {
    if (articleItem && position === articleItem.content.length - 1) {
      console.log('tracking!');
      trackProgressMutation({
        variables: {
          input: {
            id: route.params.id,
            progress: 100,
          },
        },
      }).then(() => {
        trackLessonCompleted(articleItem.name);
        fireEvent('refetch-progress');
      });
    }
  }, [articleItem, position]);

  const handlePress = () => {
    if (articleItem) {
      if (position === articleItem.content.length - 1) {
        if (articleItem.options) {
          const options = JSON.parse(articleItem.options);
          if (options.navigate) {
            navigation.replace(options.navigate.name);
          }
        } else {
          navigation.goBack();
        }
      } else {
        setPosition(position + 1);
      }
    }
  };

  return (
    <SafeAreaView>
      {articleItem && (
        <MainContainerWrapper color={'white'}>
          <ProgressBar value={position} max={articleItem.content.length} />
          <MainContainer page={'subWithoutFooter'} color={'white'}>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
              <Text textVariant={'header'} space={'mainY'}>
                {articleItem.name}
              </Text>
              <HTML
                source={{html: articleItem.content[position].content}}
                tagsStyles={{
                  ...styles,
                  img: {
                    width: windowWidth - 84,
                  },
                }}
              />
              <Button
                onPress={handlePress}
                title={articleItem.content[position].continue}
                style={{
                  marginTop: 'auto',
                }}
              />
            </ScrollView>
          </MainContainer>
        </MainContainerWrapper>
      )}
    </SafeAreaView>
  );
};

export default ArticleScreen;
