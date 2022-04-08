import React from 'react';
import { List, Edit, Datagrid, TextField, EditButton, SimpleForm, TextInput } from 'react-admin'

export const WalletList = (props) => (
    <List title="All Transactions" {...props}>
        <Datagrid>
            {/* <TextField disabled source="id" /> */}
            <TextField source="bitcoin" />
            <TextField source="ethereum" />
            <TextField source="usdt" />
            <TextField source="bnb" />
            <EditButton basePath='/wallet' />
        </Datagrid>
    </List>
);


export const WalletEdit = (props) => (
    <Edit title={'Edit'} {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="bitcoin" />
            <TextInput source="ethereum" />
            <TextInput source="bnb" />
            <TextInput source="usdt" />
        </SimpleForm>
    </Edit>
);