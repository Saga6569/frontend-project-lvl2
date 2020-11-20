/* eslint-disable no-param-reassign */
import _ from 'lodash';

const indent = (count = 1) => '    '.repeat(count);

const stylish = (data, dep) => {
  if (!_.isObject(data)) {
    return data;
  }
  const keys = Object.keys(data);
  const result = keys.reduce((acc, key) => {
    const value = _.isObject(data[key]) ? stylish(data[key], dep + 1) : data[key];
    acc += `${indent(dep)} ${key}: ${value} \n`;
    return acc;
  }, '{ \n');
  return `${result}${indent(dep)}}`;
};

const formatStylish = (tree, dep = 0) => {
  const result = tree.reduce((acc, child) => {
    const {
      name, type, value, newValue, children,
    } = child;
    const valueFin = stylish(value, dep + 1);
    const newValueFin = stylish(newValue, dep + 1);
    if (type === 'nested') {
      acc += `${indent(dep)} ${name}: ${formatStylish(children, dep + 1)} \n`;
    } else if (type === 'deletion') {
      acc += `${indent(dep)} - ${name}: ${valueFin} \n`;
    } else if (type === 'add') {
      acc += `${indent(dep)} + ${name}: ${valueFin} \n`;
    } else if (type === 'updated') {
      acc += `${indent(dep)} - ${name}: ${valueFin} \n`;
      acc += `${indent(dep)} + ${name}: ${newValueFin} \n`;
    }
    return acc;
  }, '{ \n');
  return `${result}${indent(dep)}}`;
};

export default formatStylish;
