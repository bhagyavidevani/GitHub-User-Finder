
import axios from 'axios';

export const USER_ENTER_REQUEST = 'USER_ENTER_REQUEST';
export const USER_ENTER_SUCCESS = 'USER_ENTER_SUCCESS';
export const USER_ENTER_FAILURE = 'USER_ENTER_FAILURE';

export const userEnterAsync = (username) => async (dispatch) => {
  try {
    dispatch({ type: USER_ENTER_REQUEST });

    const userResponse = await axios.get(`https://api.github.com/users/${username}`);
    const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos`);

    dispatch({
      type: USER_ENTER_SUCCESS,
      payload: { user: userResponse.data, repos: reposResponse.data },
    });
  } catch (error) {
    dispatch({
      type: USER_ENTER_FAILURE,
      payload: error.message,
    });
  }
};
