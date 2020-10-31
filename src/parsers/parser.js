/* eslint-disable no-param-reassign */
import _ from 'lodash';

const perserJs = (objct) => {
  const iter = (objctt, dep) => {
    const indent = (count = 1) => '    '.repeat(count);
    const keys = Object.keys(objctt);
    const result = keys.reduce((acc, key) => {
      const value = _.isObject(objctt[key]) ? iter(objctt[key], dep + 1) : objctt[key];
      acc += `${indent(dep)} ${key}: ${value} \n`;
      return acc;
    }, '{ \n');
    return `${result} ${indent(dep)}}`;
  };
  return iter(objct, 0);
};

export default perserJs;
