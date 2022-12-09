import { ContentItem } from '../../../data';
import { toGlobalId } from '@app/app/node';
import { toDuration, toLink } from '@app/content/helper';
import telesnePriznaky from './text/telesnePriznaky';
import jana from './text/jana';
import mirka from './text/mirka';
import uzkostAJejiPriznaky from './text/uzkostAJejiPriznaky';
import vytvareniMamutu from './text/vytvareniMamutu';
import bojNeboUtek from './text/bojNeboUtek';

const items: ContentItem[] = [
  {
    __typename: 'AudioItem',
    journeyId: toGlobalId(2, 'Journey'),
    id: toGlobalId('2:2:p:1', 'Item'),
    name: 'Úzkost a její příznaky',
    duration: toDuration(0, 5, 43),
    link: toLink('Uzkost_a_jeji_priznaky.mp3'),
    requiredPoints: 0,
    transcript: uzkostAJejiPriznaky,
    image: 'images/image_2',
  },
  {
    __typename: 'ArticleItem',
    journeyId: toGlobalId(2, 'Journey'),
    id: toGlobalId('2:2:p:2', 'Item'),
    name: 'Vytváření mamutů',
    subTitle: 'Pochop svoje příznaky',
    content: vytvareniMamutu,
    requiredPoints: 0,
  },
  {
    __typename: 'ArticleItem',
    journeyId: toGlobalId(2, 'Journey'),
    id: toGlobalId('2:2:p:3', 'Item'),
    name: 'Boj nebo útěk',
    subTitle: 'Pochop svoje příznaky',
    content: bojNeboUtek,
    requiredPoints: 0,
  },
  {
    __typename: 'ArticleItem',
    journeyId: toGlobalId(2, 'Journey'),
    id: toGlobalId('2:2:p:4', 'Item'),
    name: 'Tělesné příznaky',
    subTitle: 'Pochop svoje příznaky',
    content: telesnePriznaky,
    requiredPoints: 0,
  },
  {
    __typename: 'ArticleItem',
    journeyId: toGlobalId(2, 'Journey'),
    id: toGlobalId('2:2:p:5', 'Item'),
    name: 'Jana',
    subTitle: 'Příběh',
    content: jana,
    requiredPoints: 0,
  },
  {
    __typename: 'ArticleItem',
    journeyId: toGlobalId(2, 'Journey'),
    id: toGlobalId('2:2:p:6', 'Item'),
    name: 'Mirka',
    subTitle: 'Příběh',
    content: mirka,
    requiredPoints: 0,
  },
];

export default items;
