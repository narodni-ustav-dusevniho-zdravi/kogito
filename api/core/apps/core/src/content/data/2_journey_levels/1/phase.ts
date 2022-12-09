import { ContentItem } from '../../../data';
import { toGlobalId } from '@app/app/node';
import { toDuration, toLink } from '@app/content/helper';
import emoce from './text/emoce';
import chovani from './text/chovani';
import uvodDoKBT from './text/uvodDoKBT';
import automatickeNegativniMyslenky from './text/automatickeNegativniMyslenky';

const items: ContentItem[] = [
  {
    __typename: 'AudioItem',
    journeyId: toGlobalId(2, 'Journey'),
    id: toGlobalId('2:1:p:1', 'Item'),
    name: 'Úvod do KBT',
    duration: toDuration(0, 5, 43),
    link: toLink('uzkost-1-uvod.mp3'),
    transcript: uvodDoKBT,
    requiredPoints: 0,
    image: 'images/image_1',
  },
  {
    __typename: 'ArticleItem',
    journeyId: toGlobalId(2, 'Journey'),
    id: toGlobalId('2:1:p:2', 'Item'),
    name: 'Automatické negativní myšlenky',
    subTitle: 'Základní pojmy',
    content: automatickeNegativniMyslenky,
    requiredPoints: 0,
  },
  {
    __typename: 'ArticleItem',
    journeyId: toGlobalId(2, 'Journey'),
    id: toGlobalId('2:1:p:3', 'Item'),
    name: 'Emoce',
    subTitle: 'Základní pojmy',
    content: emoce,
    requiredPoints: 0,
  },
  {
    __typename: 'ArticleItem',
    journeyId: toGlobalId(2, 'Journey'),
    id: toGlobalId('2:1:p:4', 'Item'),
    name: 'Chování',
    subTitle: 'Základní pojmy',
    content: chovani,
    requiredPoints: 0,
  },
  {
    __typename: 'VideoItem',
    journeyId: toGlobalId(1, 'Journey'),
    id: toGlobalId('2:1:p:5', 'Item'),
    name: 'Úvod - Veronika K.',
    subTitle: 'Příběhy',
    duration: toDuration(0, 5, 43),
    link: '2KqEZuXSGiY',
    requiredPoints: 0,
  },
  {
    __typename: 'VideoItem',
    journeyId: toGlobalId(1, 'Journey'),
    id: toGlobalId('2:1:p:6', 'Item'),
    name: 'Myšlenky',
    subTitle: 'Příběhy',
    duration: toDuration(0, 5, 43),
    link: '6vH7dVpsnHA',
    requiredPoints: 0,
  },
];

export default items;
