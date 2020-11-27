/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
import _ from 'lodash';

const indent = (count = 1) => '    '.repeat(count);

const stylish = (data, depth) => {
  if (!_.isObject(data)) {
    return data;
  }
  const retreat = indent(depth);
  const keys = Object.keys(data);
  const result = keys.reduce((acc, key) => {
    const value = _.isObject(data[key]) ? stylish(data[key], depth + 1) : data[key];
    acc += `${retreat} ${key}: ${value} \n`;
    return acc;
  }, '{ \n');
  return `${result}${retreat}}`;
};

const iter = (object, depth = 0) => {
  const retreat = indent(depth);
  const { name, type } = object;
  if (type === 'nested') {
    const { children } = object;
    const res = children.flatMap((cild) => iter(cild, depth + 1)).join('');
    const ress = `{\n${res}${retreat}}`;
    return `${retreat}${name}: ${ress}\n`;
  } if (type === 'deletion' || type === 'add') {
    const { value } = object;
    const getValue = stylish(value, depth + 1);
    const act = type === 'deletion' ? '-' : '+';
    return `${retreat}${act} ${name}: ${getValue}\n`;
  } if (type === 'updated') {
    const { oldValue, newValue } = object;
    const getOldValue = stylish(oldValue, depth + 1);
    const getNewValue = stylish(newValue, depth + 1);
    return `${retreat}- ${name}: ${getOldValue}\n${retreat}+ ${name}: ${getNewValue}\n`;
  }
  const { value } = object;
  const getValue = stylish(value, depth + 1);
  return `${retreat}  ${name}: ${getValue}\n`;
};

const formatStylish = (tree) => {
  const result = tree.flatMap((child) => iter(child)).join('');
  return `{\n ${result}}`;
};

export default formatStylish;
