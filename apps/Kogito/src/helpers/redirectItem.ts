import {Item} from '../modules/content/graphql';
import {StackNavigationProp} from '@react-navigation/stack/src/types';

export const redirectItem = (
  navigation: StackNavigationProp<any>,
  item: Item,
): void => {
  if (item.options && item.progress === 100) {
    const options = JSON.parse(item.options);
    if (options.navigate) {
      navigation.navigate(options.navigate.name);
      return;
    }
  }

  switch (item.__typename) {
    case 'AudioItem':
      navigation.navigate('Audio', {id: item.id});
      break;
    case 'VideoItem':
      navigation.navigate('Video', {id: item.id});
      break;
    case 'ArticleItem':
      navigation.navigate('Article', {id: item.id});
      break;
  }
};
