/* eslint-disable no-param-reassign */
import _ from 'lodash';

const perserJs = (objct) => {
  const iter = (objctt, dep) => {
    const speas = (count = 1) => '    '.repeat(count);
    const keys = Object.keys(objctt);
    const result = keys.reduce((acc, key) => {
      if (_.isObject(objctt[key])) {
        acc += `${speas(dep)} ${key}: ${iter(objctt[key], dep + 1)} \n`;
      } else {
        acc += `${speas(dep)} ${key}: ${objctt[key]} \n`;
      }
      return acc;
    }, '{ \n');
    return `${result} ${speas(dep)} }`;
  };
  return iter(objct, 0);
};

export default perserJs;
