/* eslint-disable no-param-reassign */
import _ from 'lodash';
import { keyBattery, isNumber } from '../utils.js';
import parser from '../parsers/parser.js';

const diffIni = (object) => {
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

const buildingDiff = (data1, data2) => {
  const arrKeyData = keyBattery(data1, data2);
  const result = arrKeyData.reduce((acc, key) => {
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      const value = { name: key, type: 'nested', children: [...buildingDiff(data1[key], data2[key])] };
      acc.push(value);
    } else if (_.has(data1, key) && _.has(data2, key) && data1[key] !== data2[key]) {
      const value = {
        name: key, type: 'updated', oldValue: data1[key], newValue: data2[key],
      };
      acc.push(value);
    } else if (!_.has(data1, key) && _.has(data2, key)) {
      const value = { name: key, type: 'add', value: data2[key] };
      acc.push(value);
    } else if (_.has(data1, key) && !_.has(data2, key)) {
      const value = { name: key, type: 'deletion', value: data1[key] };
      acc.push(value);
    } else {
      const value = { name: key, type: 'equally', value: data1[key] };
      acc.push(value);
    }
    return acc;
  }, []);
  return result;
};

const diff = (data1, data2) => {
  const value1 = parser(data1);
  const value2 = parser(data2);
  const result = buildingDiff(value1, value2);
  if (data1.includes('.ini') || data2.includes('.ini')) {
    return result.flatMap((child) => diffIni(child));
  }
  return result;
};

export default diff;
