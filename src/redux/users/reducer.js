import { uniq } from 'lodash';
import Immutable from 'seamless-immutable';
import { UserTypes } from './actions';
import { AuthTypes } from '../auth/actions';
import { makeReducerCreator } from '../../utils/reduxUtils';
import { convertArrayToObject } from '../../utils/functions';

export const INITIAL_STATE = Immutable({
  userData: {},
  userIds: [],
  userPage: 1,
  userTotal: 0,

  loading: false,
  error: null
});

const getUserList = (state, { page, pageSize }) =>
  state.merge({
    loading: true,
    error: null
  });

const getUserListSuccess = (state, { response }) => {
  const formattedObjectData = state.userData.merge(
    convertArrayToObject(response.data, 'id')
  );

  return state
    .merge({
      userIds: uniq([...state.userIds, ...response.data.map(e => e.id)]),
      userTotal: response.total,
      loading: false,
      error: null
    })
    .set('userData', { ...state.userData, ...formattedObjectData });
};

const getUserListFailure = (state, { error }) =>
  state.merge({ loading: false, error: error });

const updateUserPage = (state, { page }) =>
  state.merge({
    userPage: page
  });

const logout = state => INITIAL_STATE;

export const user = makeReducerCreator(INITIAL_STATE, {
  [UserTypes.GET_USER_LIST]: getUserList,
  [UserTypes.GET_USER_LIST_SUCCESS]: getUserListSuccess,
  [UserTypes.GET_USER_LIST_FAILURE]: getUserListFailure,
  [UserTypes.UPDATE_USER_PAGE]: updateUserPage,
  [AuthTypes.LOGOUT]: logout
});
