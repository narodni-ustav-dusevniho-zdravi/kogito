import { ContentItem } from '../../../data';
import { toDuration, toLink } from '@app/content/helper';
import { toGlobalId } from '@app/app/node';
import bludnyKruhSeUzavira from './text/bludnyKruhSeUzavira';
import prikladBludnehoKruhu1 from './text/prikladBludnehoKruhu1';
import prikladBludnehoKruhu2 from './text/prikladBludnehoKruhu2';
import prikladBludnehoKruhu3 from './text/prikladBludnehoKruhu3';
import helena from './text/helena';
import marta from './text/marta';
import bludnyKruh from './text/bludnyKruh';

const items: ContentItem[] = [
  {
    __typename: 'AudioItem',
    journeyId: toGlobalId(1, 'Journey'),
    id: toGlobalId('1:3:p:1', 'Item'),
    name: 'Bludný kruh',
    subTitle: '',
    duration: toDuration(0, 3, 44),
    link: toLink('Bludny_kruh.mp3'),
    requiredPoints: 0,
    transcript: bludnyKruh,
    image: 'images/image_3',
  },
  {
    __typename: 'ArticleItem',
    journeyId: toGlobalId(1, 'Journey'),
    id: toGlobalId('1:3:p:2', 'Item'),
    name: 'Bludný kruh se uzavírá',
    content: bludnyKruhSeUzavira,
    requiredPoints: 0,
  },
  {
    __typename: 'ArticleItem',
    journeyId: toGlobalId(1, 'Journey'),
    id: toGlobalId('1:3:p:3', 'Item'),
    name: 'Příklad bludného kruhu I',
    content: prikladBludnehoKruhu1,
    requiredPoints: 0,
  },
  {
    __typename: 'ArticleItem',
    journeyId: toGlobalId(1, 'Journey'),
    id: toGlobalId('1:3:p:4', 'Item'),
    name: 'Příklad bludného kruhu II',
    content: prikladBludnehoKruhu2,
    requiredPoints: 0,
  },
  {
    __typename: 'ArticleItem',
    journeyId: toGlobalId(1, 'Journey'),
    id: toGlobalId('1:3:p:5', 'Item'),
    name: 'Příklad bludného kruhu III',
    content: prikladBludnehoKruhu3,
    requiredPoints: 0,
  },
  {
    __typename: 'ArticleItem',
    journeyId: toGlobalId(1, 'Journey'),
    id: toGlobalId('1:3:p:7', 'Item'),
    name: 'Helena - pokračování',
    content: helena,
    requiredPoints: 0,
  },
  {
    __typename: 'ArticleItem',
    journeyId: toGlobalId(1, 'Journey'),
    id: toGlobalId('1:3:p:8', 'Item'),
    name: 'Marta - pokračování',
    content: marta,
    requiredPoints: 0,
  },
];

export default items;
