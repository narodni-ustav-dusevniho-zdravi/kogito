import { ContentItem } from '../data';
import { toGlobalId } from '@app/app/node';

import hodnotSvojeEmoce from './commonTodos/hodnotSvojeEmoce';
import planujSiDen from './commonTodos/planujSiDen';
import relaxuj from './commonTodos/relaxuj';
import zapisujSiMyslenkyAEmoce from './commonTodos/zapisujSiMyslenkyAEmoce';

import hledejPozitiva from './commonTodos/hledejPozitiva';
import odmenujSe from './commonTodos/odmenujSe';
import pojmenovavej from './commonTodos/pojmenovavej';
import relaxuj2 from './commonTodos/relaxuj2';
import rozvijejHodnoceniAPlanovani from './commonTodos/rozvijejHodnoceniAPlanovani';

import otestujSe from './commonTodos/otestujSe';
import procvicujCoZnas from './commonTodos/procvicujCoZnas';
import skladejBludneKruhy from './commonTodos/skladejBludneKruhy';
import vytrvej from './commonTodos/vytrvej';
import vytrvejAnxiety from './commonTodos/vytrvejAnxiety';

import casProSebe from './commonTodos/casProSebe';
import najdiSveChybyVMysleni from './commonTodos/najdiSveChybyVMysleni';
import opakovani from './commonTodos/opakovani';
import posouvejSveMoznosti from './commonTodos/posouvejSveMoznosti';

import pouzivejKogito from './commonTodos/pouzivejKogito';
import pouzivejKogitoAnxious from './commonTodos/pouzivejKogitoAnxious';
import zapisujSiMyslenkyAEmoceAnxiety from './commonTodos/zapisujSiMyslenkyAEmoceAnxiety';
import casProSebeAnxiety from './commonTodos/casProSebeAnxiety';
import opakovaniAnxiety from './commonTodos/opakovaniAnxiety';
import posouvejSveMoznostiAnxiety from './commonTodos/posouvejSveMoznostiAnxiety';

export const Todos1: ContentItem = {
  __typename: 'ArticleItem',
  journeyId: toGlobalId(1, 'Journey'),
  id: toGlobalId('1:1:a:1', 'Item'),
  name: 'Hodnoť svoje emoce',
  content: hodnotSvojeEmoce,
  requiredPoints: 0,
};

export const Todos2: ContentItem = {
  __typename: 'ArticleItem',
  journeyId: toGlobalId(1, 'Journey'),
  id: toGlobalId('1:1:a:2', 'Item'),
  name: 'Plánuj si den',
  content: planujSiDen,
  requiredPoints: 0,
};

export const Todos3: ContentItem = {
  __typename: 'ArticleItem',
  journeyId: toGlobalId(1, 'Journey'),
  id: toGlobalId('1:1:a:3', 'Item'),
  name: 'Relaxuj',
  content: relaxuj,
  requiredPoints: 0,
};

export const Todos4: ContentItem = {
  __typename: 'ArticleItem',
  journeyId: toGlobalId(1, 'Journey'),
  id: toGlobalId('1:1:a:4', 'Item'),
  name: 'Zapisuj si myšlenky a emoce',
  content: zapisujSiMyslenkyAEmoce,
  requiredPoints: 0,
};

export const Todos4Anxiety: ContentItem = {
  __typename: 'ArticleItem',
  journeyId: toGlobalId(1, 'Journey'),
  id: toGlobalId('1:1:a:4:a', 'Item'),
  name: 'Zapisuj si myšlenky a emoce',
  content: zapisujSiMyslenkyAEmoceAnxiety,
  requiredPoints: 0,
};

// DALSI PART

export const Todos5: ContentItem = {
  __typename: 'ArticleItem',
  journeyId: toGlobalId(1, 'Journey'),
  id: toGlobalId('1:2:a:1', 'Item'),
  name: 'Hledej pozitiva',
  content: hledejPozitiva,
  requiredPoints: 0,
};

export const Todos6: ContentItem = {
  __typename: 'ArticleItem',
  journeyId: toGlobalId(1, 'Journey'),
  id: toGlobalId('1:2:a:2', 'Item'),
  name: 'Odměňuj se',
  content: odmenujSe,
  requiredPoints: 0,
};

export const Todos7: ContentItem = {
  __typename: 'ArticleItem',
  journeyId: toGlobalId(1, 'Journey'),
  id: toGlobalId('1:2:a:3', 'Item'),
  name: 'Pojmenovávej',
  content: pojmenovavej,
  requiredPoints: 0,
};

export const Todos8: ContentItem = {
  __typename: 'ArticleItem',
  journeyId: toGlobalId(1, 'Journey'),
  id: toGlobalId('1:2:a:4', 'Item'),
  name: 'Relaxuj',
  content: relaxuj2,
  requiredPoints: 0,
};

