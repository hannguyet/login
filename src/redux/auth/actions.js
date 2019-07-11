import { makeConstantCreator, makeActionCreator } from '../../utils/reduxUtils';

export const AuthTypes = makeConstantCreator(
  'LOGIN',
  'LOGIN_SUCCESS',
  'LOGIN_FAILURE',

  'LOGOUT'
);

const login = params => makeActionCreator(AuthTypes.LOGIN, { params });

const loginSuccess = response =>
  makeActionCreator(AuthTypes.LOGIN_SUCCESS, { response });

const loginFailure = error =>
  makeActionCreator(AuthTypes.LOGIN_FAILURE, { error });

const logout = () => makeActionCreator(AuthTypes.LOGOUT);

export default {
  login,
  loginSuccess,
  loginFailure,
  logout
};
