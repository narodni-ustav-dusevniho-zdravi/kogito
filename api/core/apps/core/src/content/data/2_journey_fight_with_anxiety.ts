import { toGlobalId } from '@app/app/node';
import { Journey } from '../data';
import level_1 from './2_journey_levels/1/level';
import level_2 from './2_journey_levels/2/level';
import level_3 from './2_journey_levels/3/level';
import level_4 from './2_journey_levels/4/level';
import level_5 from './2_journey_levels/5/level';
import todos from './2_journey_levels/todos';

const journey: Journey = {
  id: toGlobalId(2, 'Journey'),
  name: 'Bojuj s úzkostí',
  unlocked: false,
  currentLevel: 1,
  levels: [level_1, level_2, level_3, level_4, level_5],
  todos,
  applyForLabel: ['Va', 'Vd', 'Ve', 'Vf'],
};

export default journey;
