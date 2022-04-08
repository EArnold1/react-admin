import React from 'react';
import { List, Edit, ChipField, DateField, Datagrid, TextField, EditButton, SimpleForm, TextInput } from 'react-admin'

export const TransactionsList = (props) => (
    <List title="All Transactions" {...props}>
        <Datagrid>
            {/* <TextField disabled source="id" /> */}
            <TextField source="name" />
            <TextField source="amount" />
            <TextField source="status" />
            <TextField source="currency" />
            <ChipField source="transactionid" label="Transaction id" />
            <DateField source="date" />
            {/* <EmailField source="email" /> */}
            <EditButton basePath='/transactions' />
        </Datagrid>
    </List>
);


export const TransactionEdit = (props) => (
    <Edit title={'Edit'} {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="status" />
        </SimpleForm>
    </Edit>
);