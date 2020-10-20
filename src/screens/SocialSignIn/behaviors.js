import * as AuthSession from 'expo-auth-session';
import jwtDecoder from 'jwt-decode';
import { pick } from 'lodash';

import {
  AUTH0_CLIENT_ID,
  AUTH0_DOMAIN,
  OKTA_CLIENT_ID,
  OKTA_DOMAIN,
  KEYCLOAK_DOMAIN,
  KEYCLOAK_CLIENT_ID,
  GOOGLE_DOMAIN,
  GOOGLE_CLIENT_ID,
} from 'react-native-dotenv';

import api from '@utils/api';
import { toQueryString, generateRandomValue } from '@utils/queryUtils';

export const LOGIN_STARTED = 'LOGIN_STARTED';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const LOGOUT_STARTED = 'LOGOUT_STARTED';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';

const initialState = {
  loginStarted: false,
  loginSuccess: false,
  loginError: false,
  logoutStarted: false,
  logoutSuccess: false,
  logoutError: false,
};

const PROFILE_ATTRIBUTES = [
  'name',
  'preferred_username',
  'given_name',
  'family_name',
  'nickname',
  'email',
  'primaryPhone',
  'mobilePhone',
  'emailAdress',
];

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_STARTED: {
      return {
        ...state,
        loginStarted: true,
        loginSuccess: false,
        loginError: false,
        profile: {},
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        oidc: action.response,
        profile: pick(jwtDecoder(action.response.id_token), PROFILE_ATTRIBUTES),
        loginStarted: false,
        loginSuccess: true,
        loginError: false,
      };
    }
    case LOGIN_ERROR: {
      return {
        ...state,
        loginStarted: false,
        loginSuccess: false,
        loginError: true,
        loginErrorMsg: JSON.stringify('Nnexpected login error ' + action.error),
      };
    }
    case LOGOUT_STARTED: {
      return {
        ...state,
        logoutStarted: true,
        logoutSuccess: false,
        logoutError: false,
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        profile: {},
        oidc: {},
        logoutStarted: false,
        logoutSuccess: true,
        logoutError: false,
      };
    }
    case LOGOUT_ERROR: {
      return {
        ...state,
        logoutStarted: false,
        logoutSuccess: false,
        logoutError: true,
      };
    }
    default:
      return state;
  }
}

export const getAuthConfig = (provider = 'keycloak') => {
  switch (provider) {
    case 'Google':
      return { domain: GOOGLE_DOMAIN, clientId: GOOGLE_CLIENT_ID };
    case 'Auth0':
      return { domain: AUTH0_DOMAIN, clientId: AUTH0_CLIENT_ID };
    case 'Okta':
      return { domain: OKTA_DOMAIN, clientId: OKTA_CLIENT_ID };
    default:
      return { domain: KEYCLOAK_DOMAIN, clientId: KEYCLOAK_CLIENT_ID };
  }
};

/**
 * Action creators
 */
export function doLogin(username, password, onLoginSuccess) {
  return dispatch => {
    dispatch({ type: LOGIN_STARTED });
    return api
      .get('/auth', { username: username, password: password })
      .then(response => {
        if (response.data.type === 'success') {
          if (response.data.params && response.data.params.error) {
            dispatch({
              type: LOGIN_ERROR,
              error: response.data.params.error_description,
            });
          } else {
            dispatch({ type: LOGIN_SUCCESS, response: response.data.params });
            onLoginSuccess();
          }
        }
      })
      .catch(() => {
        dispatch({ type: LOGIN_ERROR });
      });
  };
}

export function doRedirectLogin(provider, onLoginSuccess) {
  return dispatch => {
    const redirectUrl = AuthSession.getRedirectUrl();
    console.log('---> Redirect URL: ' + redirectUrl);
    const authConfig = getAuthConfig(provider);
    const AUTH_DOMAIN = authConfig.domain;
    const AUTH_CLIENT_ID = authConfig.clientId;

    const state = generateRandomValue(); //needed for Okta authentication
    const nonce = generateRandomValue(); //needed for Okta authentication
    return AuthSession.startAsync({
      authUrl:
        `${AUTH_DOMAIN}` +
        toQueryString({
          client_id: AUTH_CLIENT_ID,
          response_type: 'id_token token',
          scope: 'openid profile phone email',
          redirect_uri: redirectUrl,
          nonce: nonce,
          state: state,
        }),
    })
      .then(response => {
        if (response.type === 'success') {
          if (response.params && response.params.error) {
            dispatch({
              type: LOGIN_ERROR,
              error: response.params.error_description,
            });
          } else {
            dispatch({ type: LOGIN_SUCCESS, response: response.params });
            onLoginSuccess();
          }
        }
      })
      .catch(error => {
        dispatch({ type: LOGIN_ERROR, error: error });
      });
  };
}

export function doLogout(onLogoutSuccess) {
  return dispatch => {
    dispatch({ type: LOGOUT_STARTED });
    AuthSession && AuthSession.dismiss();
    dispatch({ type: LOGOUT_SUCCESS });
    onLogoutSuccess();
  };
}
