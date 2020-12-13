/* eslint-disable no-restricted-globals */
import jsyaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const stringToNumber = (str) => (isNaN(parseFloat(str)) ? str : parseFloat(str));

const iniNode = (object) => {
  const keys = Object.keys(object);
  return keys.reduce((acc, key) => {
    const value = _.isObject(object[key]) ? iniNode(object[[key]]) : stringToNumber(object[key]);
    acc[key] = value;
    return acc;
  }, {});
};

const iniParser = (node) => iniNode(ini.parse(node));

const parsers = {
  yml: jsyaml.safeLoad,
  json: jsyaml.safeLoad,
  ini: iniParser,
};

const dataFormat = (data) => data.slice(data.lastIndexOf('.') + 1);

const nodeFormat = (data) => {
  const format = dataFormat(data);
  const result = parsers[format];
  return result;
};

export default nodeFormat;
