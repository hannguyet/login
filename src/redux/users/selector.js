import { createSelector } from 'reselect';
import _ from 'lodash';

const getUserData = (state, props) => state.user.userData;
const getUserIds = (state, props) => state.user.userIds;

export const getUserListSelector = createSelector(
  [getUserData, getUserIds],
  (data, ids) => _.map(ids, id => data[id])
);
