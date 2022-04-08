import React from 'react';
import { List, Edit, Datagrid, EmailField, TextField, SelectInput, EditButton, SimpleForm, TextInput } from 'react-admin';

export const UserList = (props) => (
    <List title="All users" {...props}>
        <Datagrid>
            <TextField source="firstname" />
            <TextField source="lastname" />
            <EmailField source="email" />
            <TextField source="access" />
            <EditButton basePath='/users' />
        </Datagrid>
    </List>
);

export const UserEdit = (props) => (
    <Edit title={'Edit'} {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="firstname" />
            <TextInput source="lastname" />

            <SelectInput source="access" choices={[
                { id: 'activated', name: 'activated' },
                { id: 'deactivated', name: 'deactivated' },
            ]} />
        </SimpleForm>
    </Edit>
);