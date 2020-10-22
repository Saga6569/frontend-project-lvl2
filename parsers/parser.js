import _ from 'lodash';

const perserJs = (objct) => {
  const keys = Object.keys(objct);
  return keys.reduce((acc, key) => {
    if (_.isObject(objct[key])) {
      // eslint-disable-next-line no-param-reassign
      acc += ` ${key} :  ${perserJs(objct[key])} \n `;
    } else {
      // eslint-disable-next-line no-param-reassign
      acc += ` ${key} : ${objct[key]} \n`;
    }
    return acc;
  }, '');
};

export default perserJs;
