import { LevelItem } from '../../../data';
import phase from './phase';
import relaxation from './relaxation';
import tasks from './tasks';
import tools from './tools';
import { toGlobalId } from '@app/app/node';

const level: LevelItem = {
  id: toGlobalId(3, 'JourneyLevel'),
  level: 3,
  progress: 0,
  unlocked: false,
  current: false,
  minimumPoints: 27,
  requiredPoints: 40,
  phase,
  relaxation,
  tasks,
  tools,
};

export default level;
