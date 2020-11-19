/* eslint-disable no-param-reassign */
import _ from 'lodash';

const stylish = (data, dep) => {
  const indent = (count = 1) => '    '.repeat(count);
  const keys = Object.keys(data);
  const result = keys.reduce((acc, key) => {
    const value = _.isObject(data[key]) ? stylish(data[key], dep + 1) : data[key];
    acc += `${indent(dep)} ${key}: ${value} \n`;
    return acc;
  }, '{ \n');
  return `${result}${indent(dep)}}`;
};

const indent = (count = 1) => '   '.repeat(count);

const formatStylish = (tree) => {
  const iter = (data, dep) => {
    const result = data.reduce((acc, child) => {
      const {
        name, type, value, newValue, children,
      } = child;
      const valueFin = _.isObject(value) ? stylish(value, dep + 1) : value;
      const newValueFin = _.isObject(newValue) ? stylish(newValue, dep + 1) : newValue;
      if (type === 'nested') {
        acc += `${indent(dep)} ${name}: ${iter(children, dep + 1)} \n`;
      } if (type === 'deletion') {
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
  return iter(tree, 0);
};

export default formatStylish;
