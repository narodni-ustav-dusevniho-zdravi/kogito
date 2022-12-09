import { ContentItem } from '../../../data';
import { toGlobalId } from '@app/app/node';
import { toDuration, toLink } from '@app/content/helper';
import helena from './text/helena';
import marta from './text/marta';
import argumentaceUDeprese from './text/argumentaceUDeprese';
import strastiplnyCas from './text/strastiplnyCas';

const items: ContentItem[] = [
  {
    __typename: 'AudioItem',
    journeyId: toGlobalId(1, 'Journey'),
    id: toGlobalId('1:5:p:1', 'Item'),
    name: 'Argumentace u deprese',
    subTitle: '',
    duration: toDuration(0, 3, 14),
    link: toLink('Argumentace_u_deprese.mp3'),
    requiredPoints: 0,
    transcript: argumentaceUDeprese,
    image: 'images/image_6',
  },
  {
    __typename: 'AudioItem',
    journeyId: toGlobalId(1, 'Journey'),
    id: toGlobalId('1:5:p:2', 'Item'),
    name: 'Strastiplný čas',
    subTitle: '',
    duration: toDuration(0, 3, 53),
    link: toLink('Strastiplny_cas.mp3'),
    requiredPoints: 0,
    transcript: strastiplnyCas,
    image: 'images/image_7',
  },
  {
    __typename: 'AudioItem',
    journeyId: toGlobalId(1, 'Journey'),
    id: toGlobalId('1:5:p:3', 'Item'),
    name: 'Imaginace bezpečného místa',
    subTitle: '',
    duration: toDuration(0, 7, 5),
    link: toLink('Imaginace_bezpecneho_mista.mp3'),
    requiredPoints: 0,
    image: 'images/image_8',
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
