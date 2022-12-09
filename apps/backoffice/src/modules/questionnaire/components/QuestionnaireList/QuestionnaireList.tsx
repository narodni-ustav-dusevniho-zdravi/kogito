import { ListProps } from 'ra-ui-materialui/lib/types';
import React, { FC } from 'react';
import { Datagrid, List, TextField, DateField, ShowButton, EditButton } from 'react-admin';

const QuestionnaireList: FC<ListProps> = (props) => {
    return (
        <List
            {...props}
            exporter={false}
            sort={{
                field: 'username',
                order: 'ASC',
            }}
        >
            <Datagrid rowClick="edit">
                <TextField source="name" />

                <ShowButton />
                <EditButton />
            </Datagrid>
        </List>
    );
};

export default QuestionnaireList;
