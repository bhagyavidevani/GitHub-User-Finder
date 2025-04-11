import { USER_ENTER_REQUEST, USER_ENTER_SUCCESS, USER_ENTER_FAILURE } from '../Action/Githubaction';

const initialState = {
  loading: false,
  data: null,
  repos: null,
  error: null,
};

const Githubreducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_ENTER_REQUEST:
      return { ...state, loading: true, error: null };
    case USER_ENTER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.user,
        repos: action.payload.repos,
      };
    case USER_ENTER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default Githubreducer;
