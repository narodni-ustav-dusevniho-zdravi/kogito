import {Record as RaRecord} from 'ra-core/esm/types';
import React, {FC} from 'react';
import {
  Edit,
  SimpleForm,
  TextInput,
  DateInput,
  BooleanInput,
  SelectArrayInput,
} from 'react-admin';
import {gql, useQuery} from '@apollo/client';

type TransformFC = (data: RaRecord) => RaRecord | Promise<RaRecord>;
const transform: TransformFC = (data) => {
  const mutateRecord = {...data};

  return mutateRecord;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Title: FC<any> = ({record}) => {
  return (
    <span>
      Změnit uživatele{' '}
      {record ? `"${record.lastName} ${record.firstName}"` : ''}
    </span>
  );
};

const UserEdit: FC = (props) => {
  return (
    <Edit {...props} transform={transform} title={<Title />}>
      <SimpleForm>
        <TextInput source="firstName" />
        <TextInput source="lastName" />
        <TextInput source="email" type="email" />
        <TextInput source="phoneNumber" type="tel" />

        {/*<DateInput source="birthDate" />*/}
        {/*<BooleanInput source="enabled" />*/}
        {/*<BooleanInput source="isAdmin" />*/}
      </SimpleForm>
    </Edit>
  );
};

export default UserEdit;
