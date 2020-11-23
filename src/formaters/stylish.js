/* eslint-disable no-param-reassign */
import _ from 'lodash';

const indent = (count = 1) => '    '.repeat(count);

const stylish = (data, depth) => {
  if (!_.isObject(data)) {
    return data;
  }
  const keys = Object.keys(data);
  const result = keys.reduce((acc, key) => {
    const value = _.isObject(data[key]) ? stylish(data[key], depth + 1) : data[key];
    acc += `${indent(depth)} ${key}: ${value} \n`;
    return acc;
  }, '{ \n');
  return `${result}${indent(depth)}}`;
};

const formatStylish = (tree, depth = 0) => {
  const result = tree.reduce((acc, child) => {
    const {
      name, type, oldValue, newValue, children,
    } = child;
    const valueFin = stylish(oldValue, depth + 1);
    const newValueFin = stylish(newValue, depth + 1);
    if (type === 'nested') {
      acc += `${indent(depth)} ${name}: ${formatStylish(children, depth + 1)} \n`;
    } else if (type === 'deletion') {
      acc += `${indent(depth)} - ${name}: ${valueFin} \n`;
    } else if (type === 'add') {
      acc += `${indent(depth)} + ${name}: ${valueFin} \n`;
    } else if (type === 'updated') {
      acc += `${indent(depth)} - ${name}: ${valueFin} \n`;
      acc += `${indent(depth)} + ${name}: ${newValueFin} \n`;
    }
    return acc;
  }, '{ \n');
  return `${result}${indent(depth)}}`;
};

export default formatStylish;
