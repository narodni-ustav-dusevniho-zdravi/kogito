import { ContentItem } from '../../../data';
import { toGlobalId } from '@app/app/node';
import { toDuration, toLink } from '@app/content/helper';
import cteniMyslenek from './text/cteniMyslenek';
import diskfalifikacePozitivniho from './text/diskfalifikacePozitivniho';
import generalizace from './text/generalizace';
import helena from './text/helena';
import marta from './text/marta';
import negativniVestby from './text/negativniVestby';
import personalizace from './text/personalizace';
import prehaneni from './text/prehaneni';
import selektivniAbstrakce from './text/selektivniAbstrakce';
import zduvodnovaniEmocemi from './text/zduvodnovaniEmocemi';
import kognitivniOmyly from './text/kognitivniOmyly';

const items: ContentItem[] = [
  {
    __typename: 'AudioItem',
    journeyId: toGlobalId(1, 'Journey'),
    id: toGlobalId('1:4:p:1', 'Item'),
    name: 'Kognitivní omyly',
    subTitle: '',
    duration: toDuration(0, 8, 46),
    link: toLink('Kognitivni_omyly.mp3'),
    requiredPoints: 0,
    transcript: kognitivniOmyly,
    image: 'images/image_5',
  },
  {
    __typename: 'ArticleItem',
    journeyId: toGlobalId(1, 'Journey'),
    id: toGlobalId('1:4:p:2', 'Item'),
    name: 'Čtení myšlenek',
    subTitle: 'Chyby v myšlení',
    content: cteniMyslenek,
    requiredPoints: 0,
  },
  {
    __typename: 'ArticleItem',
    journeyId: toGlobalId(1, 'Journey'),
    id: toGlobalId('1:4:p:3', 'Item'),
    name: 'Diskvalifikace pozitivního',
    subTitle: 'Chyby v myšlení',
    content: diskfalifikacePozitivniho,
    requiredPoints: 0,
  },
  {
    __typename: 'ArticleItem',
    journeyId: toGlobalId(1, 'Journey'),
    id: toGlobalId('1:4:p:4', 'Item'),
    name: 'Generalizace',
    subTitle: 'Chyby v myšlení',
    content: generalizace,
    requiredPoints: 0,
  },
  {
    __typename: 'ArticleItem',
    journeyId: toGlobalId(1, 'Journey'),
    id: toGlobalId('1:4:p:5', 'Item'),
    name: 'Negativní věštby',
    subTitle: 'Chyby v myšlení',
    content: negativniVestby,
    requiredPoints: 0,
  },
  {
    __typename: 'ArticleItem',
    journeyId: toGlobalId(1, 'Journey'),
    id: toGlobalId('1:4:p:6', 'Item'),
    name: 'Personalizace',
    subTitle: 'Chyby v myšlení',
    content: personalizace,
    requiredPoints: 0,
  },
  {
    __typename: 'ArticleItem',
    journeyId: toGlobalId(1, 'Journey'),
    id: toGlobalId('1:4:p:7', 'Item'),
    name: 'Přehánění',
    subTitle: 'Chyby v myšlení',
    content: prehaneni,
    requiredPoints: 0,
  },
  {
    __typename: 'ArticleItem',
    journeyId: toGlobalId(1, 'Journey'),
    id: toGlobalId('1:4:p:8', 'Item'),
    name: 'Selektivní abstrakce',
    subTitle: 'Chyby v myšlení',
    content: selektivniAbstrakce,
    requiredPoints: 0,
  },
  {
    __typename: 'ArticleItem',
    journeyId: toGlobalId(1, 'Journey'),
    id: toGlobalId('1:4:p:9', 'Item'),
    name: 'Zdůvodňování emocemi',
    subTitle: 'Chyby v myšlení',
    content: zduvodnovaniEmocemi,
    requiredPoints: 0,
  },
  {
    __typename: 'ArticleItem',
    journeyId: toGlobalId(1, 'Journey'),
    id: toGlobalId('1:4:p:10', 'Item'),
    name: 'Helena - pokračování',
    content: helena,
    requiredPoints: 0,
  },
  {
    __typename: 'ArticleItem',
    journeyId: toGlobalId(1, 'Journey'),
    id: toGlobalId('1:4:p:11', 'Item'),
    name: 'Marta - pokračování',
    content: marta,
    requiredPoints: 0,
  },
];

export default items;
