import Immutable from 'seamless-immutable';
import { AuthTypes } from './actions';
import { makeReducerCreator } from '../../utils/reduxUtils';

export const INITIAL_STATE = Immutable({
  isAuthenticated: !!localStorage.getItem('sessionToken'),
  data: {
    username: localStorage.getItem('username') || '',
    id: localStorage.getItem('id')
  },
  loginError: false,
  loginSuccess: false
});

const loginSuccess = state => ({
  ...state,
  isAuthenticated: true,
  loginError: false,
  loginSuccess: true
});

const loginFailure = (state, { error }) => ({
  ...state,
  isAuthenticated: false,
  loginError: error,
  loginSuccess: false
});

const logout = () => ({ ...INITIAL_STATE, isAuthenticated: false });

export const auth = makeReducerCreator(INITIAL_STATE, {
  [AuthTypes.LOGIN_SUCCESS]: loginSuccess,
  [AuthTypes.LOGIN_FAILURE]: loginFailure,
  [AuthTypes.LOGOUT]: logout
});
