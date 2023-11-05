import React, {useState} from 'react';
import {Alert, SafeAreaView} from 'react-native';

import type {DayPart, Todo} from '~gql/graphql';
import {logEvent} from '~modules/analytics';
import type {AppScreen} from '~modules/navigation';
import {ScrollView} from '~modules/ui';

import MainContainer from '../components/container/MainContainer';
import MainContainerWrapper from '../components/container/MainContainerWrapper';
import MainHeader from '../components/container/MainHeader';
import BoxAdd from '../components/primitives/BoxAdd';
import BoxCheckbox from '../components/primitives/BoxCheckbox';
import Text from '../components/primitives/Text';
import EditTodoModal from '../diary/modal/EditTodoModal/EditTodoModal';
import {useTodos} from '../diary/useTodos';

type EditorSettings = {
  dayPart: DayPart;
  id: string | null;
  title: string;
};

type DayPartRender = {
  dayPart: DayPart;
  handleCheck: (id: string, checked: boolean) => void;
  handleLongClick: (id: string) => void;
  setEditor: (settings: EditorSettings) => void;
  title: string;
  todos: Todo[];
};

const DayPartRender: React.FC<DayPartRender> = ({
  title,
  dayPart,
  todos,
  handleCheck,
  handleLongClick,
  setEditor,
}) => {
  return (
    <>
      <Text colorVariant="gray" textVariant="headerSub2">
        {title}
      </Text>
      {todos
        .filter(todo => todo.dayPart === dayPart)
        .map(todo => (
          <BoxCheckbox
            key={todo.id}
            checked={todo.checked}
            title={todo.title}
            onChange={value => handleCheck(todo.id, value)}
            onLongPress={() => handleLongClick(todo.id)}
          />
        ))}
      <BoxAdd onPress={() => setEditor({id: null, title: '', dayPart})} />
    </>
  );
};

// eslint-disable-next-line max-lines-per-function
const TodosScreen: AppScreen<'Todos'> = () => {
  const {todos, refetch, saveTodo, trackTodo, removeTodo} = useTodos();
  const [editor, setEditor] = useState<EditorSettings | null>(null);

  const handleItemSave = async (title: string) => {
    if (!editor) return;
    title &&
      (await saveTodo({
        id: editor.id,
        dayPart: editor.dayPart,
        title,
      }));
    setEditor(null);
    logEvent('Todo Created');
  };

  const handleItemRemove = () => {
    setEditor(null);
  };

  const handleCheck = async (id: string, checked: boolean) => {
    await trackTodo({
      variables: {
        input: {
          id,
          checked,
        },
      },
    });
    if (checked) {
      logEvent('Todo Completed');
    }
  };

  const handleLongPress = (id: string) => {
    Alert.alert('Smazat', 'Doopravdy chcete smazat záznam?', [
      {
        text: 'Ne',
        style: 'cancel',
      },
      {
        text: 'Ano',
        onPress: async () => {
          await removeTodo({
            variables: {
              id,
            },
          });
          logEvent('Todo Deleted');
          refetch();
        },
      },
    ]);
  };

  return (
    <SafeAreaView>
      <MainContainerWrapper>
        <MainHeader />
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <MainContainer color="white" page="subWithoutFooter">
            <Text add={true} textVariant="bigHeader">
              Plánovač
            </Text>
            <DayPartRender
              dayPart="MORNING"
              handleCheck={handleCheck}
              handleLongClick={handleLongPress}
              setEditor={setEditor}
              title="Ráno"
              todos={todos}
            />
            <DayPartRender
              dayPart="AFTERNOON"
              handleCheck={handleCheck}
              handleLongClick={handleLongPress}
              setEditor={setEditor}
              title="Odpoledne"
              todos={todos}
            />
            <DayPartRender
              dayPart="EVENING"
              handleCheck={handleCheck}
              handleLongClick={handleLongPress}
              setEditor={setEditor}
              title="Večer"
              todos={todos}
            />

            {editor && (
              <EditTodoModal
                close={() => setEditor(null)}
                initText=""
                remove={handleItemRemove}
                save={handleItemSave}
              />
            )}
          </MainContainer>
        </ScrollView>
      </MainContainerWrapper>
    </SafeAreaView>
  );
};

export default TodosScreen;
