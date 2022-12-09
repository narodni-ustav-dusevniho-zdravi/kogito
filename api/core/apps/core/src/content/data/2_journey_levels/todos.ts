import { TodoItem } from '../../data';
import { toGlobalId } from '@app/app/node';

const items: TodoItem[] = [
  {
    id: toGlobalId('j1:t1', 'Todo'),
    name: 'Hodnoť svoje emoce',
    level: 1,
  },
  {
    id: toGlobalId('j1:t2', 'Todo'),
    name: 'Plánuj si den',
    level: 1,
  },
  {
    id: toGlobalId('j1:t3', 'Todo'),
    name: 'Relaxuj',
    level: 1,
  },
  {
    id: toGlobalId('j1:t4', 'Todo'),
    name: 'Zapisuj si myšlenky a emoce',
    level: 1,
  },
];

export default items;
