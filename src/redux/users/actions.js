import { makeConstantCreator, makeActionCreator } from '../../utils/reduxUtils';

export const UserTypes = makeConstantCreator(
  'GET_USER_LIST',
  'GET_USER_LIST_SUCCESS',
  'GET_USER_LIST_FAILURE',
  'UPDATE_USER_PAGE'
);

const getUserList = (page, pageSize) =>
  makeActionCreator(UserTypes.GET_USER_LIST, { page, pageSize });

const getUserListSuccess = response =>
  makeActionCreator(UserTypes.GET_USER_LIST_SUCCESS, { response });

const getUserListFailure = error =>
  makeActionCreator(UserTypes.GET_USER_LIST_FAILURE, { error });

const updateUserPage = page =>
  makeActionCreator(UserTypes.UPDATE_USER_PAGE, { page });

export default {
  getUserList,
  getUserListSuccess,
  getUserListFailure,
  updateUserPage
};
