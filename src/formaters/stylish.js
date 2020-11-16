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

const formatStylish = (tree) => {
  const iter = (tree, dep) => {
    const indent = (count = 1) => '    '.repeat(count);
    const result = tree.reduce((acc, child) => {
      const key = child.length === 2 ? child[0] : Object.keys(Object.values(child)[0]);
      if (Array.isArray(child)) {
        acc += `${indent(dep)} ${child[0]}: ${iter(child[1], dep + 1)} \n`;
      } else {
        const data = Object.values(Object.values(child)[0]).flat();
        const value = _.isObject(data[0]) ? stylish(data[0], dep + 1) : data;
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
