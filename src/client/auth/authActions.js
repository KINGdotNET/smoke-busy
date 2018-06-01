import Cookie from 'js-cookie';
import { createAction } from 'redux-actions';
import { push } from 'react-router-redux';
import { getAuthenticatedUserName, getIsAuthenticated } from '../reducers';
import { createAsyncActionType } from '../helpers/stateHelpers';
import { getFollowing } from '../user/userActions';
import busyAPI from '../busyAPI';
import {notify} from "../app/Notification/notificationActions";

export const LOGIN = '@auth/LOGIN';
export const LOGIN_START = '@auth/LOGIN_START';
export const LOGIN_SUCCESS = '@auth/LOGIN_SUCCESS';
export const LOGIN_ERROR = '@auth/LOGIN_ERROR';

export const RELOAD = '@auth/RELOAD';
export const RELOAD_START = '@auth/RELOAD_START';
export const RELOAD_SUCCESS = '@auth/RELOAD_SUCCESS';
export const RELOAD_ERROR = '@auth/RELOAD_ERROR';

export const LOGOUT = '@auth/LOGOUT';

export const UPDATE_SC2_USER_METADATA = createAsyncActionType('@auth/UPDATE_SC2_USER_METADATA');
export const BUSY_LOGIN = createAsyncActionType('@auth/BUSY_LOGIN');

const loginError = createAction(LOGIN_ERROR);

export const login = () => (dispatch, getState, { steemAPI } ) => {
  let promise = Promise.resolve(null);

  if (getIsAuthenticated(getState())) {
    promise = Promise.resolve(null);
  } else {
    try {
      let loggedin_jsonstr = localStorage.getItem("loggedin");
      let loggedin = JSON.parse(loggedin_jsonstr);
      let username = loggedin.username;

      promise = steemAPI.sendAsync('get_accounts', [[username]])
        .then(apiRes => ({
          account: apiRes[0],
          user_metadata: {}
        }))
        .catch(() => dispatch(loginError()));
    } catch (e) {
      promise = Promise.reject(new Error('There is no loggedin present'));
    }
  }

  return dispatch({
    type: LOGIN,
    payload: {
      promise,
    },
    meta: {
      refresh: false,
    },
  }).catch(() => dispatch(loginError()));
};

export const loginWithPostingKey = (username, postingKey) => async (dispatch, getState, { steemAPI }) => {
  let account = null; //

  // validating if key is correct
  try {
    account = await steemAPI.sendAsync('get_accounts', [[username]]).then(apiRes => (apiRes[0]));

    let pubWif = account.posting.key_auths[0][0];
    if (!steemAPI.chainLib.auth.wifIsValid(postingKey, pubWif)) {
      throw new Error("Invalid key");
    }
  } catch (e) {
    dispatch(notify('Invalid account or key', 'error'));
    return;
  }

  // dispatch login OK
  dispatch({
    type: LOGIN_SUCCESS,
    meta: {
      refresh: false
    },
    payload: {
      account: account,
      user_metadata: {
      },
    },
  });

  // save to localStorage
  const loggedin = {
    username: username,
    postingKey: postingKey
  };
  localStorage.setItem("loggedin", JSON.stringify(loggedin));

  // redirect to feed page
  dispatch(push('/'));
};

// export const login = () => async (dispatch, getState) => {
//   let promise = Promise.resolve(null);
//
//   if (getIsAuthenticated(getState())) {
//     promise = Promise.resolve(null);
//   // } else if (!steemConnectAPI.options.accessToken) {
//   //   promise = Promise.reject(new Error('There is not accessToken present'));
//   // } else {
//   //   promise = steemConnectAPI.me().catch(() => dispatch(loginError()));
//   }
//
//   return dispatch({
//     type: LOGIN,
//     payload: {
//       promise,
//     },
//     meta: {
//       refresh: getIsAuthenticated(getState()),
//     },
//   }).catch(() => dispatch(loginError()));
// };

export const getCurrentUserFollowing = () => dispatch => dispatch(getFollowing());

export const reload = () => (dispatch, getState) =>
  dispatch({
    type: RELOAD,
    payload: {
      // promise: steemConnectAPI.me(),
    },
  });

export const logout = () => (dispatch, getState) => {
  // steemConnectAPI.revokeToken();
  Cookie.remove('access_token');

  localStorage.removeItem("loggedin");

  dispatch({
    type: LOGOUT,
  });
};

export const getUpdatedSCUserMetadata = () => (dispatch, getState) =>
  dispatch({
    type: UPDATE_SC2_USER_METADATA.ACTION,
    payload: {
      // promise: steemConnectAPI.me(),
    },
  });

export const busyLogin = () => (dispatch, getState) => {
  const accessToken = Cookie.get('access_token');
  const state = getState();

  if (!getIsAuthenticated(state)) {
    return dispatch({ type: BUSY_LOGIN.ERROR });
  }

  const targetUsername = getAuthenticatedUserName(state);

  return dispatch({
    type: BUSY_LOGIN.ACTION,
    meta: targetUsername,
    payload: {
      promise: busyAPI.sendAsync('login', [accessToken]),
    },
  });
};
