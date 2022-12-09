import { toGlobalId } from '@app/app/node';
import { toDuration, toLink } from '@app/content/helper';
import { ContentItem } from '../data';
import relaxaceUvod from './common/relaxaceUvod';

export const RelaxationIntro: ContentItem = {
  __typename: 'AudioItem',
  journeyId: toGlobalId(1, 'Journey'),
  id: toGlobalId('relaxation:1', 'Item'),
  name: 'Relaxace - úvod',
  duration: toDuration(0, 2, 36),
  link: toLink(
    '70N9pyFtt35YOMQS6i0yzIrc4re0bDN7fRHLGcAajRNBoeZ2VHZMnGuiBWJ5v8y3.mp3',
  ),
  transcript: relaxaceUvod,
  requiredPoints: 0,
  image: 'images/image_10',
};

export const RelaxationBreathing: ContentItem = {
  __typename: 'AudioItem',
  journeyId: toGlobalId(1, 'Journey'),
  id: toGlobalId('relaxation:2', 'Item'),
  name: 'Relaxační dýchání',
  duration: toDuration(0, 7, 17),
  link: toLink(
    'uLe9KwGVBBrLXiNVYxiqMJ2SUCPFnxYVaQjzycSO91TgLKH4bBVfyVnjbnMpCvNz.mp3',
  ),
  requiredPoints: 0,
  image: 'images/image_11',
};

export const RelaxationWithAffirmation: ContentItem = {
  __typename: 'AudioItem',
  journeyId: toGlobalId(1, 'Journey'),
  id: toGlobalId('relaxation:3', 'Item'),
  name: 'Relaxace s afirmací',
  duration: toDuration(0, 5, 54),
  link: toLink('2_Relaxace_s_afirmaci.mp3'),
  requiredPoints: 0,
  image: 'images/image_12',
};

export const RelaxationScanningOwnBody: ContentItem = {
  __typename: 'AudioItem',
  journeyId: toGlobalId(1, 'Journey'),
  id: toGlobalId('relaxation:4', 'Item'),
  name: 'Skenování vlastního těla',
  duration: toDuration(0, 5, 54),
  link: toLink('Skenovani_vlastniho_tela.mp3'),
  requiredPoints: 0,
  image: 'images/image_13',
};

export const RelaxationProgressiveMuscle: ContentItem = {
  __typename: 'AudioItem',
  journeyId: toGlobalId(1, 'Journey'),
  id: toGlobalId('relaxation:5', 'Item'),
  name: 'Progresivní svalová relaxace',
  duration: toDuration(0, 5, 54),
  link: toLink('Progresivni_svalova_relaxace.mp3'),
  requiredPoints: 0,
  image: 'images/image_14',
};

export const RelaxationImaginationSafePlace: ContentItem = {
  __typename: 'AudioItem',
  journeyId: toGlobalId(1, 'Journey'),
  id: toGlobalId('relaxation:6', 'Item'),
  name: 'Imaginace bezpečného místa',
  duration: toDuration(0, 5, 54),
  link: toLink('Imaginace_bezpecneho_mista.mp3'),
  requiredPoints: 0,
  image: 'images/image_15',
};
