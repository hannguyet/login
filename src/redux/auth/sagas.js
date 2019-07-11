import { takeEvery, put, call } from 'redux-saga/effects';
import { notification } from 'antd';
import AuthActions, { AuthTypes } from './actions';
import { loginApi } from '../../api/user';

function* loginSaga({ params }) {
  try {
    const response = yield call(loginApi, params);
    if (response.token) {
      localStorage.setItem('sessionToken', response.token);
      localStorage.setItem('username', response.username);
      localStorage.setItem('id', response.id);
      yield put(AuthActions.loginSuccess(response));
      notification.success({
        message: 'Login success',
        description: 'Welcome to React Standard',
        duration: 2
      });
    } else {
      yield put(AuthActions.loginFailure(response));
    }
  } catch (error) {
    yield put(AuthActions.loginFailure(error));
    notification.error({
      message: 'Login failure',
      description: error.message,
      duration: 2
    });
  }
}

function* logoutSaga() {
  try {
    localStorage.clear('sessionToken');
    localStorage.clear('sessionToken');
    localStorage.clear('username');
    localStorage.clear('id');
    yield put();
  } catch (error) {
    // /logic here
  }
}

export default [
  takeEvery(AuthTypes.LOGIN, loginSaga),
  takeEvery(AuthTypes.LOGOUT, logoutSaga)
];
