import { REQUEST_API, GET_POSTS, GET_ERROR } from '../actions';

const INITIAL_STATE = {
  isLoading: false,
  reactData: null,
  frontEndData: null,
  error: null,
};

const redditReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_API:
      return { ...state, isLoading: true }
    case GET_POSTS:
      return { ...state, isLoading: false, reactData: action.reactData, frontEndData: action.frontEndData }
    case GET_ERROR:
      return { ...state, isLoading: false, error: action.error }
    default:
      return state;
  };
};

export default redditReducer;
