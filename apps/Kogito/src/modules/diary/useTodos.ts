import {gql, useMutation, useQuery} from '@apollo/client';

export type DayPart = 'MORNING' | 'AFTERNOON' | 'EVENING';

export type Todo = {
  id: string;
  title: string;
  checked: boolean;
  dayPart: DayPart;
};

export const TodosQuery = gql`
  {
    viewer {
      id
      todayTodos {
        id
        title
        checked
        dayPart
      }
    }
  }
`;

export const EditTodoMutation = gql`
  mutation editTodo($input: TodoInput!) {
    editTodo(input: $input) {
      id
      todayTodos {
        id
        title
        checked
        dayPart
      }
    }
  }
`;

export const TrackTodoMutation = gql`
  mutation trackTodo($input: TrackTodoInput!) {
    trackTodo(input: $input) {
      id
      todayTodos {
        id
        title
        checked
        dayPart
      }
    }
  }
`;

export const RemoveTodoMutation = gql`
  mutation removeTodo($id: ID!) {
    removeTodo(id: $id) {
      todayTodos {
        id
        title
        checked
        dayPart
      }
    }
  }
`;

type TodosQuery = {
  viewer: {
    todayTodos: Todo[];
  };
};

export const useTodos = () => {
  const {data, refetch} = useQuery<TodosQuery>(TodosQuery);

  const [editTodo] = useMutation(EditTodoMutation);
  const [trackTodo] = useMutation(TrackTodoMutation);
  const [removeTodo] = useMutation(RemoveTodoMutation);

  const saveTodo = async (input: any) => {
    await editTodo({
      variables: {
        input,
      },
    });
  };

  if (data) {
    return {
      todos: data.viewer.todayTodos,
      refetch,

      editTodo,
      trackTodo,
      saveTodo,
      removeTodo,
    };
  }

  return {
    todos: [],
    refetch,

    editTodo,
    trackTodo,
    saveTodo,
    removeTodo,
  };
};
