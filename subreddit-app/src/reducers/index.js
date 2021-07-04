import { combineReducers } from 'redux';
import redditReducer from './redditReducer';

const rootReducer = combineReducers({redditReducer});

export default rootReducer;