import type {ContentItem} from '../modules/content/types';
import {navigate} from '../navigation/utils';

export const redirectItem = (
  item: Pick<ContentItem, 'options' | '__typename' | 'progress' | 'id'>,
): void => {
  if (item.options && item.progress === 100) {
    const options = JSON.parse(item.options);
    if (options.navigate) {
      navigate(options.navigate.name);
      return;
    }
  }

  switch (item.__typename) {
    case 'AudioItem':
      return navigate('Audio', {id: item.id});
    case 'VideoItem':
      return navigate('Video', {id: item.id});
    case 'ArticleItem':
      return navigate('Article', {id: item.id});
  }
};
