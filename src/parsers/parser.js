import _ from 'lodash';

export const isDeletion = (file1, file2, key) => {
  if (_.has(file1, key) && !_.has(file2, key)) {
    return true;
  }
  return false;
};

export const isAdd = (file1, file2, key) => {
  if (!_.has(file1, key) && _.has(file2, key)) {
    return true;
  }
  return false;
};

export const isСhanged = (file1, file2, key) => {
  if (_.has(file1, key) && _.has(file2, key) && file1[key] !== file2[key]) {
    return true;
  }
  return false;
};

export const isObjet = (file1, file2, key) => {
  if (_.isObject(file1[key]) && _.isObject(file2[key])) {
    return true;
  }
  return false;
};
