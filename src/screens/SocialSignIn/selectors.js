export const isLoginSuccess = state => state.signin.loginSuccess;
export const isLoginError = state => state.signin.loginError;
export const isLoginStarted = state => state.signin.loginStarted;
export const getLoginErrorMsg = state => state.signin.loginErrorMsg;
export const getUserProfile = state => state.signin.profile;

export const isLogoutSuccess = state => state.signin.logoutSuccess;
export const isLogoutError = state => state.signin.logoutError;
export const isLogoutStarted = state => state.signin.logoutStarted;

export const getOidcData = state => (state.signin ? state.signin.oidc : null);

export const getAccessToken = state => {
  const oidcData = getOidcData(state);
  return oidcData ? oidcData.access_token || '' : '';
};
