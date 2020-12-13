/* eslint-disable no-restricted-globals */
import jsyaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const stringToNumber = (str) => (isNaN(parseFloat(str)) ? str : parseFloat(str));

const newObject = (object) => {
  const keys = Object.keys(object);
  return keys.reduce((acc, key) => {
    const value = _.isObject(object[key]) ? newObject(object[[key]]) : stringToNumber(object[key]);
    acc[key] = value;
    return acc;
  }, {});
};

const iniParser = (object) => newObject(ini.parse(object));

const parsers = {
  yml: jsyaml.safeLoad,
  json: jsyaml.safeLoad,
  ini: iniParser,
};

const parser = (key) => {
  const format = key;
  const result = parsers[format];
  return result;
};

export default parser;
