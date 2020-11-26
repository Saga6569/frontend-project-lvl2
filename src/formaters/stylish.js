/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
import _ from 'lodash';

const indent = (count = 1) => '    '.repeat(count);

const stylish = (data, depth) => {
  const retreat = indent(depth);
  if (!_.isObject(data)) {
    return data;
  }
  const keys = Object.keys(data);
  const result = keys.reduce((acc, key) => {
    const value = _.isObject(data[key]) ? stylish(data[key], depth + 1) : data[key];
    acc += `${retreat} ${key}: ${value} \n`;
    return acc;
  }, '{ \n');
  return `${result}${retreat}}`;
};

const formatStylish = (tree) => {
  const iter = (tree, depth) => {
    const retreat = indent(depth);
    const result = tree.reduce((acc, child) => {
      const { name, type } = child;
      if (type === 'nested') {
        const { children } = child;
        acc += `${retreat} ${name}: ${iter(children, depth + 1)} \n`;
      } else if (type === 'deletion' || type === 'add') {
        const { value } = child;
        const getValue = stylish(value, depth + 1);
        const act = type === 'deletion' ? '-' : '+';
        acc += `${retreat} ${act} ${name}: ${getValue} \n`;
      } else if (type === 'updated') {
        const { oldValue, newValue } = child;
        const getOldValue = stylish(oldValue, depth + 1);
        const getNewValue = stylish(newValue, depth + 1);
        acc += `${retreat} - ${name}: ${getOldValue} \n`;
        acc += `${retreat} + ${name}: ${getNewValue} \n`;
      } else {
        const { value } = child;
        const getValue = stylish(value, depth + 1);
        acc += `${retreat}   ${name}: ${getValue} \n`;
      }
      return acc;
    }, '{ \n');
    return `${result}${retreat}}`;
  };
  return iter(tree, 0);
};

export default formatStylish;
