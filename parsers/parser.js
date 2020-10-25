import _ from 'lodash';

const perserJs = (objct) => {
  const keys = Object.keys(objct);
  const result = keys.reduce((acc, key) => {
    if (_.isObject(objct[key])) {
      // eslint-disable-next-line no-param-reassign
      acc += `${key} : ${perserJs(objct[key])} \n`;
    } else if (!_.isObject(objct[key])) {
      // eslint-disable-next-line no-param-reassign
      acc += `${key} : ${objct[key]} \n`;
    }
    return acc;
  }, '{ \n');
  return `${result}}`;
};

export default perserJs;
