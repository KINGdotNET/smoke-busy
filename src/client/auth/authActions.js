import Cookie from 'js-cookie';
import { createAction } from 'redux-actions';
import { getAuthenticatedUserName, getIsAuthenticated } from '../reducers';
import { createAsyncActionType } from '../helpers/stateHelpers';
import { getFollowing } from '../user/userActions';
import busyAPI from '../busyAPI';

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

export const loginTest = () => (dispatch, getState) => {
  return dispatch({
    type: LOGIN_SUCCESS,
    payload: { account: 'baabeetaa' },
    meta: {
      refresh: false
    },
    payload: {
      account:  {
        "id":8,
        name: "baabeetaa",
        "owner":{
          "weight_threshold":1,
          "account_auths":[

          ],
          "key_auths":[
            [
              "WLS4wntNfSFYedJvBSffErCvDXjyXRhfTYBvHj2VUk3EzpVHWnnWg",
              1
            ]
          ]
        },
        "active":{
          "weight_threshold":1,
          "account_auths":[

          ],
          "key_auths":[
            [
              "WLS8fX1NpiXoaGDgxbpHh4MTLAoT8Qb48C6x2gH2v3bcpH2EuVU6W",
              1
            ]
          ]
        },
        "posting":{
          "weight_threshold":1,
          "account_auths":[

          ],
          "key_auths":[
            [
              "WLS82mbwFEMnjDzn2FJSyZS54XcW2pUpc7smPbTt4YqgNk8rX5CQi",
              1
            ]
          ]
        },
        "memo_key":"WLS8Hktpgca3M1c8XKBMcxqCiTz3fTvuwxSWtCbKnCvjWGe8mQbPf",
        "json_metadata":"",
        "proxy":"",
        "last_owner_update":"1970-01-01T00:00:00",
        "last_account_update":"1970-01-01T00:00:00",
        "created":"2018-03-21T06:55:36",
        "mined":false,
        "owner_challenged":false,
        "active_challenged":false,
        "last_owner_proved":"1970-01-01T00:00:00",
        "last_active_proved":"1970-01-01T00:00:00",
        "recovery_account":"initminer",
        "last_account_recovery":"1970-01-01T00:00:00",
        "reset_account":"null",
        "comment_count":0,
        "lifetime_vote_count":0,
        "post_count":23,
        "can_vote":true,
        "voting_power":9557,
        "last_vote_time":"2018-04-29T19:56:00",
        "balance":"0.000 WLS",
        "savings_balance":"0.000 WLS",
        "sbd_balance":"0.000 SBD",
        "sbd_seconds":"0",
        "sbd_seconds_last_update":"2018-04-28T12:27:57",
        "sbd_last_interest_payment":"1970-01-01T00:00:00",
        "savings_sbd_balance":"0.000 SBD",
        "savings_sbd_seconds":"0",
        "savings_sbd_seconds_last_update":"1970-01-01T00:00:00",
        "savings_sbd_last_interest_payment":"1970-01-01T00:00:00",
        "savings_withdraw_requests":0,
        "reward_sbd_balance":"0.000 SBD",
        "reward_steem_balance":"0.000 WLS",
        "reward_vesting_balance":"5553351.892021 VESTS",
        "reward_vesting_steem":"90.712 WLS",
        "vesting_shares":"2175497.108249 VESTS",
        "delegated_vesting_shares":"0.000000 VESTS",
        "received_vesting_shares":"0.000000 VESTS",
        "vesting_withdraw_rate":"0.000000 VESTS",
        "next_vesting_withdrawal":"1969-12-31T23:59:59",
        "withdrawn":0,
        "to_withdraw":0,
        "withdraw_routes":0,
        "curation_rewards":405,
        "posting_rewards":91700,
        "proxied_vsf_votes":[
          0,
          0,
          0,
          0
        ],
        "witnesses_voted_for":3,
        "average_bandwidth":2077091283,
        "lifetime_bandwidth":"10959000000",
        "last_bandwidth_update":"2018-05-01T01:25:09",
        "average_market_bandwidth":0,
        "lifetime_market_bandwidth":0,
        "last_market_bandwidth_update":"1970-01-01T00:00:00",
        "last_post":"2018-05-01T01:25:09",
        "last_root_post":"2018-05-01T00:53:42",
        "vesting_balance":"0.000 WLS",
        "reputation":"568884385732",
        "transfer_history":[

        ],
        "market_history":[

        ],
        "post_history":[

        ],
        "vote_history":[

        ],
        "other_history":[

        ],
        "witness_votes":[
          "cyberdust",
          "intelliguy",
          "thevenin"
        ],
        "tags_usage":[

        ],
        "guest_bloggers":[

        ]
      },
      user_metadata: {

      },
    },
  }).catch(() => dispatch(loginError()));
};

export const login = () => (dispatch, getState) => {
  let promise = Promise.resolve(null);

  if (getIsAuthenticated(getState())) {
    promise = Promise.resolve(null);
  // } else if (!steemConnectAPI.options.accessToken) {
  //   promise = Promise.reject(new Error('There is not accessToken present'));
  // } else {
  //   promise = steemConnectAPI.me().catch(() => dispatch(loginError()));
  }

  return dispatch({
    type: LOGIN,
    payload: {
      promise,
    },
    meta: {
      refresh: getIsAuthenticated(getState()),
    },
  }).catch(() => dispatch(loginError()));
};

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
