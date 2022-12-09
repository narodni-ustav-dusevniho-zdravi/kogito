import { ContentItem } from '../../../data';
import { toGlobalId } from '@app/app/node';
import jana from './text/jana';
import mirka from './text/mirka';
import { toDuration, toLink } from '@app/content/helper';
import argumentaceUUzkosti from './text/argumentaceUUzkosti';
import strastiplnyCas from './text/strastiplnyCas';

const items: ContentItem[] = [
  {
    __typename: 'AudioItem',
    journeyId: toGlobalId(2, 'Journey'),
    id: toGlobalId('2:5:p:1', 'Item'),
    name: 'Argumentace u úzkosti',
    subTitle: '',
    duration: toDuration(0, 3, 14),
    link: toLink('Argumentace_u_uzkosti.mp3'),
    requiredPoints: 0,
    transcript: argumentaceUUzkosti,
    image: 'images/image_6',
  },
  {
    __typename: 'AudioItem',
    journeyId: toGlobalId(2, 'Journey'),
    id: toGlobalId('2:5:p:2', 'Item'),
    name: 'Strastiplný čas',
    subTitle: '',
    duration: toDuration(0, 3, 53),
    link: toLink('Strastiplny_cas.mp3'),
    requiredPoints: 0,
    transcript: strastiplnyCas,
    image: 'images/image_7',
  },
  {
    __typename: 'ArticleItem',
    journeyId: toGlobalId(2, 'Journey'),
    id: toGlobalId('2:5:p:7', 'Item'),
    name: 'Jana - pokračování',
    content: jana,
    requiredPoints: 0,
  },
  {
    __typename: 'ArticleItem',
    journeyId: toGlobalId(2, 'Journey'),
    id: toGlobalId('2:5:p:8', 'Item'),
    name: 'Mirka - pokračování',
    content: mirka,
    requiredPoints: 0,
  },
];

export default items;
