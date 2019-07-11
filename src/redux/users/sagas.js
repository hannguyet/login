import { put, call, takeLatest } from 'redux-saga/effects';
import { getUsersApi } from '../../api/user';
import UserActions, { UserTypes } from './actions';

export function* getUserListSaga({ page, pageSize }) {
  try {
    const response = yield call(getUsersApi, page, pageSize);
    const newResponse = {
      data: response.results,
      total: response.total
    };
    yield put(UserActions.getUserListSuccess(newResponse));
  } catch (error) {
    yield put(UserActions.getUserListFailure(error));
  }
}

const userSaga = () => [takeLatest(UserTypes.GET_USER_LIST, getUserListSaga)];

export default userSaga();
