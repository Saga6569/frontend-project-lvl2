import jsyaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const inNumber = (value) => {
  if (value % 1 === 0 && Number(value) !== 0 && value !== true) {
    return Number(value);
  }
  return value;
};

const iniNumber = (object) => {
  const keys = Object.keys(object);
  return keys.reduce((acc, key) => {
    const value = _.isObject(object[key]) ? iniNumber(object[[key]]) : inNumber(object[key]);
    acc[key] = value;
    return acc;
  }, {});
};

const iniParser = (node) => iniNumber(ini.parse(node));

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
