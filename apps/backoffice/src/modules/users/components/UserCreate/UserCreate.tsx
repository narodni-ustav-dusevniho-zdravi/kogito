import React, {FC, useEffect, useState} from 'react';
import {Create, SelectArrayInput, SimpleForm, TextInput} from 'react-admin';
import {gql, useQuery} from '@apollo/client';
import {BackofficeApolloLink} from '../../../../providers/useDataProvider';

const UserCreate: FC = (props) => {
  return (
    <Create {...props} title={'Kogito - create user'}>
      <SimpleForm>
        <TextInput
          source="phoneNumber"
          type="tel"
          required={true}
          defaultValue="+420"
        />
      </SimpleForm>
    </Create>
  );
};

export default UserCreate;
