import { ContentItem } from '../../../data';
import { toGlobalId } from '@app/app/node';
import jana from './text/jana';
import mirka from './text/mirka';
import { toDuration, toLink } from '@app/content/helper';
import diskfalifikacePozitivniho from '../../1_journey_levels/4/text/diskfalifikacePozitivniho';
import generalizace from '../../1_journey_levels/4/text/generalizace';
import negativniVestby from '../../1_journey_levels/4/text/negativniVestby';
import personalizace from '../../1_journey_levels/4/text/personalizace';
import prehaneni from '../../1_journey_levels/4/text/prehaneni';
import selektivniAbstrakce from '../../1_journey_levels/4/text/selektivniAbstrakce';
import zduvodnovaniEmocemi from '../../1_journey_levels/4/text/zduvodnovaniEmocemi';
import kognitivniOmyly from './text/kognitivniOmyly';
import cteniMyslenek from './text/cteniMyslenek';

const items: ContentItem[] = [
  {
    __typename: 'AudioItem',
    journeyId: toGlobalId(2, 'Journey'),
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
    journeyId: toGlobalId(2, 'Journey'),
    id: toGlobalId('1:4:p:2', 'Item'),
    name: 'Čtení myšlenek',
    subTitle: 'Chyby v myšlení',
    content: cteniMyslenek,
    requiredPoints: 0,
  },
  {
    __typename: 'ArticleItem',
    journeyId: toGlobalId(2, 'Journey'),
    id: toGlobalId('2:4:p:3', 'Item'),
    name: 'Diskvalifikace pozitivního',
    subTitle: 'Chyby v myšlení',
    content: diskfalifikacePozitivniho,
    requiredPoints: 0,
  },
  {
    __typename: 'ArticleItem',
    journeyId: toGlobalId(2, 'Journey'),
    id: toGlobalId('2:4:p:4', 'Item'),
    name: 'Generalizace',
    subTitle: 'Chyby v myšlení',
    content: generalizace,
    requiredPoints: 0,
  },
  {
    __typename: 'ArticleItem',
    journeyId: toGlobalId(2, 'Journey'),
    id: toGlobalId('2:4:p:5', 'Item'),
    name: 'Negativní věštby',
    subTitle: 'Chyby v myšlení',
    content: negativniVestby,
    requiredPoints: 0,
  },
  {
    __typename: 'ArticleItem',
    journeyId: toGlobalId(2, 'Journey'),
    id: toGlobalId('2:4:p:6', 'Item'),
    name: 'Personalizace',
    subTitle: 'Chyby v myšlení',
    content: personalizace,
    requiredPoints: 0,
  },
  {
    __typename: 'ArticleItem',
    journeyId: toGlobalId(2, 'Journey'),
    id: toGlobalId('2:4:p:7', 'Item'),
    name: 'Přehánění',
    subTitle: 'Chyby v myšlení',
    content: prehaneni,
    requiredPoints: 0,
  },
  {
    __typename: 'ArticleItem',
    journeyId: toGlobalId(2, 'Journey'),
    id: toGlobalId('2:4:p:8', 'Item'),
    name: 'Selektivní abstrakce',
    subTitle: 'Chyby v myšlení',
    content: selektivniAbstrakce,
    requiredPoints: 0,
  },
  {
    __typename: 'ArticleItem',
    journeyId: toGlobalId(2, 'Journey'),
    id: toGlobalId('2:4:p:9', 'Item'),
    name: 'Zdůvodňování emocemi',
    subTitle: 'Chyby v myšlení',
    content: zduvodnovaniEmocemi,
    requiredPoints: 0,
  },
  {
    __typename: 'ArticleItem',
    journeyId: toGlobalId(2, 'Journey'),
    id: toGlobalId('2:4:p:10', 'Item'),
    name: 'Jana - pokračování',
    content: jana,
    requiredPoints: 0,
  },
  {
    __typename: 'ArticleItem',
    journeyId: toGlobalId(2, 'Journey'),
    id: toGlobalId('2:4:p:11', 'Item'),
    name: 'Mirka - pokračování',
    content: mirka,
    requiredPoints: 0,
  },
];

export default items;
