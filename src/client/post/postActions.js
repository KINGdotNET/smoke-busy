import { createAsyncActionType } from '../helpers/stateHelpers';

export const GET_CONTENT = createAsyncActionType('@post/GET_CONTENT');

export const LIKE_POST = '@post/LIKE_POST';
export const LIKE_POST_START = '@post/LIKE_POST_START';
export const LIKE_POST_SUCCESS = '@post/LIKE_POST_SUCCESS';
export const LIKE_POST_ERROR = '@post/LIKE_POST_ERROR';

export const getContent = (author, permlink, afterLike) => (dispatch, getState, { steemAPI }) => {
  if (!author || !permlink) {
    return null;
  }

  return dispatch({
    type: GET_CONTENT.ACTION,
    payload: {
      promise: steemAPI.sendAsync('get_content', [author, permlink]).then(res => {
        if (res.author) return res;
        throw new Error('There is no such post');
      }),
    },
    meta: {
      author,
      permlink,
      afterLike,
    },
  }).catch(() => {});
};

export const votePost = (postId, author, permlink, weight = 10000) => ( dispatch, getState ) => {
  const { auth, posts } = getState();
  if (!auth.isAuthenticated) {
    return null;
  }

  let loggedin_jsonstr = localStorage.getItem("loggedin");
  let loggedin = JSON.parse(loggedin_jsonstr);
  let postingWif = loggedin.postingKey;

  const post = posts.list[postId];
  const voter = auth.user.name;

  return dispatch({
    type: LIKE_POST,
    payload: {
      // promise: steemConnectAPI.vote(voter, post.author, post.permlink, weight).then(res => {
      //   if (window.analytics) {
      //     window.analytics.track('Vote', {
      //       category: 'vote',
      //       label: 'submit',
      //       value: 1,
      //     });
      //   }
      //
      //   // Delay to make sure you get the latest data (unknown issue with API)
      //   setTimeout(() => dispatch(getContent(post.author, post.permlink, true)), 1000);
      //   return res;
      // }),
      promise: steemAPI.chainLib.broadcast.voteAsync(postingWif, voter, post.author, post.permlink, weight)
        .then(res => {
            // if (window.analytics) {
            //   window.analytics.track('Vote', {
            //     category: 'vote',
            //     label: 'submit',
            //     value: 1,
            //   });
            // }

            // Delay to make sure you get the latest data (unknown issue with API)
            setTimeout(() => dispatch(getContent(post.author, post.permlink, true)), 1000);
            return res;
          }),
    },
    meta: { postId, voter, weight },
  });
};
