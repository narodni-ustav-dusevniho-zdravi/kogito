import { ContentItem } from '../../../data';
import { toGlobalId } from '@app/app/node';
import { toDuration, toLink } from '@app/content/helper';
import bludnyKruhSeUzavira from '../../1_journey_levels/3/text/bludnyKruhSeUzavira';
import prikladBludnehoKruhu1 from './text/prikladBludnehoKruhu1';
import prikladBludnehoKruhu2 from './text/prikladBludnehoKruhu2';
import prikladBludnehoKruhu3 from './text/prikladBludnehoKruhu3';
import jana from './text/jana';
import mirka from './text/mirka';
import bludnyKruh from './text/bludnyKruh';

const items: ContentItem[] = [
  {
    __typename: 'AudioItem',
    journeyId: toGlobalId(2, 'Journey'),
    id: toGlobalId('2:3:p:1', 'Item'),
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
    journeyId: toGlobalId(2, 'Journey'),
    id: toGlobalId('2:3:p:2', 'Item'),
    name: 'Bludný kruh se uzavírá',
    content: bludnyKruhSeUzavira,
    requiredPoints: 0,
  },
  {
    __typename: 'ArticleItem',
    journeyId: toGlobalId(2, 'Journey'),
    id: toGlobalId('2:3:p:3', 'Item'),
    name: 'Příklad bludného kruhu I',
    content: prikladBludnehoKruhu1,
    requiredPoints: 0,
  },
  {
    __typename: 'ArticleItem',
    journeyId: toGlobalId(2, 'Journey'),
    id: toGlobalId('2:3:p:4', 'Item'),
    name: 'Příklad bludného kruhu II',
    content: prikladBludnehoKruhu2,
    requiredPoints: 0,
  },
  {
    __typename: 'ArticleItem',
    journeyId: toGlobalId(2, 'Journey'),
    id: toGlobalId('2:3:p:5', 'Item'),
    name: 'Příklad bludného kruhu III',
    content: prikladBludnehoKruhu3,
    requiredPoints: 0,
  },
  {
    __typename: 'ArticleItem',
    journeyId: toGlobalId(2, 'Journey'),
    id: toGlobalId('2:3:p:7', 'Item'),
    name: 'Jana - pokračování',
    content: jana,
    requiredPoints: 0,
  },
  {
    __typename: 'ArticleItem',
    journeyId: toGlobalId(2, 'Journey'),
    id: toGlobalId('2:3:p:8', 'Item'),
    name: 'Mirka - pokračování',
    content: mirka,
    requiredPoints: 0,
  },
];

export default items;
