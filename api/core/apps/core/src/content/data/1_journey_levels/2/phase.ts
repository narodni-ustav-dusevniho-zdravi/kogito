import { ContentItem } from '../../../data';
import { toDuration, toLink } from '@app/content/helper';
import { toGlobalId } from '@app/app/node';
import vytvareniMamutu from './text/vytvareniMamutu';
import bojNeboUtek from './text/bojNeboUtek';
import telesnePriznaky from './text/telesnePriznaky';
import helena from './text/helena';
import marta from './text/marta';
import depreseAJejiPriznaky from './text/depreseAJejiPriznaky';

const items: ContentItem[] = [
  {
    __typename: 'AudioItem',
    journeyId: toGlobalId(1, 'Journey'),
    id: toGlobalId('1:2:p:1', 'Item'),
    name: 'Deprese a její příznaky',
    duration: toDuration(0, 5, 43),
    link: toLink('Deprese_a_jeji_priznaky.mp3'),
    requiredPoints: 0,
    transcript: depreseAJejiPriznaky,
    image: 'images/image_2',
  },
  {
    __typename: 'ArticleItem',
    journeyId: toGlobalId(1, 'Journey'),
    id: toGlobalId('1:2:p:2', 'Item'),
    name: 'Vytváření mamutů',
    subTitle: 'Pochop svoje příznaky',
    content: vytvareniMamutu,
    requiredPoints: 0,
  },
  {
    __typename: 'ArticleItem',
    journeyId: toGlobalId(1, 'Journey'),
    id: toGlobalId('1:2:p:3', 'Item'),
    name: 'Boj nebo útěk',
    subTitle: 'Pochop svoje příznaky',
    content: bojNeboUtek,
    requiredPoints: 0,
  },
  {
    __typename: 'ArticleItem',
    journeyId: toGlobalId(1, 'Journey'),
    id: toGlobalId('1:2:p:4', 'Item'),
    name: 'Tělesné příznaky',
    subTitle: 'Pochop svoje příznaky',
    content: telesnePriznaky,
    requiredPoints: 0,
  },
  {
    __typename: 'ArticleItem',
    journeyId: toGlobalId(1, 'Journey'),
    id: toGlobalId('1:2:p:5', 'Item'),
    name: 'Helena',
    subTitle: 'Příběh',
    content: helena,
    requiredPoints: 0,
  },
  {
    __typename: 'ArticleItem',
    journeyId: toGlobalId(1, 'Journey'),
    id: toGlobalId('1:2:p:6', 'Item'),
    name: 'Marta',
    subTitle: 'Příběh',
    content: marta,
    requiredPoints: 0,
  },
];

export default items;
