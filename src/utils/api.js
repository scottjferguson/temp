import axios from 'axios';
import { API_URL, API_REQUEST_TIMEOUT } from 'react-native-dotenv';

import MockAdapter from 'axios-mock-adapter';
import { categoriesData } from '../../api/mockData/categories';
import { expensesData } from '../../api/mockData/expenses';
import { authData } from '../../api/mockData/auth';

// This sets the mock adapter on the default instance. comment this block if you are using a backend api (yarn server)
var mock = new MockAdapter(axios, { delayResponse: 10 });
mock.onGet('/auth').reply(200, authData);
mock.onPost('/auth').reply(200);
mock.onPost('/logout').reply(200);
mock.onGet('/password').reply(200);
mock.onGet('/expenses').reply(200, expensesData);
mock.onGet('/expenses?q=data&&_page=1&_limit=15').reply(200, expensesData);
mock.onGet('/expenses/export').reply(200, expensesData);
mock.onGet('/categories').reply(200, categoriesData);
mock.onPost('/expenses').reply(200);
mock.onPost('/categories').reply(function(config) {
  console.log(config);
  return [200, {}];
});
mock.onDelete(/\/expenses\/\d+/).reply(function(config) {
  console.log(config);
  return [200, {}];
});
// end mock api call

const instance = axios.create({
  baseURL: API_URL,
  timeout: API_REQUEST_TIMEOUT,
});

export default instance;
