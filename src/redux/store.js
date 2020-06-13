import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import auth from './auth/reducer';
import videos from './videos/reducer';
import users from './users/reducer';

const reducers = combineReducers({
  auth,
  videos,
  users
});

export default createStore(reducers, compose(applyMiddleware(thunk)));
