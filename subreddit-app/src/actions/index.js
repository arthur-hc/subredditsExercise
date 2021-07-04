export const REQUEST_API = 'REQUEST_API';
export const GET_POSTS = 'GET_POSTS';
export const GET_ERROR = 'GET_POSTS';

// THIS ACTION ACTION SET isLoading: true
export const requestApiAction = () => ({type: REQUEST_API});

// THIS ACTION SET data WITH API RESPONSE IN SUCCESS CASE
export const getPostsAction = (reactData, frontEndData) => ({type: GET_POSTS, reactData, frontEndData})

// THIS ACTION SET data WITH API RESPONSE IN ERROR CASE
export const getErrorAction = (error) => ({type: GET_POSTS, error})

// THIS ACTION COMBINE ACTIONS IN A THANK DURING A REQUEST API PROCESS
export const fetchAPI = () => {
  return async (dispatch) => {
    dispatch(requestApiAction());
    try {
      const reactJsResponse = await fetch(`https://www.reddit.com/r/reactjs.json`);
      const frontEndResponse = await fetch(`https://www.reddit.com/r/frontend.json`);
      const reactJsJson = await reactJsResponse.json();
      const frontEndJson = await frontEndResponse.json();
      console.log(frontEndJson)
      dispatch(getPostsAction(reactJsJson.data.children, frontEndJson.data.children))
    } catch (error) {
      console.log(error);
      dispatch(getErrorAction(error))
    };
  };
};