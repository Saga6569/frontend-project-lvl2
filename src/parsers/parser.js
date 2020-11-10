import _ from 'lodash';
import { mkfile, mkdir } from '@hexlet/immutable-fs-trees';
import { keyBattery } from '../utils.js';

const isDeletion = (file1, file2, key) => {
  if (_.has(file1, key) && !_.has(file2, key)) {
    return true;
  }
  return false;
};

const isAdd = (file1, file2, key) => {
  if (!_.has(file1, key) && _.has(file2, key)) {
    return true;
  }
  return false;
};

const isСhanged = (file1, file2, key) => {
  if (_.has(file1, key) && _.has(file2, key) && file1[key] !== file2[key]) {
    return true;
  }
  return false;
};

const isObjet = (file1, file2, key) => {
  if (_.isObject(file1[key]) && _.isObject(file2[key])) {
    return true;
  }
  return false;
};

const parser = (file1, file2) => {
  const arrKeyfile = keyBattery(file1, file2).sort();
  const children = arrKeyfile.reduce((acc, key) => {
    if (isObjet(file1, file2, key)) {
      const file = mkdir(key, parser(file1[key], file2[key]));
      acc.push(file);
    } else if (isСhanged(file1, file2, key)) {
      const file = mkfile(key, { '-': file1[key], '+': file2[key] });
      acc.push(file);
    } else if (isAdd(file1, file2, key)) {
      const file = mkfile(key, { '+': file2[key] });
      acc.push(file);
    } else if (isDeletion(file1, file2, key)) {
      const file = mkfile(key, { '-': file1[key] });
      acc.push(file);
    } else {
      const file = mkfile(key, { ' ': file1[key] });
      acc.push(file);
    }
    return acc;
  }, []);
  return children;
};

export default parser;
