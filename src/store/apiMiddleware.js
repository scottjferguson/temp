import 'es6-symbol/implement';
import api from '@utils/api';
import { parse, stringify } from 'query-string';
import { getAccessToken } from '@screens/SocialSignIn/selectors';
import { API_URL, API_REQUEST_TIMEOUT } from 'react-native-dotenv';

export const getEndpointToCall = (endpoint, refresh) => {
  if (refresh) {
    const parts = endpoint.split('?');
    if (parts.length === 1) {
      return `${endpoint}?refresh=true`;
    }
    const parsedEndpoint = parse(`?${parts[1]}`);
    parsedEndpoint.refresh = true;
    return `${parts[0]}?${stringify(parsedEndpoint)}`;
  }
  return endpoint;
};

export const getMethod = (method = 'get') => {
  switch (method) {
    case 'post':
      return { httpMethod: api.post, hasData: true };
    case 'put':
      return { httpMethod: api.put, hasData: true };
    case 'patch':
      return { httpMethod: api.patch, hasData: true };
    case 'delete':
      return { httpMethod: api.delete, hasData: false };
    default:
      return { httpMethod: api.get, hasData: false };
  }
};

// Fetches an API response and normalizes the result JSON
export const callApi = async (
  store,
  endpoint,
  retries = 0,
  refresh = false,
  method = 'get',
  data = undefined
) => {
  const { httpMethod, hasData } = getMethod(method);
  const accessToken = getAccessToken(store.getState());
  const config = {
    timeout: API_REQUEST_TIMEOUT,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      X_Username: `TestApp`
    },
  };
  try {
    const response = await httpMethod(
      API_URL + getEndpointToCall(endpoint, refresh),
      hasData ? data : config,
      hasData ? config : undefined
    );
    return response.data;
  } catch (err) {
    if (retries > 0) {
      return callApi(endpoint, retries - 1);
    }
    return Promise.reject(JSON.stringify(err));
  }
};

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('Call API');

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  let { endpoint, retries, refresh } = callAPI;
  const { method, data } = callAPI;
  const { type, params = {} } = callAPI;

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }
  const keys = Object.keys(type);
  if (!Array.isArray(keys) || keys.length !== 4) {
    throw new Error('Expected an array of three action type.');
  }
  if (!keys.every(type => typeof type === 'string')) {
    throw new Error('Expected action type to be strings.');
  }

  function actionWith(actionData) {
    const finalAction = Object.assign({}, action, actionData);
    delete finalAction[CALL_API];
    return finalAction;
  }

  if (!retries) {
    retries = 0;
  }
  if (!refresh) {
    refresh = false;
  }
  next(actionWith({ type: type.BEGIN, ...params }));
  return callApi(store, endpoint, retries, refresh, method, data).then(
    response =>
      next(
        actionWith({
          response,
          type: type.SUCCESS,
          ...params,
        })
      ),
    error =>
      next(
        actionWith({
          type: type.ERROR,
          error: JSON.parse(error) || 'Something bad happened',
          ...params,
        })
      )
  );
};
