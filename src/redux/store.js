import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import auth from './auth/reducer';
import videos from './videos/reducer';

const reducers = combineReducers({
  auth,
  videos
});

export default createStore(reducers, compose(applyMiddleware(thunk)));
