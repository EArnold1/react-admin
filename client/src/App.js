import { Admin, Resource, fetchUtils } from 'react-admin';
import { UserList, UserEdit } from './components/users';
import { CreditList, CreditEdit } from './components/credit';
import { TransactionsList, TransactionEdit } from './components/transactions';
import { WalletList, WalletEdit } from './components/wallet';
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
      <Resource name="transactions" list={TransactionsList} edit={TransactionEdit} />
      <Resource name="wallet" list={WalletList} edit={WalletEdit} />
    </Admin>
  )
}

export default App;
//
// 