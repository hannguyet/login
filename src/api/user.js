import { isUndefined } from 'lodash';
import { post, get } from './index';

export async function loginApi(params) {
  return post('/auth/login', params);
}

export async function getUsersApi(page, pageSize) {
  const numberPerPage = pageSize || 10;
  const offset = (page - 1) * numberPerPage;
  let baseUrl = '/users?' + `limit=${numberPerPage}&orderBy=-createdAt`;
  if (!isUndefined(offset) && offset >= 0) {
    baseUrl += `&offset=${offset}`;
  }

  return get(baseUrl);
}
