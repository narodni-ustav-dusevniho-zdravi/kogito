import { LevelItem } from '../../../data';
import phase from './phase';
import relaxation from './relaxation';
import tasks from './tasks';
import tools from './tools';
import { toGlobalId } from '@app/app/node';

const level: LevelItem = {
  id: toGlobalId(5, 'JourneyLevel'),
  level: 5,
  progress: 0,
  unlocked: false,
  current: false,
  minimumPoints: 56,
  requiredPoints: 60,
  phase,
  relaxation,
  tasks,
  tools,
};

export default level;
