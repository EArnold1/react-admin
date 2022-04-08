import { Admin, Resource, fetchUtils } from 'react-admin';
import { UserList, UserEdit } from './components/users';
import { CreditList, CreditEdit } from './components/credit';
import { TransactionsList } from './components/transactions';
import simpleRestProvider from 'ra-data-simple-rest';
import authProvider from './authProvider';

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  options.headers.set('auth-token', localStorage.getItem('token'));
  return fetchUtils.fetchJson(url, options);
};

const restClient = simpleRestProvider(`http://localhost:5000/api`, httpClient);

const App = () => {
  return (
    <Admin dataProvider={restClient} authProvider={authProvider}>
      <Resource name="users" list={UserList} edit={UserEdit} />
      <Resource name="credit" list={CreditList} edit={CreditEdit} />
      <Resource name="transactions" list={TransactionsList} />
    </Admin>
  )
}

export default App;
//
// 