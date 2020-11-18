/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
import _ from 'lodash';
import { keys } from '../utils.js';

const stylish = (data, dep) => {
  if (!_.isObject(data)) {
    return data;
  }
  const indent = (count = 1) => '    '.repeat(count);
  const keys = Object.keys(data);
  const result = keys.reduce((acc, key) => {
    const value = _.isObject(data[key]) ? stylish(data[key], dep + 1) : data[key];
    acc += `${indent(dep)} ${key}: ${value} \n`;
    return acc;
  }, '{ \n');
  return `${result}${indent(dep)}}`;
};

const formatStylish = (tree) => {
  const iter = (tree, dep) => {
    const indent = (count = 1) => '    '.repeat(count);
    const result = tree.reduce((acc, child) => {
      const key = keys(tree);
      if (Array.isArray(child)) {
        acc += `${indent(dep)} ${child[0]}: ${iter(child[1], dep + 1)} \n`;
      } else {
        const arrData = Object.values(Object.values(child)[0]).flat();
        const value = arrData.flatMap((data) => stylish(data, dep + 1));
        if (_.has(child, 'deletion')) {
          acc += `${indent(dep)} - ${key}: ${value} \n`;
        } else if (_.has(child, 'add')) {
          acc += `${indent(dep)} + ${key}: ${value} \n`;
        } else if (_.has(child, 'updated')) {
          acc += `${indent(dep)} - ${key}: ${value[0]} \n`;
          acc += `${indent(dep)} + ${key}: ${value[1]} \n`;
        } else {
          acc += `${indent(dep)}   ${key}: ${value} \n`;
        }
      }
      return acc;
    }, '{ \n');
    return `${result}${indent(dep)}}`;
  };
  return iter(tree, 0);
};

export default formatStylish;
