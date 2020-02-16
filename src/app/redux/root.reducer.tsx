import { combineReducers } from 'redux';
import ReviewReducer from './reducers/review/review.reducer';

const rootReducer = combineReducers({
  review: ReviewReducer,
});

// export default persistReducer(persistConfig, rootReducer);
export default rootReducer;
