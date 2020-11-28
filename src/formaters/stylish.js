/* eslint-disable no-param-reassign */
import _ from 'lodash';

const indent = (count = 1) => '    '.repeat(count);

const disclosureOfData = (data, depth) => {
  const retreat = indent(depth);
  const keys = Object.keys(data);
  const result = keys.reduce((acc, key) => {
    const value = _.isObject(data[key]) ? disclosureOfData(data[key], depth + 1) : data[key];
    acc += `${retreat} ${key}: ${value} \n`;
    return acc;
  }, '{ \n');
  return `${result}${retreat}}`;
};

const nestedDiff = (object, depth = 0) => {
  const retreat = indent(depth);
  const { name, type } = object;
  if (type === 'nested') {
    const { children } = object;
    const iterChildren = children.flatMap((cild) => nestedDiff(cild, depth + 1)).join('');
    const result = `{\n${iterChildren}${retreat}}`;
    return `${retreat}${name}: ${result}\n`;
  } if (type === 'deletion' || type === 'add') {
    const { value } = object;
    const getValue = _.isObject(value) ? disclosureOfData(value, depth + 1) : value;
    const act = type === 'deletion' ? '-' : '+';
    return `${retreat}${act} ${name}: ${getValue}\n`;
  } if (type === 'updated') {
    const { oldValue, newValue } = object;
    const getOldValue = _.isObject(oldValue) ? disclosureOfData(oldValue, depth + 1) : oldValue;
    const getNewValue = _.isObject(newValue) ? disclosureOfData(newValue, depth + 1) : newValue;
    return `${retreat}- ${name}: ${getOldValue}\n${retreat}+ ${name}: ${getNewValue}\n`;
  }
  const { value } = object;
  const getValue = _.isObject(value) ? disclosureOfData(value, depth + 1) : value;
  return `${retreat}  ${name}: ${getValue}\n`;
};

const nestedDiffFormat = (tree) => {
  const result = tree.flatMap((child) => nestedDiff(child)).join('');
  return `{\n${result}}`;
};

export default nestedDiffFormat;
