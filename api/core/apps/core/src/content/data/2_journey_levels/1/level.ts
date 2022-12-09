import { LevelItem } from '../../../data';
import { toGlobalId } from '@app/app/node';
import phase from './phase';
import relaxation from './relaxation';
import tasks from './tasks';
import tools from './tools';

const level: LevelItem = {
  id: toGlobalId('2:1', 'JourneyLevel'),
  level: 1,
  progress: 0,
  unlocked: false,
  current: false,
  minimumPoints: 0,
  requiredPoints: 15,

  phase,
  relaxation,
  tasks,
  tools,
};

export default level;
