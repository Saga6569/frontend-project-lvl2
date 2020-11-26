/* eslint-disable no-param-reassign */
import _ from 'lodash';
import { keyBattery, isNumber } from '../utils.js';

const dataDiffTree = (data1, data2, key) => {
  if (_.isObject(data1[key]) && _.isObject(data2[key])) {
    const keys = keyBattery(data1[key], data2[key]);
    const iter = keys.map((keyIter) => dataDiffTree(data1[key], data2[key], keyIter));
    return { name: key, type: 'nested', children: [...iter] };
  } if (_.has(data1, key) && _.has(data2, key) && data1[key] !== data2[key]) {
    return {
      name: key, type: 'updated', oldValue: data1[key], newValue: data2[key],
    };
  } if (!_.has(data1, key) && _.has(data2, key)) {
    return { name: key, type: 'add', value: data2[key] };
  } if (_.has(data1, key) && !_.has(data2, key)) {
    return { name: key, type: 'deletion', value: data1[key] };
  }
  return { name: key, type: 'equally', value: data1[key] };
};

const dataDiffTreeIni = (object) => {
  const { type } = object;
  if (type === 'nested') {
    const { children } = object;
    return children.map((child) => child);
  } if (type === 'updated') {
    object.oldValue = isNumber(object.oldValue);
    object.newValue = isNumber(object.newValue);
    return object;
  }
  object.value = isNumber(object.value);
  return object;
};

const creatingTree = (data) => {
  const { data1, data2 } = data;
  const keys = keyBattery(data1, data2);
  const result = keys.flatMap((key) => dataDiffTree(data1, data2, key));
  return result;
};

const diff = (data) => {
  const tree = creatingTree(data);
  if (!_.has(data, 'conditions')) {
    return tree;
  }
  return tree.flatMap((child) => dataDiffTreeIni(child));
};

export default diff;
