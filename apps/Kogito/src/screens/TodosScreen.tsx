import React, {FC, useCallback, useState} from 'react';
import {Alert, SafeAreaView, ScrollView} from 'react-native';
import MainContainerWrapper from '../components/container/MainContainerWrapper';
import MainHeader from '../components/container/MainHeader';
import Text from '../components/primitives/Text';
import MainContainer from '../components/container/MainContainer';
import {DayPart, Todo, useTodos} from '../modules/diary/useTodos';
import BoxAdd from '../components/primitives/BoxAdd';
import EditTodoModal from '../modules/diary/modal/EditTodoModal/EditTodoModal';
import BoxCheckbox from '../components/primitives/BoxCheckbox';
import useMixPanelTracking from '../tracking/useMixPanelTracking';
import {useFocusEffect} from '@react-navigation/native';

type EditorSettings = {
  id: string | null;
  dayPart: DayPart;
  title: string;
};

type DayPartRender = {
  title: string;
  dayPart: DayPart;
  todos: Todo[];
  handleCheck: (id: string, checked: boolean) => void;
  handleLongClick: (id: string) => void;
  setEditor: (settings: EditorSettings) => void;
};

const DayPartRender: FC<DayPartRender> = ({
  title,
  dayPart,
  todos,
  handleCheck,
  handleLongClick,
  setEditor,
}) => {
  return (
    <>
      <Text textVariant={'headerSub2'} colorVariant={'gray'}>
        {title}
      </Text>
      {todos &&
        todos
          .filter(todo => todo.dayPart === dayPart)
          .map(todo => (
            <BoxCheckbox
              title={todo.title}
              checked={todo.checked}
              onChange={value => handleCheck(todo.id, value)}
              onLongPress={() => handleLongClick(todo.id)}
            />
          ))}
      <BoxAdd
        onPress={() => setEditor({id: null, title: '', dayPart: dayPart})}
      />
    </>
  );
};

const TodosScreen: FC = () => {
  const {todos, refetch, saveTodo, editTodo, trackTodo, removeTodo} =
    useTodos();
  const [editor, setEditor] = useState<EditorSettings | null>(null);
  const {
    trackTodoScreenOpened,
    trackTodoCreated,
    trackTodoCompleted,
    trackTodoDeleted,
  } = useMixPanelTracking();

  const handleItemSave = async (title: string) => {
    if (editor) {
      await saveTodo({
        id: editor.id,
        dayPart: editor.dayPart,
        title: title,
      });
      setEditor(null);
      trackTodoCreated();
    }
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
      trackTodoCompleted();
    }
  };

  const handleLongPress = async (id: string) => {
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
          trackTodoDeleted();
          refetch();
        },
      },
    ]);
  };

  useFocusEffect(
    useCallback(() => {
      trackTodoScreenOpened();
    }, []),
  );

  return (
    <SafeAreaView>
      <MainContainerWrapper>
        <MainHeader />
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <MainContainer align={null} page={'subWithoutFooter'} color={'white'}>
            <Text textVariant={'bigHeader'} add={true}>
              Plánovač
            </Text>

            <DayPartRender
              title="Ráno"
              dayPart="MORNING"
              todos={todos}
              handleCheck={handleCheck}
              handleLongClick={handleLongPress}
              setEditor={setEditor}
            />
            <DayPartRender
              title="Odpoledne"
              dayPart="AFTERNOON"
              todos={todos}
              handleCheck={handleCheck}
              handleLongClick={handleLongPress}
              setEditor={setEditor}
            />
            <DayPartRender
              title="Večer"
              dayPart="EVENING"
              todos={todos}
              handleCheck={handleCheck}
              handleLongClick={handleLongPress}
              setEditor={setEditor}
            />

            {editor && (
              <EditTodoModal
                initText={''}
                save={handleItemSave}
                close={() => setEditor(null)}
                remove={handleItemRemove}
              />
            )}
          </MainContainer>
        </ScrollView>
      </MainContainerWrapper>
    </SafeAreaView>
  );
};

export default TodosScreen;
