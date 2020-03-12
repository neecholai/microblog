import { combineReducers } from 'redux';

import { 
  postReducer as postsState, 
  titleReducer as titlesState
} from './reducers';

const rootReducer = combineReducers({
  postsState,
  titlesState
})

export default rootReducer;