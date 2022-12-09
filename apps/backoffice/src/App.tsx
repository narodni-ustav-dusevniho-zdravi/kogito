import React, {FC, useEffect} from 'react';
import {Admin, Resource} from 'react-admin';
import {useDataProvider, useAuthProvider} from './providers';
import {UserList, UserShow, UserEdit, UserCreate} from './modules/users';
import {QuestionnaireList, QuestionnaireEdit} from './modules/questionnaire';
import Dashboard from './components/Dashboard';

const App: FC = () => {
  const dataProvider = useDataProvider();
  const authProvider = useAuthProvider();

  useEffect(() => {
    document.title = 'Kogito backoffice';
  }, []);

  if (!dataProvider) {
    return <div>Loading</div>;
  }

  return (
    <Admin
      locale="cs"
      dashboard={Dashboard}
      dataProvider={dataProvider}
      authProvider={authProvider}
      title="Kogito backoffice">
      <Resource
        name="User"
        list={UserList}
        show={UserShow}
        // edit={UserEdit}
        create={UserCreate}
      />
      <Resource name="AclRole" />
    </Admin>
  );
};

export default App;
