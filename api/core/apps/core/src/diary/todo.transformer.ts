import { DiaryTodo } from '@app/diary/todo.entity';
import { Todo } from '../graphql.schema';
import { toGlobalId } from '@app/app/node';

const transformTodo = (entry: DiaryTodo): Todo => {
  return {
    ...entry,
    id: toGlobalId(entry.id, 'Todo'),
    checked: !!entry.completed,
  };
};

export default transformTodo;
