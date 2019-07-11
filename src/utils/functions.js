import _ from 'lodash';
export function convertArrayToObject(arr, key) {
  return _.reduce(
    arr,
    (acc, cur) => {
      acc[cur[key]] = cur;
      return acc;
    },
    {}
  );
}
