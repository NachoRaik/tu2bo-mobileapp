import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import login from './auth/reducer';
import videos from './videos/reducer';

const reducers = combineReducers({
  login,
  videos
});

export default createStore(reducers, compose(applyMiddleware(thunk)));
