/* eslint-disable no-param-reassign */
import _ from 'lodash';
import { isNumber } from '../utils.js';

const dataDiffTree = (data1, data2, key) => {
  if (_.isObject(data1[key]) && _.isObject(data2[key])) {
    const keysData1 = Object.keys(data1[key]);
    const keysData2 = Object.keys(data2[key]);
    const keys = _.union(keysData1, keysData2).sort();
    const iter = keys.map((keyIter) => dataDiffTree(data1[key], data2[key], keyIter));
    return { name: key, type: 'nested', children: iter };
  } if (!_.has(data1, key)) {
    return { name: key, type: 'addes', value: data2[key] };
  } if (!_.has(data2, key)) {
    return { name: key, type: 'delete', value: data1[key] };
  } if (data1[key] !== data2[key]) {
    return {
      name: key, type: 'updated', oldValue: data1[key], newValue: data2[key],
    };
  }
  return { name: key, type: 'notUpdated', value: data1[key] };
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

const genDiff = (data) => {
  const { data1, data2 } = data;
  const keysData1 = Object.keys(data1);
  const keysData2 = Object.keys(data2);
  const keys = _.union(keysData1, keysData2).sort();
  const result = keys.flatMap((key) => dataDiffTree(data1, data2, key));
  if (!_.has(data, 'conditions')) {
    return result;
  }
  return result.flatMap((child) => dataDiffTreeIni(child));
};

export default genDiff;
