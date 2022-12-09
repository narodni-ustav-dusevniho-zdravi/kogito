import React, { FC } from 'react';
import { Datagrid, List, TextField } from 'react-admin';

const QuestionsList: FC = (props) => {
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
            </Datagrid>
        </List>
    );
};

export default QuestionsList;
