import { all } from 'redux-saga/effects';
import authSaga from './auth/sagas';
import userSaga from './users/sagas';

export default function* root() {
  yield all([...authSaga, ...userSaga]);
}
