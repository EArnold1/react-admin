import React from 'react';
import { List, Edit, SelectInput, Datagrid, TextField, EditButton, SimpleForm, TextInput } from 'react-admin'

export const CreditList = (props) => (
    <List title="All Credits" {...props}>
        <Datagrid>
            {/* <TextField disabled source="id" /> */}
            <TextField source="name" />
            <TextField source="balance" />
            <TextField source="profit" />
            <TextField source="withdrawn" />
            <TextField source="investment" />
            <TextField source="plan" />
            <TextField source="bitcoin" />
            <TextField source="ethereum" />
            <TextField source="bnb" />
            <TextField source="usdt" />
            {/* <EmailField source="email" /> */}
            <EditButton basePath='/credit' />
        </Datagrid>
    </List>
);


export const CreditEdit = (props) => (
    <Edit title={'Edit'} {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="balance" />
            <TextInput source="profit" />

            <SelectInput source="plan" choices={[
                { id: 'Basic', name: 'Basic' },
                { id: 'Premium', name: 'Premium' },
                { id: 'Executive', name: 'Executive' },
                { id: 'Contract', name: 'Contract' },
            ]} />
            <TextInput source="balance" />
            <TextInput source="withdrawn" />
            <TextInput source="bitcoin" />
            <TextInput source="bnb" />
            <TextInput source="ethereum" />
            <TextInput source="usdt" />
            <TextInput source="investment" />
        </SimpleForm>
    </Edit>
);