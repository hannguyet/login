import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { auth } from './auth/reducer';
import { user } from './users/reducer';

export default history =>
  combineReducers({
    router: connectRouter(history),
    auth,
    user
  });
