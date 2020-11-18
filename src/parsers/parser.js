import _ from 'lodash';
import { keyBattery } from '../utils.js';

const isDeletion = (data1, data2, key) => {
  if (_.has(data1, key) && !_.has(data2, key)) {
    return true;
  }
  return false;
};

const isAdd = (data1, data2, key) => {
  if (!_.has(data1, key) && _.has(data2, key)) {
    return true;
  }
  return false;
};

const isСhanged = (data1, data2, key) => {
  if (_.has(data1, key) && _.has(data2, key) && data1[key] !== data2[key]) {
    return true;
  }
  return false;
};

const isObjet = (data1, data2, key) => {
  if (_.isObject(data1[key]) && _.isObject(data2[key])) {
    return true;
  }
  return false;
};

const isNumeric = (value) => {
  // eslint-disable-next-line no-restricted-globals
  if (!isNaN(value)) {
    return Number(value);
  }
  return value;
};

const parser = (data1, data2) => {
  const arrKeyValue = keyBattery(data1, data2).sort();
  const children = arrKeyValue.reduce((acc, key) => {
    if (isObjet(data1, data2, key)) {
      const file = [...[key], parser(data1[key], data2[key])];
      acc.push(file);
    } else if (isСhanged(data1, data2, key)) {
      const value1 = isNumeric(data1[key]);
      const value2 = isNumeric(data2[key]);
      const file = { updated: { [key]: [value1, value2] } };
      acc.push(file);
    } else if (isAdd(data1, data2, key)) {
      const value = isNumeric(data2[key]);
      const file = { add: { [key]: value } };
      acc.push(file);
    } else if (isDeletion(data1, data2, key)) {
      const value = isNumeric(data1[key]);
      const file = { deletion: { [key]: value } };
      acc.push(file);
    } else {
      const value = isNumeric(data1[key]);
      const file = { equally: { [key]: value } };
      acc.push(file);
    }
    return acc;
  }, []);
  return children;
};

export default parser;
