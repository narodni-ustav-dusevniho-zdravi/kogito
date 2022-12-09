import {ListProps} from 'ra-ui-materialui/lib/types';
import React, {FC} from 'react';
import {
  Datagrid,
  List,
  TextField,
  DateField,
  ShowButton,
  CreateButton,
  EditButton,
  TopToolbar,
  BooleanField,
} from 'react-admin';

const ListActions: FC = (props) => {
  return (
    <TopToolbar {...props}>
      <CreateButton basePath="/User" />
    </TopToolbar>
  );
};

const UserList: FC<ListProps> = (props) => {
  return (
    <List
      {...props}
      exporter={false}
      sort={{
        field: 'username',
        order: 'ASC',
      }}
      actions={<ListActions />}>
      <Datagrid rowClick="show">
        <DateField source="createdAt" />
        <TextField source="phoneNumber" />
        <TextField source="firstName" />
        <TextField source="lastName" />
        <TextField source="group" />
        <ShowButton />
      </Datagrid>
    </List>
  );
};

export default UserList;
