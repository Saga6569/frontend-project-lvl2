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

const parser = (data1, data2) => {
  const arrKeyData = keyBattery(data1, data2).sort();
  return arrKeyData.reduce((acc, key) => {
    if (isObjet(data1, data2, key)) {
      const value = { name: key, type: 'nested', children: [...parser(data1[key], data2[key])] };
      acc.push(value);
    } else if (isСhanged(data1, data2, key)) {
      const value = {
        name: key, type: 'updated', value: data1[key], newValue: data2[key],
      };
      acc.push(value);
    } else if (isAdd(data1, data2, key)) {
      const value = { name: key, type: 'add', value: data2[key] };
      acc.push(value);
    } else if (isDeletion(data1, data2, key)) {
      const value = { name: key, type: 'deletion', value: data1[key] };
      acc.push(value);
    } else {
      const value = { name: key, type: 'equally', value: data1[key] };
      acc.push(value);
    }
    return acc;
  }, []);
};

export default parser;