export const Todos9: ContentItem = {
  __typename: 'ArticleItem',
  journeyId: toGlobalId(1, 'Journey'),
  id: toGlobalId('1:2:a:5', 'Item'),
  name: 'Rozvíjej hodnocení a plánování',
  content: rozvijejHodnoceniAPlanovani,
  requiredPoints: 0,
};

// DALSI PART
export const Todos10: ContentItem = {
  __typename: 'ArticleItem',
  journeyId: toGlobalId(1, 'Journey'),
  id: toGlobalId('1:3:a:1', 'Item'),
  name: 'Otestuj se',
  content: otestujSe,
  requiredPoints: 0,
};

export const Todos11: ContentItem = {
  __typename: 'ArticleItem',
  journeyId: toGlobalId(1, 'Journey'),
  id: toGlobalId('1:3:a:2', 'Item'),
  name: 'Procvičuj co znáš',
  content: procvicujCoZnas,
  requiredPoints: 0,
};

export const Todos12: ContentItem = {
  __typename: 'ArticleItem',
  journeyId: toGlobalId(1, 'Journey'),
  id: toGlobalId('1:3:a:3', 'Item'),
  name: 'Skládej bludné kruhy',
  content: skladejBludneKruhy,
  requiredPoints: 0,
};

export const Todos13: ContentItem = {
  __typename: 'ArticleItem',
  journeyId: toGlobalId(1, 'Journey'),
  id: toGlobalId('1:3:a:4', 'Item'),
  name: 'Vytrvej',
  content: vytrvej,
  requiredPoints: 0,
};
export const Todos13Anxiety: ContentItem = {
  __typename: 'ArticleItem',
  journeyId: toGlobalId(1, 'Journey'),
  id: toGlobalId('1:3:a:4:a', 'Item'),
  name: 'Vytrvej',
  content: vytrvejAnxiety,
  requiredPoints: 0,
};

// DALSI PART
export const Todos14: ContentItem = {
  __typename: 'ArticleItem',
  journeyId: toGlobalId(1, 'Journey'),
  id: toGlobalId('1:4:a:1', 'Item'),
  name: 'Čas pro sebe',
  content: casProSebe,
  requiredPoints: 0,
};
export const Todos14Anxiety: ContentItem = {
  __typename: 'ArticleItem',
  journeyId: toGlobalId(1, 'Journey'),
  id: toGlobalId('1:4:a:1:a', 'Item'),
  name: 'Čas pro sebe',
  content: casProSebeAnxiety,
  requiredPoints: 0,
};

export const Todos15: ContentItem = {
  __typename: 'ArticleItem',
  journeyId: toGlobalId(1, 'Journey'),
  id: toGlobalId('1:4:a:2', 'Item'),
  name: 'Najdi své chyby v myšlení',
  content: najdiSveChybyVMysleni,
  requiredPoints: 0,
};

export const Todos16: ContentItem = {
  __typename: 'ArticleItem',
  journeyId: toGlobalId(1, 'Journey'),
  id: toGlobalId('1:4:a:3', 'Item'),
  name: 'Opakování',
  content: opakovani,
  requiredPoints: 0,
};
export const Todos16Anxiety: ContentItem = {
  __typename: 'ArticleItem',
  journeyId: toGlobalId(1, 'Journey'),
  id: toGlobalId('1:4:a:3:a', 'Item'),
  name: 'Opakování',
  content: opakovaniAnxiety,
  requiredPoints: 0,
};

export const Todos17: ContentItem = {
  __typename: 'ArticleItem',
  journeyId: toGlobalId(1, 'Journey'),
  id: toGlobalId('1:4:a:4', 'Item'),
  name: 'Posouvej své možnosti',
  content: posouvejSveMoznosti,
  requiredPoints: 0,
};
export const Todos17Anxiety: ContentItem = {
  __typename: 'ArticleItem',
  journeyId: toGlobalId(1, 'Journey'),
  id: toGlobalId('1:4:a:4:a', 'Item'),
  name: 'Posouvej své možnosti',
  content: posouvejSveMoznostiAnxiety,
  requiredPoints: 0,
};

// DALSI PART
export const Todos18: ContentItem = {
  __typename: 'ArticleItem',
  journeyId: toGlobalId(1, 'Journey'),
  id: toGlobalId('1:5:a:1', 'Item'),
  name: 'Používej Kogito',
  content: pouzivejKogito,
  requiredPoints: 0,
};

export const Todos19: ContentItem = {
  __typename: 'ArticleItem',
  journeyId: toGlobalId(1, 'Journey'),
  id: toGlobalId('1:5:a:1', 'Item'),
  name: 'Používej Kogito',
  content: pouzivejKogitoAnxious,
  requiredPoints: 0,
};
